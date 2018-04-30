---
date: 2017-04-20
title: Asynchronous processes and background processing
description: An introduction to the theory and practice of using our asynchronous and backgrobond processing system
icon: fa-file-text-o
categories:
  - Guidelines
---

### When would I need to use asynchronous processes and background processing?

Before delving into how to use our asynchronous processing system it's worth taking the time to understand what it does and how it could benefit your code.  
As a guideline asynchronous processes should be used when something should be done but does not need to be done immediately. Any operation that is not **fundamental** for the user interaction to be complete should be done in a separate, dedicated, process.
The reason behind this is that, while the website "does stuff" the user will be staring at a spinning icon feeling out of control; if we could avoid this then we should.  
An examples of an asynchronous process taken right from WordPress is the image upload functionality: an image that image has to be resized in all the available sizes, moved to the content folder and checked against a number of parameters; to keep the UI snappy WordPress will immediately return the control to the user all the while showing a progress bar.  
If you have ever used the WordPress content importer you will know the feeling of that import page loading and loading forever: that is a synchronous process.  
If you have ever used the [Regenerate Thumbnails plugin](https://wordpress.org/plugins/regenerate-thumbnails/) you should remember that it will gracefully handle a boatload of tasks, like resizing your **whole** image library, in a screen that shows a progress bar and will allow you to change the page without interrupting it.  
Once the concept of asynchronous process is nailed, it's time to introduce background processing: if you need to perform the same kind of asynchronous process on many different objects than you will have a **queue** of items that need to be processed, each one handled in its own asynchronous, dedicated process. Since this will happen asynchronously, e.g., in the *background* of the application, and will be *processing* items... it's called "background processing".
The advantage of the system we have in place is that background processing, or asynchronous process handling, is **not** dependant on the WordPress Cron mechanism ensuring a single request will trigger a chain of effects that will get, eventually, the job done.  

### A required mind shift
The biggest mindset change required to use asynchronous processes and queues effectively is to think of atomic operations.  
Asynchronous processes do not provide any guarantee of **when** the task will be done and queues add another layer of "uncertainty" not providing any guarantee regarding the execution order.  
The new paradigm that should be adopted is "compute first, execute later"; in contrast to a "compute and execute" one.

### Example one - asynchronous processing
The following example plugin is stupid in its functionalities but useful for the purpose of illustrating how asynchronous processing works.  
The plugin will read a list of names and will either create or update a post in the database for each; to simplify the example there is no UI involved and the plugin processing will be kickstarted visiting the `/wp-json/q/start` REST API endpoint.  
Since there is no authentication logic in place to make the example plugin work you should visit the `/wp-json/q/start` endpoint while logged out.
Here is the usual stuff: the plugin header.

```php
<?php
/*
Plugin Name: Queue Example
*/

// Since we might be loading before any Modern Tribe plugin, the existence and setup of the `common` package cannot be assumed: we set up autoloading
// here. Mind that The Events Calendar is activated on the site.
include_once dirname( __DIR__ ) . '/the-events-calendar/common/vendor/autoload.php';
include_once dirname( __DIR__ ) . '/the-events-calendar/common/tribe-autoload.php';

// Here we add the REST API endpoint: hitting `/wp-json/q/start` will trigger the processing.
add_action( 'rest_api_init', function () {
    register_rest_route( 'q', '/start', [
        'method'   => WP_REST_Server::CREATABLE,
        'callback' => 'q_create',
    ] );
} );

// The `names()` function will merely read a file specifying a list of 100 names.
function names() {
    return include __DIR__ . '/data/100-names.php';
}

// This function is in charge of creating an asynchronous process for each name. The `Async_Process` class is defined below but it will just call 
// `wp_insert_post` for each name.  
// Each process instance will run in its own, separate, PHP process; it's important to provide each process with **all** the information and data it
// might need to accomplish its task; each process should be **completely independent** of the creating process or any other asynchronous process.
function q_create() {
    $start = microtime( true );

    $response = [];

    foreach ( names() as $name ) {
        $async_process = new Async_Process();
    
        // all the data the process will need is jus a name    
        $async_process->data( [ 'name' => $name ] );

        $async_process->dispatch();

        $response[] = "Dispatched task for {$name}";
    }

    wp_send_json( array_merge( [ 'Time: ' . ( microtime( true ) - $start ) ], $response ) );
}

// In the `common` library we avoid trying to handle **all** the asynchronous processes and try to be *smart* in hooking them.  
// Hooking on the `tribe_process_handlers` filter we tell common we would like it to manage the `Async_Process` class; mind that this is only possible
// because the `Async_Process` extends teh `Tribe__Process__Handler` class.
add_filter( 'tribe_process_handlers', function ( $handlers = [] ) {
    $handlers[] = Async_Process::class;

    return $handlers;
} );
```

Each asynchronous process is modeled by a class that should uniquely identify itself, via the `action()` method and implement the `handle()` and `sync_handle()` methods.  
The former will handle the task when the class is spawned in an asynchronous process; the second will handle the task when the class will be forced to execute in synchronous mode (usually in the context of tests).  
In the simple implementation below there is no difference between the two.  
The parent class will provide the `handle` method its input via the `$_POST` superglobal array; that's why in the `sync_handle` method we default to it.

```php
<?php
class Async_Process extends Tribe__Process__Handler {

    /**
     * Returns the async process action name.
     *
     * @since TBD
     *
     * @return string
     */
    public static function action() {
        return 'example_async_process';
    }

    /**
     * Handle
     *
     * Override this method to perform any actions required
     * during the async request.
     */
    protected function handle() {
        // really no difference here
        $this->sync_handle();
    }

    /**
     * Handles the process immediately, not in an async manner.
     *
     * @since TBD
     *
     * @param array|null $data_source If not provided the method will read the handler data from the
     *                                request array.
     *
     * @return mixed
     */
    public function sync_handle( array $data_source = null ) {
        $data_source = isset( $data_source ) ? $data_source : $_POST;
    
        $name = $data_source['name'];

        $found = get_page_by_title( $name, OBJECT, 'post' );

        if ( $found instanceof WP_Post ) {
            wp_update_post( [ 'ID' => $found->ID, 'post_title' => "{$name} - updated" ] );
            error_log( 'Updated post for ' . $name );
        } else {
            wp_insert_post( [ 'post_title' => $name ] );
            error_log( 'Created post for ' . $name );
        }
    }
}
```

A last note: in this simple implementation we're using `error_log` to log the process activity; in your code you must use something more *educated* (e.g. `tribe( 'logger' )` ) but the code is representative of an additional characteristic of this code: there is no return value.  
Writing code like this makes no sense as the return value of `dispatch` is always empty.

```php
$done = $queue->save()->dispatch();
```

After all: the process is not synchronous.

### Example two - queue implementation
Let's iterate on the previous code and implement the same functionality in a queue; this makes sense as we are really doing the same thing a number of times and a queue seems a better fit for the task.  
Furthermore, without delving into more advanced functionalities, a queue will provide more control over its operations (like status report and cancellation).
This is the updated plugin code; the common parts are not repeated.

```php
<?php
/*
Plugin Name: Queue Example
*/
include_once dirname( __DIR__ ) . '/the-events-calendar/common/vendor/autoload.php';
include_once dirname( __DIR__ ) . '/the-events-calendar/common/tribe-autoload.php';

add_action( 'rest_api_init', function () {
    register_rest_route( 'q', '/start', [
        'method'   => WP_REST_Server::CREATABLE,
        'callback' => 'q_create',
    ] );
} );

function names() {
    return include __DIR__ . '/data/100-names.php';
}

// In place of creating a process instance for each name we create one queue only and add all the names as items to it.  
// The `save()` method will persist the queue data to the database while the `dispatch()` method will kick it off.  
// Notice the asynchronous process did not require any persistence operation, just add data and dispatch it.
function q_create() {
    $start = microtime( true );

    $response = [];

    $queue = new Example_Queue();

    foreach ( names() as $name ) {
        $queue->push_to_queue( $name );

        $response[] = "Queued task for {$name}";
    }
    
    $queue->save()->dispatch();

    wp_send_json( array_merge( [ 'Time: ' . ( microtime( true ) - $start ) ], $response ) );
}
// This time we filter the queue classes to add ours. Not much different from before but keep in mind that asynchronous processes and queues 
// are not the same.
add_filter( 'tribe_process_queues', function ( $queues = [] ) {
    $queues[] = Example_Queue::class;

    return $queues;
} );
```

Since we are implementing a queue and not an asynchronous process we extend the other base class: `Tribe__Process__Queue`.  
Similarly to the asynchronous process one the class should provide a unique identifier in the `action()` method.  
Differently from the asynchronous process class it must implement a `task()` method only, where we pretty much do what we did before, and **can** implement a `complete()` method to do something when all items have been processed.
In the `task` method the return value answers the question "Should this item be processed again?": if the `task` method return `false` then the queue will assume the task is complete otherwise it will run the task again on the return value.

```php
<?php
class Example_Queue extends Tribe__Process__Queue {

    /**
     * Returns the async process action name.
     *
     * @since TBD
     *
     * @return string
     */
    public static function action() {
        return 'example_queue';
    }

    /**
     * Task
     *
     * Override this method to perform any actions required on each
     * queue item. Return the modified item for further processing
     * in the next pass through. Or, return false to remove the
     * item from the queue.
     *
     * @param mixed $item Queue item to iterate over.
     *
     * @return mixed
     */
    protected function task( $name ) {
        $found = get_page_by_title( $name, OBJECT, 'post' );

        if ( $found instanceof WP_Post ) {
            $post_id = wp_update_post( [ 'ID' => $found->ID, 'post_title' => "{$name} - updated" ] );
            error_log( 'Updated post for ' . $name );
        } else {
            $post_id = wp_insert_post( [ 'post_title' => $name ] );
            error_log( 'Created post for ' . $name );
        }
            
        if ( ! empty( $post_id ) ) {
            return false;
        }

        return $name;
    }

    protected function complete() {
        error_log( 'And we are done!' );
        parent::complete();
    }
}
```

### Example 3 - piped queues
Further complicating the flow of the plugin we want to create posts that need to be created immediately, in a first queue, and update posts that need to be updated in a second, dedicated queue.  
While overkill here the scenario is a good representation of the paradigm "compute first, execute later": in the first queue we *compute* what needs to be updated then, in the second queue, we *execute* the update with the peace of mind of knowing we took care of critical runs on a logic level (when we decided what should be updated) and not on a lets-hope-the-DB-is-fast-enough one.  
While more complex the example below does not introduce anything really different from the code seen before: it just leverages the `complete()` method of the first queue (the `Find_Update_Candidates` one) to create and execute a second queue (the `Update_Queue` one).  
The only thing worth noting here is that we use the post meta, the `_upate_with` meta key precisely, to store temporary data that we'll use in the second queue.

```php
<?php
/*
Plugin Name: Queue Example
*/
include_once dirname( __DIR__ ) . '/the-events-calendar/common/vendor/autoload.php';
include_once dirname( __DIR__ ) . '/the-events-calendar/common/tribe-autoload.php';

add_action( 'rest_api_init', function () {
    register_rest_route( 'q', '/start', [
        'method'   => WP_REST_Server::CREATABLE,
        'callback' => 'q_create',
    ] );
} );

function names() {
    return include __DIR__ . '/data/100-names.php';
}

function q_create() {
    $start = microtime( true );

    $response = [];

    $queue = new Find_Update_Candidates();

    foreach ( names() as $name ) {
        $queue->push_to_queue( $name );
        $response[] = "Queued task for {$name}";
    }

    $queue->save()->dispatch();

    wp_send_json( array_merge( [ 'Time: ' . ( microtime( true ) - $start ) ], $response ) );
}

add_filter( 'tribe_process_queues', function ( $queues = [] ) {
    $queues[] = Find_Update_Candidates::class;
    $queues[] = Update_Queue::class;

    return $queues;
} );

class Find_Update_Candidates extends Tribe__Process__Queue {

    /**
     * Returns the async process action name.
     *
     * @since TBD
     *
     * @return string
     */
    public static function action() {
        return 'find_update_candidates';
    }

    /**
     * Task
     *
     * Override this method to perform any actions required on each
     * queue item. Return the modified item for further processing
     * in the next pass through. Or, return false to remove the
     * item from the queue.
     *
     * @param mixed $item Queue item to iterate over.
     *
     * @return mixed
     */
    protected function task( $name ) {
        $found = get_page_by_title( $name, OBJECT, 'post' );

        if ( $found instanceof WP_Post ) {
            $updated_title = "{$name} updated";
            delete_post_meta( $found->ID, '_update_with' );
            update_post_meta( $found->ID, '_update_with', $updated_title );
            $post_id = $found->ID;
            error_log( "Post with id {$found->ID} title will be update to {$updated_title}" );
        } else {
            $post_id = wp_insert_post( [ 'post_title' => $name ] );
            error_log( 'Created post for ' . $name );
        }

        if ( ! empty( $post_id ) ) {
            return false;
        }

        return $name;
    }

    protected function complete() {
        $update_queue = new Update_Queue();

        global $wpdb;
        $to_update = $wpdb->get_col( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_update_with'" );
        error_log( 'Will update: ' . json_encode( $to_update ) );

        foreach ( $to_update as $post_id ) {
            $update_queue->push_to_queue( $post_id );
        }

        $update_queue->save()->dispatch();

        if ( ! empty( $to_update ) ) {
            error_log( 'Updates queued!' );
        } else {
            error_log( 'Done, no updates required.' );
        }

        parent::complete();
    }
}

class Update_Queue extends Tribe__Process__Queue {

    /**
     * Returns the async process action name.
     *
     * @since TBD
     *
     * @return string
     */
    public static function action() {
        return 'update_posts';
    }

    /**
     * Task
     *
     * Override this method to perform any actions required on each
     * queue item. Return the modified item for further processing
     * in the next pass through. Or, return false to remove the
     * item from the queue.
     *
     * @param mixed $item Queue item to iterate over.
     *
     * @return mixed
     */
    protected function task( $post_id ) {
        $updated_title = get_post_meta( $post_id, '_update_with', true );

        $post_id = wp_update_post( [ 'ID' => $post_id, 'post_title' => $updated_title ] );

        if ( ! empty( $post_id ) ) {
            error_log( "Updated post {$post_id} title to {$updated_title}" );

            delete_post_meta( $post_id, '_update_with' );

            return false;
        }

        error_log( "Could not update {$post_id}" );

        return $post_id;
    }

    protected function complete() {
        error_log( 'Updates done!' );
        parent::complete();
    }
}
```

### References
You can find an example of an asynchronous process implementation in the `Tribe__Process__Post_Thumbnail_Setter` class and examples of queues implementation in RER code (`Tribe__Events_Pro__Series__Process__XYZ`).  
Our asynchronous and background processing system is based on [the wp-background-processing library](https://github.com/A5hleyRich/wp-background-processing).
