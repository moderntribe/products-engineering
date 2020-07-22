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

* HTML elements should be nested and indented logically
* HTML elements should be properly closed
* Indents should consist only of tabs and not spaces
* Use lowercase for elements and attributes
* PHP blocks are indented according to the same rules as HTML elements
* Single line segments of PHP like our `esc_html_e()` call still terminate with a semi-colon

**Bad**
```html
<Div class="COMPONENT">
<div class="PaRt">
<?php if ( 'met' === $condition ): ?>
  <a href="#"><?php esc_html_e( 'Follow this link', 'textdomain' ) ?></a>;
<?php endif; ?>
</Div>
```

**Good**
```html
<div id="component">
  <div class="part">
    <?php if ( 'met' === $condition ): ?>
      <a href="#"><?php esc_html_e( 'Follow this link', 'textdomain' ); ?></a>;
    <?php endif; ?>
  </div>
</div>
```

### Attributes

Attributes should always be lowercase and within quotes, even if they are booleans or numbers.
Just as with PHP or Javascript, we should strive to avoid overly-long lines of code as this can harm readability.
In particular, if there are a large number of attributes for a given element then it can be desirable to break them
up over multiple lines. In such a case we use the following convention:

**Bad**
```html
<div id=some-id class=some-class data=1>
  <!-- Inner HTML -->
</div>
```

**Good**
```html
<div
  id="some-id"
  class="some-class"
  data-some-data="1"
>
  <!-- Inner HTML -->
</div>
```

## Semantics

HTML doesn't just display information on a page, it conveys meaning. Semantics are important when writing HTML
as it describes the structure of a page to those who may not be able to visually browse the page.

### Header and Footer

[Header](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) and
[footer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) elements indicate specific header
and footer regions.

**Bad**
```html
<div class="header">
  <h1 class="title">Title</h1>
</div>
<div class="content">
  <!-- Content -->
</div>
<div class="footer">
  <span class="copyright">Copyright</span>
</div>
```

**Good**
```html
<header>
  <h1 class="title">Title</h1>
</header>
<div class="content">
  <!-- Content -->
</div>
<footer>
  <span class="copyright">Copyright</span>
</footer>
```

### Navigation

The [navigation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) element indicates a navigation
region and should be used to wrap a list of menu items.

**Bad**
```html
<div class="nav">
  <ul class="list">
    <li class="list-item"><a href="#">Item 1</a></li>
    <li class="list-item"><a href="#">Item 2</a></li>
    <li class="list-item"><a href="#">Item 3</a></li>
  </ul>
</div>
```

**Good**
```html
<nav>
  <ul class="list">
    <li class="list-item"><a href="#">Item 1</a></li>
    <li class="list-item"><a href="#">Item 2</a></li>
    <li class="list-item"><a href="#">Item 3</a></li>
  </ul>
</nav>
```

### Headings

[Headings](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) indicate the
level of section headings and their relative importance, from `h1` being the highest level to `h6`
being the lowest. Headings should not skip levels and there should be only one `h1` per page.

**Bad**
```html
<h1>Page title</h1>
<!-- content -->
<h3>Section heading</h3>
<h6>Section subheading</h6>
<!-- content -->
<h6>Section subheading</h6>
<!-- content -->
<h4>Section heading</h4>
<h2>Section subheading</h2>
<!-- content -->
<h2>Section subheading</h2>
<!-- content -->
```

**Good**
```html
<h1>Page title</h1>
<!-- content -->
<h2>Section heading</h2>
<h3>Section subheading</h3>
<!-- content -->
<h3>Section subheading</h3>
<!-- content -->
<h2>Section heading</h2>
<h3>Section subheading</h3>
<!-- content -->
<h3>Section subheading</h3>
<!-- content -->
```

### Section and Article

[Section] and article

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
