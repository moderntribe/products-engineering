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

### Classes and IDs

#### Classes

Classes should follow the [Block Element Modifier (BEM)](http://getbem.com/naming/) format for
naming consistency and ease of targetting in CSS. There are no hard rules for naming in BEM
(other than what is provided in the link above). However, some ways are better than others. This
will usually come down to semantics of the HTML structure. The better the structure, the clearer
the names will be.

**Bad**
```html
<div class="Product-Card">
  <header class="card_header">
    <img src="/tec-icon.png" class="product-_image" />
  </header>
  <div class="card__content">
    <h3 class="product-LABEL">The Events Calendar</h3>
    <p class="product_description">
      Easily create and manage an events calendar on your website with The Events Calendar.
      Whether your events are in-person or virtual events, this plugin boasts professional
      features backed by our world-class team of developers and designers.
    </p>
  </div>
</div>
```

**Good**
```html
<article class="product-card">
  <header class="product-card__header">
    <img src="/tec-icon.png" class="product-card__header-image" />
  </header>
  <div class="product-card__content">
    <h3 class="product-card__label">The Events Calendar</h3>
    <p class="product-card__description">
      Easily create and manage an events calendar on your website with The Events Calendar.
      Whether your events are in-person or virtual events, this plugin boasts professional
      features backed by our world-class team of developers and designers.
    </p>
  </div>
</article>

<article class="product-card product-card--featured">
  <header class="product-card__header">
    <img src="/ecp-icon.png" class="product-card__header-image" />
  </header>
  <div class="product-card__content">
    <h3 class="product-card__label">Events Calendar Pro</h3>
    <p class="product-card__description">
      When events are your business, you need a calendar with more than the basics. Events
      Calendar Pro has all the features you need (and none of the junk you don’t).
    </p>
  </div>
</article>
```

#### IDs

We should aim to not use the `id` attribute whenever possible. However, sometimes it is
unavoidable due to accessibility reasons. There are no hard rules for naming IDs, but staying
consistent throughout an application is important.

As BEM aims to name classes with a consistent structure, this is a great starting point for
naming IDs.

**Good**
```html
<article id="product-card--tec" class="product-card">
  <header class="product-card__header">
    <img src="/tec-icon.png" class="product-card__header-image" />
  </header>
  <div class="product-card__content">
    <h3 class="product-card__label">The Events Calendar</h3>
    <p class="product-card__description">
      Easily create and manage an events calendar on your website with The Events Calendar.
      Whether your events are in-person or virtual events, this plugin boasts professional
      features backed by our world-class team of developers and designers.
    </p>
  </div>
</article>

<article id="product-card--ecp" class="product-card product-card--featured">
  <header class="product-card__header">
    <img src="/ecp-icon.png" class="product-card__header-image" />
  </header>
  <div class="product-card__content">
    <h3 class="product-card__label">Events Calendar Pro</h3>
    <p class="product-card__description">
      When events are your business, you need a calendar with more than the basics. Events
      Calendar Pro has all the features you need (and none of the junk you don’t).
    </p>
  </div>
</article>
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

### Others

There are a variety of other semantic elements that help convey meaning. These include
[`<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section),
[`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article),
[`<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time),
[`<address>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address),
[`<em>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em),
and many others. Using the appropriate element in the proper situations will help translate useful information
to those users who do not browse the page visually.

## Accessibility

We strive to write accessible HTML whenever possible. This means that we use the correct HTML
elements for the intended purposes. Accessible HTML is very closely linked to semantics.

### IDs

We should aim to not use the `id` attribute. However, there are time when this will be unavoidable.
When using the `id` attribute, a page cannot repeat an `id` more than once. This causes an accessibility
violation.

**Bad**
```html
<label for="name">Full name</label>
<input type="text" id="name" name="name" />
<label for="name">Pet name</label>
<input type="text" id="name" name="name" />
```

**Good**
```html
<label for="name">Full name</label>
<input type="text" id="name" name="name" />
<label for="pet-name">Pet name</label>
<input type="text" id="pet-name" name="petName" />
```

### Buttons and Links

Buttons and links are focusable interactive elements that do something when clicked or selected.

Links should be used when linking the user to another URL. They should not be used in place of a button.

**Bad**
```html
<a href="#">Click me to open a modal</a>
```

**Good**
```html
<a href="https://theeventscalendar.com/">Visit TEC</a>
```

Buttons are used for a target to create interactive experiences, typically using JavaScript,
for the user. We do not want to replace this with a link or another element.

**Bad**
```html
<a href="#">Open menu</a>

<div tabindex="0" onclick="function() { ... }">Click me</div>
```

**Good**
<button>Open menu</button>
```

### Images

Images should use the `alt` attribute whenever possible. For users who browse the web using
assistive technology, they may not be able to view the image and will receive the text
within the `alt` attribute instead.

The exception to this is if an image is purely for decorative purposes. In this case, an
empty `alt` attribute will convey this meaning.

**Bad**
```html
<img src="/cute-puppy.jpg" />
```

**Good
```html
<img src="/cute-puppy.jpg" alt="cute puppy playing with toy." />

