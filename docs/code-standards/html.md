---
layout: default
title: HTML
description: HTML Code Standards
parent: Code Standards
nav_order: 2
---

# HTML
{: .no_toc }

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## The basics

First and foremost, we make an attempt to adhere to the [WordPress HTML coding standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/html/).

## Code style

* HTML blocks should be nested and indented logically
* The initial indent should consist only of tabs and not spaces
* PHP blocks are indented according to the same rules as HTML elements
* Single line segments of PHP like our `esc_html_e()` call still terminate with a semi-colon

Example:

```html
<div id="component">
  <div class="part">
    <?php if ( 'met' === $condition ): ?>
      <a href="#"><?php esc_html_e( 'Follow this link', 'textdomain' ); ?></a>;
    <?php endif; ?>
  </div>
</div>
```

### Multiline attributes

Just as with PHP or Javascript, we should strive to avoid overly-long lines of code as this can harm readability.
In particular, if there are a large number of attributes for a given element then it can be desirable to break them
up over multiple lines. In such a case we use the following convention:

```html
<div
  id="some-id"
  class="some-class"
  data-some-data="1"
>
  <!-- Inner HTML -->
</div>
```

## Anchor tags

### `_blank`

When adding a new anchor tag with a `target="_blank"` attribute, simply adding that attribute [adds an additional attack vector](https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/) for folks with compromised site content.

For our plugins, we must be sure to add `rel="noopener noreferrer"` to anchor tags that make use of `target="_blank"`.

**Good**

```html
<a href="https://theeventscalendar.com" target="_blank" rel="noopener noreferrer">TEC</a>
```

**Bad**

```html
<a href="https://theeventscalendar.com" target="_blank">TEC</a>
```
