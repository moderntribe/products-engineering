---
date: 2018-03-23
title: Service Provider
description: How to modularize parts of the code using Service Providers
icon: fa-file-text-o
categories:
  - Guidelines

---

Service providers are the central piece of each one of the modules used in our plugins. When introducing a new
feature or editing a existing module we are looking to create or edit a Service Provider to do the bootstraping
of the required singletons, bindings, middleware, assets and Hooks.

Modules are a group of classes that provide or add support to a given functionality, such as Aggregator.

They also add a very good way to allow users to toggle on and off a specific part of a plugin by using one simple
filter with `__return_false`.

Service Providers should completely encapsulate a set of functionalities that can be then removed or replaced with
another Service Provider. As a rule of thumb if you start grouping classes and functions in a sub-folder that's a
good indication all those classes and functions should be bootstrapped/managed by the same service provider.

## Di52

Since we are bound to version 5.2 of PHP on WordPress, Luca Tumedei created a [dependency injection container](https://github.com/lucatume/di52) heavily
inspired by Laravel IOC and Pimple, that we are using on all of our products as the basis for loading Singletons and
modules.

Below you will find a list of some of the global functions exposed by our APIs to allow a simple registering of a few
things into our Container for Tribe Plugins.

## tribe

Loading any classes registred into our Container is simplified by using the `tribe()` global function, which will map
to `tad_DI52_Container::make()`, but specific to our global Tribe Container.

Calling the `tribe()` function with no arguments will return the container itself. That is an instance of the `Tribe__Container`
class extending the `tad_DI52_Container` one: any method available on **DI52** will be available on that instance.

_Example_
```php
$records = tribe( 'aggregator.records' )->get_latest_records();
```

## tribe_singleton

In Plugins most of the classes are singletons that will initialize some piece of functionality in WordPress, by setting
some Assets and hooking some of its methods to actions and filters.

**Register Singleton using Strings**
```php
<?php
tribe_singleton( 'aggregator.records', 'Tribe__Events__Aggregator__Records', array( 'hook' ) )
```
In this example, we create a new instance of `Tribe__Events__Aggregator__Records` when `tribe( 'aggregator.records' )`
is called and call the method `hook` from the registered class. Note that `hook` will only be called once the `tribe()` is called.

**Register Singleton with Setup methods**
```php
<?php
tribe_singleton( 'aggregator.records', 'Tribe__Events__Aggregator__Records', array( 'hook', 'assets' ) )
```
In this example, we call the methods `hook` and `assets` from that class. Note that setup methods will only be called
once the `tribe()` is called.

**Register Singleton with instance of Class**
```php
<?php
tribe_singleton( 'aggregator.records', new Tribe__Events__Aggregator__Records )
```
In this example, we will save an instance of `Tribe__Events__Aggregator__Records` into the `aggregator.records` key of the
container. Avoid using this method unless you have a specific reason to be creating the instance before it gets called.

**Register Singleton with setup function**
```php
<?php
// On load
tribe_singleton( 'aggregator.records', array( $this, 'setup_records' ) );

// On definition of the class
public function setup_records() {
	$backend_engine = tribe( 'aggregator.engine' )
	return new Tribe__Events__Aggregator__Records( $backend_engine );
}
```
In this example we are creating a more complex class that requires some parameters to be passed when creating the instance.

## tribe_callback

When hooking methods that live inside of a Class that is registred via our Dependency injection container we can use this method
to allow for a simpler syntax.

**Incorrect**
```php
<?php
add_action( 'init', array( tribe( 'aggregator.records' ), 'initialize' ), 15 )
add_filter( 'get_the_title', array( tribe( 'aggregator.records' ), 'filter_record_title' ), 10, 3 )
```

**Correct**
```php
<?php
add_action( 'init', tribe_callback( 'aggregator.records', 'initialize' ), 15 )
add_filter( 'get_the_title', tribe_callback( 'aggregator.records', 'filter_record_title' ), 10, 3 )
```

## tribe_callback_return

At times you need to setup a very simple callback to a filter that will only return a value that you can only get from this current
context, or just need to overwrite a simple variable.

**Example**
```php
<?php
add_filter( 'get_the_title', tribe_callback_return( __( 'New title for the Records' ) ) )
```
This has limited usage but it makes overwriting a given template or filter on the fly extremely easy.

## tribe_register_provider

When loading more complex modules or features we want to isolate the loading of all its components by creating a Service Provider
class and passing it to this method.

```php
<?php
tribe_register_provider( 'Tribe__Events__Pro__Series__Service_Provider' );
```

### Example of Class

Below you will find an extracted piece of the code from the Service Provider created for Series on Events Pro,
this can serve as a guide to creating your own.

In this example we are not registering any Assets, but it's a good idea to either call the `tribe_asset` methods
from this class or create a another class and use the provider to set it up.

```php
<?php
class Tribe__Events__Pro__Series__Service_Provider
	extends tad_DI52_ServiceProvider {
	/**
	 * Binds and sets up implementations.
	 */
	public function register() {
		// Registering the instance of a class
		$this->container->singleton(
			'pro.series',
			new Tribe__Events__Pro__Series()
		);

		// Register a method from the current class
		$this->container->singleton(
			'pro.series.template',
			array( $this, 'build_template' )
		);

		// Passing the name of the class as a string then call a method when creating the instance for the first time
		$this->container->singleton(
			'pro.series.admin-page',
			'Tribe__Events__Pro__Series__Admin_Page',
			array( 'hook' )
		);

		// A class that is not an Singleton
		$this->container->bind( 'pro.series.instance-engine' );
	}

	/**
	 * Hooking for any registered classes needs to happen here
	 *
	 * In place of delegating the hooking responsibility to the single classes they are all hooked here.
	 */
	protected function hook() {
		add_filter( 'tribe_post_types', tribe_callback( 'pro.series', 'add_type' ) );
	}

	/**
	 * Binds and sets up implementations at boot time.
	 *
	 * @since  TBD
	 */
	public function boot() {
		// no ops
	}

	/**
	 * Builds the Template Class
	 *
	 * Work-around for lack of closures in PHP 5.2
	 *
	 * @since  TBD
	 *
	 * @return Tribe__Events__Pro__Series__Template
	 */
	public function build_template() {
		$series = $this->container->make( 'pro.series' );
		$template = new Tribe__Events__Pro__Series__Template( $series );

		return $template;
	}
}
```
