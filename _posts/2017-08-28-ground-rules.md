---
date: 2017-08-28
title: Ground Rules
categories:
  - Guidelines
description: Ground Rules for Coding at Modern Tribe
icon: fa-file-text-o
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

### Rule 1: Make sure your code is written in such a way that another developer could look at it and know what it does without much effort.

This includes not making overly complex or nested loop structures and conditional statements --
remember to K.I.S.S. (Keep It Simple, Stupid!).

**Example: Nested Levels & Excess Comparisons**

Right:

	// this does the exact same thing!
	if ( empty ( $date ) ) {
		return false;
	}

	if ( $date > $date1 ) {
		// do something
	} else if ( $date < $date 2 ) {
		// do something else
	}

Wrong:

	// too many nested levels and convoluted logic
	if (  ! empty ( $date ) && ( $date > $date1 || $date < $date2 ) ) {
		if ( $date > $date1 ) {
			// do something
		} else if ($date < $date2 ) {
			// do something else
		}
	} else {
		if ( empty ( $date) ) {
		return false;
	}
}

**Example: Sacrificing Readability for Being Clever**

Right:

	// this does the same thing.. a few extra lines, but it’s far more readable:
	$tribe_events_template = tribe_get_option( 'tribeEventsTemplate', 'default' );
	if ( $tribe_events_template == 'default' ) {
		$tribe_events_template = 'page.php';
	}
	$template = locate_template( $tribe_events_template );

Wrong:

	// believe it or not, this is all in one line:
	$template = locate_template( tribe_get_option( 'tribeEventsTemplate', 'default' ) == 'default' ? 'page.php' : tribe_get_option( 'tribeEventsTemplate', 'default' ) );


### Rule 2: Name your functions and variables plainly and descriptively.

If you’re good at this, sometimes comments and confusion can both be avoided!

**Ex. 3, Function & variable naming**

Right:

	// clearly named variables and function
	$days_between = tribe_calc_days_between( $start_date, $end_date );

Wrong:

	// non-descript variable and function names
	$x = how_many($y, $z);

### Rule 3: D.R.Y. (Don’t Repeat Yourself).

If you ever find yourself duplicating a line of code, there’s probably something wrong. Go back and
figure out how you can solve the problem without any duplicate code (i.e. create a function or a
variable that you can reuse).

When developing Modern Tribe products, following the D.R.Y. rule also means: don’t write new code
when there already exists functionality in PHP, WordPress, or elsewhere in the products suite, which
does the same thing. Before writing a new function, please do your due diligence and check that the
functionality you need doesn’t already exist somewhere else.

### Rule 4: Be sure to include clear and accurate comments.

Occasionally a complex solution to a problem will be required, and when you realize that it’s not
immediately clear what a block of your code is doing, you should add an extra line break above it,
and enter a comment, for the benefit of your teammates who might encounter this block of code in the
future. Keep in mind that it’ll only take you 30 seconds, but could save someone else 5 minutes or
more.

Note that comments are usually added as a quick afterthought, and are therefore prone to containing
typos. Please take a moment to double check your comments for spelling mistakes and clarity.