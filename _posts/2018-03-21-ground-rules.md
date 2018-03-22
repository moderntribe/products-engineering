---
date: 2018-03-21
title: Ground Rules
description: Ground Rules for Coding at Modern Tribe
icon: fa-file-text-o
categories:
  - Guidelines

---
In these pages we’re going to cover a set of coding guidelines that aim to make Modern Tribe’s plugin
code more efficient, easier to read and understand, and more organized.

Having a more readable, consistent, and organized codebase will help with many things. Most notably,
it’ll make it easier and faster for our team to to plan and execute adding new features, and new
contributors will be able to get up to speed more quickly. Customers will also be able to develop
their own customizations more easily.

Existing code may not follow these guidelines, but new code is expected to. As you are working on
The Events Calendar codebase, if you see any blocks of code that don’t follow these guidelines, feel
free to update and improve them to bring them in line with our style.


## Ground Rules

While everyone has their own way of solving problems and writing algorithms, there are some basic
guidelines we should all strive to follow.

### Keep it Simple

As we are not creating code that will most likely be maintained by another fellow developer we should
always aim to keep complex pieces of logic broken in to smaller pieces so they can be tested or easily
understandable by reading the Docblock from that method.

A good rule of thumb for keeping logic simple is that in most of the cases we can avoid nesting conditionals
by checking things separately for the negative and bailing.

**Example: Nested Levels & Excess Comparisons**

_Right:_

```php
<?php
// this does the exact same thing!
if ( empty( $date ) ) {
	return false;
}

if ( $date > $date1 ) {
	return 1;
}

if ( $date < $date 2 ) {
	return 2;
}
```

_Wrong:_

```php
<?php
// too many nested levels and convoluted logic
if (  ! empty( $date ) && ( $date > $date1 || $date < $date2 ) ) {
	if ( $date > $date1 ) {
		return 1;
	} elseif ( $date < $date2 ) {
		return 2;
	}
} else {
	if ( empty( $date ) ) {
		return false;
	}
}
```

**Example: Sacrificing readability for being clever**

_Right:_
```php
<?php
// this does the same thing.. a few extra lines, but it’s far more readable:
$tribe_events_template = tribe_get_option( 'tribeEventsTemplate', 'default' );
if ( 'default' === $tribe_events_template ) {
	$tribe_events_template = 'page.php';
}
$template = locate_template( $tribe_events_template );
```

_Wrong:_
```php
<?php
// believe it or not, this is all in one line:
$template = locate_template( tribe_get_option( 'tribeEventsTemplate', 'default' ) == 'default' ? 'page.php' : tribe_get_option( 'tribeEventsTemplate', 'default' ) );
```


### Descriptive Naming

Name your functions and variables plainly and descriptively. If you’re good at this, sometimes comments
and confusion can both be avoided!

_Right:_
```php
<?php
// clearly named variables and function
$days_between = tribe_calc_days_between( $start_date, $end_date );
```

_Wrong:_
```php
<?php
// non-descript variable and function names
$x = how_many( $y, $z );
```

### D.R.Y

If you ever find yourself duplicating a line of code, there’s probably something wrong. Go back and
figure out how you can solve the problem without any duplicate code (i.e. create a function or a
variable that you can reuse).

When developing Modern Tribe products, following the D.R.Y. rule also means: don’t write new code
when there already exists functionality in PHP, WordPress, or elsewhere in the products suite, which
does the same thing. Before writing a new function, please do your due diligence and check that the
functionality you need doesn’t already exist somewhere else.

_(Don’t Repeat Yourself)_

### Describe your code

As covered by the [Keep it Simple](#keep-it-simple) rule, we do not code _only_ for ourselves.

Adding comments to our code will not only save other developers time when trying to resolve a problem
in the future, but will also prevent us from reverting fixes that were introduced for a very specific
reason.

Also very important that if you encounter a piece of logic that was complex, be nice to others and add
your conclusions to the undocumented piece of code as comments, so other developers can be faster in
the future.


Note that comments are usually added as a quick afterthought, and are therefore prone to containing
typos. Please take a moment to double check your comments for spelling mistakes and clarity.