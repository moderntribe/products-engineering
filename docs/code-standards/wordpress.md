---
layout: default
title: WordPress
description: WordPress Code Standards
parent: Code Standards
nav_order: 5
---

# WordPress
{: .no_toc }

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Hooks vs constants

Occasionally we may have a request or an idea for a setting that could be useful to advanced users, but that isn’t something we’d want to expose to everyone in the plugin’s settings pages. In those cases, we’ll usually want to create a “hidden” setting that is available for users to set the value of via a hook or a constant.

### When to Use a Hook
Most of the time hooks should be used to create these hidden settings. A user will then be able to create a line in their functions.php which sets the value.

### When to Use a Constant
Constants should only be used when a site owner will want to set a setting site-wide, no matter what theme or plugins are in use, and no theme or plugin should be allowed to override this value. A user will then be able to create a line in their wp-config.php which sets the value.

_**NOTE:** if a Modern Tribe developer would like to suggest a constant be used, they will need to bring it up during the code review that happens once per release cycle. Pull requests that add constants to the codebase will also need to be discussed on Modern Tribe's internal code review before they are accepted._

### Hooking from Within Objects
Very often an object will need to add a number of actions and filters of its own. As a rule of thumb, any `add_action()` or `add_filter()` calls should be contained inside a `hook()` method and should **not** be setup from within the constructor.

## How to deprecate

When a global function or hook needs to be renamed or taken out of use, please take the following steps:

* For functions, move the function to the `deprecated.php` file
* Place an `@deprecated` phpDoc docblock tag in the documentation for the function or hook
* Place an `@todo` in the phpDoc docblock that describes when to remove the function. It should be a minimum of two versions into the future.
* For functions, run WordPress' `_deprecated_function()` just inside function
* For hooks, check `has_filter()`, and if it returns true, run the WordPress `_deprecated_function()` just above the hook

_**NOTE:** private and protected class members don’t need to be deprecated._