<img src="/border-line.jpg" alt="" />
```

### Forms

Forms are complex HTML structures that require a bit of attention to make them accessible.
Fortunately, these are fairly easy to implement.

The first is form labels and related inputs. Form inputs should have labels linked to them
in order to convey this information properly to those using assistive technology. This can
be done by setting an `id` attribute on the input and using the same value in the `for attribute
of the label.

**Bad**
```html
<label>Full Name</label>
<input type="text" name="name" />
```

**Good**
```html
<label for="full-name">Full Name</label>
<input type="text" id="full-name" name="name" />
```

The next is to not use placeholders in place of labels. Placeholders may visually look like a
label, but do not convey the same information. For this reason, we always want a label associated
with a form input.

**Bad**
```html
<input type="tel" name="phone" placeholder="123-456-7890" />
```

**Good**
```html
<label for="phone">Phone</label>
<input type="tel" id="phone" name="phone" placeholder="123-456-7890" />
```

### Headings

As mentioned above in the semantics section, headings indicate the level of section headings and
their relative importance. Headings should not skip levels and there should be only one `h1` per page.

### ARIA Attributes

Accessible Rich Internet Applications (ARIA) attributes help make applications, especially those
using JavaScript functionality, more accessible to those using assistive technology. They supplement
the existing HTML and are not meant to replace the built-in attributes.

#### Disabled and Required

When using HTML form inputs, we may use the `disabled` and `required` attributes depending on the
situation. There are also, however, ARIA attributes with the same names: [`aria-disabled`](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-disabled)
and [`aria-required`](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-required). With HTML5,
we can now use the `disabled` and `required` attributes and do not need these ARIA attributes.

**Bad**
```html
<label for="full-name">Full Name</label>
<input type="text" id="full-name" name="name" aria-required="true" />

<label for="phone">Phone</label>
<input type="tel" id="phone" name="phone" placeholder="123-456-7890" aria-disabled="true" />
```

**Good**
```html
<label for="full-name">Full Name</label>
<input type="text" id="full-name" name="name" required />

<label for="phone">Phone</label>
<input type="tel" id="phone" name="phone" placeholder="123-456-7890" disabled />
```

#### Hidden, Expanded, and Controls

The ARIA attributes [`aria-hidden`](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-hidden),
[`aria-expanded`](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-expanded), and
[`aria-controls`](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-controls) often work in
combination with each other. This combination is often used for an accordion pattern or a custom
dropdown pattern and changed using JavaScript. These attributes allow the user using assistive
technology to understand how elements are linked together and what state they are in.

**Bad**
```html
<button>Accordion header</button>
<div class="u-hidden">
  <span>Accordion content</span>
</div>
```

**Good**
``html
<button
  id="accordion-header"
  aria-controls="accordion-content"
  aria-expanded="false"
>
  Accordion header
</button>
<div
  class="u-hidden"
  id="accordion-content"
  aria-hidden="true"
  aria-labelledby="accordion-header"
>
  <span>Accordion content</span>
</div>
```

#### Label and Labelledby

The ARIA attributes [`aria-label`](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-label) and
[`aria-labelledby`](https://www.w3.org/WAI/PF/aria/states_and_properties#aria-labelledby) allow the user
using assistive technology to receive an explanation associated with a specific element, much like a label
would provide.

**Bad**
```html
<!-- Navigations require a label to describe it -->
<nav>
  <!-- Navigation list -->
</nav>

<!-- Buttons require text to announce to assistive technology -->
<button>
  <svg><!-- SVG icon --></svg>
</button>
```

**Good**
```html
<nav aria-label="Primary Navigation">
  <!-- Navigation list -->
</nav>

<nav aria-labelledby="main-nav-heading">
  <h2 id="main-nav-heading" class="u-visual-hide">Primary Navigation</h2>
  <!-- Navigation list -->
</nav>

<!-- Using visually-hidden text is usually the best option here -->
<button>
  <svg><!-- SVG icon --></svg>
  <span class="u-visual-hide">Close menu</span>
</button>

<!-- In cases where visually-hidden text is not possible -->
<button aria-label="Close menu">
  <svg><!-- SVG icon --></svg>
</button>
```

## Security

### Anchor tags

When adding a new anchor tag with a `target="_blank"` attribute, simply adding that attribute
[adds an additional attack vector](https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/)
for folks with compromised site content.

For our plugins, we must be sure to add `rel="noopener noreferrer"` to anchor tags that make use
of `target="_blank"`.

**Bad**
```html
<a href="https://theeventscalendar.com" target="_blank">TEC</a>
```

**Good**
```html
<a href="https://theeventscalendar.com" target="_blank" rel="noopener noreferrer">TEC</a>
```
