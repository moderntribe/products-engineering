---
date: 2017-08-28
title: JavaScript
categories:
  - Code-Standards
description: JavaScript Code Standards
icon: fa-file-text-o
---
## <a id="js-basics"></a> The Basics

First and foremost, we make an attempt to adhere to the [WordPress JS coding standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/javascript/).

## <a id="js-style"></a> Code style

All javascript should be well documented. Functions, namespaces should adhere to the jsdoc 3 standard, available here: [[http://usejsdoc.org/about-getting-started.html]].

Inside functions declare additional comments with the // syntax.

### Variable declaration

While not a fully ratified standard, nor heavily enforced, comma separated variable declarations should be discouraged.

Icky:

<pre>
var v, x, y;

var $this = $(this),
  $that = $(that),
  i = 0;
</pre>

Preferred:

<pre>
var v;
var x;
var y;

var $this = $( this );
var $that = $( that );
var i     = 0;
</pre>

#### Here's @borkweb's reasoning for separate var statements

Personally, I'd prefer separating the function declarations from the variable declaration chain. One of the following would allow proper docblocks without chunking up the declarations and avoid funky-looking nesting:

<pre>
var date_to_ymd = function( date ) {
  // ...
};
</pre>

or

<pre>
function date_to_ymd( date ) {
  // ...
}
</pre>

I still am not a fan of chained declaration in general. Here's my reasoning:

1. Chained declarations deter comments being added for individual variables and sorta hurt readability:

    <pre>
    var
      /**
       * This variable does something interesting
       *
       * @private
       **/
      variable_x = 1,

      /**
       * This variable does something else entirely
       *
       * @private
       **/
      variable_y = 2;
    </pre>


2. Chained declaration statements make them harder to move around and causes needless churn in diffs and increases the possibility of merge conflicts:

    <pre>
    var x = 1,
      z = 3,
      y = 2;

    // changing it to the following would result in 2 changed lines:

    var x = 1,
      y = 2,
      z = 3;
    </pre>

    vs the following:

    <pre>
    var x = 1;
    var z = 3;
    var y = 2;

    // change it to the following would result in 1 changed line:

    var x = 1;
    var y = 2;
    var z = 3;
    </pre>

3. Variable alignment of chained declarations is unpleasing to my brain (I know I could solve this by setting my tabs to 4...but that's not going to happen):

    <pre>
    // compare this
    var x = 1,
      y = 2,
      z = 3;

    // to:
    var x = 1;
    var y = 2;
    var z = 3;
    </pre>

4. Our unminified code should be all about readability and not saving bytes. Good minifiers turn multiple var statements into comma separated ones.

5. On the topic of saving bytes...In the event that the non-minified version of the JS file is served up to the user...two var statements gzip better than a single var with a comma. (via Isaac of NPM - [source](https://gist.github.com/isaacs/357981#gistcomment-2406))

### jQuery var names

Variables that point to a jQuery object should have their name prefixed with a `$` sign, per the examples above.

Utility functions, state, tests and options for the main plugins should be stored in
`tribe-events.js` and `tribe-events-pro.js`.

If functions or portions of functionality move between plugins, make sure all associated js code
moves to that new area with them.

## <a id="js-event-namespacing"></a> Event namespacing

To promote flexible event handling within jQuery, [namespacing events](https://api.jquery.com/event.namespace/) is preferred over prefixing custom event names.

### Why?

Namespacing allows a developer to add and remove events in an isolated fashion.  CSS-Tricks has [an excellent write-up](https://css-tricks.com/namespaced-events-jquery/) about why they are awesome.

### Namespacing conventions

Namespaced custom events should use the following convention:

	[event name].tribe

#### [event name]

The `[event name]` should be something that indicates the action that is occurring. If saving a ticket, an event name of `save-ticket` would be appropriate - `fry-bacon` would not.

#### tribe

This is the piece of the namespace that should be present everywhere. It separates our events from those of other plugins.