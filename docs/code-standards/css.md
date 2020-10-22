---
layout: default
title: CSS
description: CSS Code Standards
parent: Code Standards
nav_order: 1
---

# CSS
{: .no_toc }

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## PostCSS

The CSS within Modern Tribe plugins built/transformed with [PostCSS](https://github.com/postcss/postcss).
When contributing CSS changes to our plugins, please be sure to edit files within `src/resources/postcss`
rather than `src/resources/css`. Getting your environment set up to work with our PostCSS configuration
is fairly simple:

Prequisite: [Install node.js](https://nodejs.org/)

1. In the root directory of the plugin, type `npm install`.
1. Edit PostCSS (`.pcss`) files in `src/resources/postcss` to your heart's content.
1. Compile the PostCSS into CSS by running `gulp`

### PostCSS plugins

We employ a number of PostCSS plugins to transform our `.pcss` files into CSS. They are as follows:

**[PostCSS Preset Env](https://preset-env.cssdb.org/)**

PostCSS Preset Env is a PostCSS plugin that helps you to use the latest CSS syntax today. It transforms
new CSS specs into more compatible CSS so you don't need to wait for browser support.

**[PostCSS Import](https://github.com/postcss/postcss-import)**

This plugin allows you to `@import` rules from another file. Simply add `@import 'somefile.css';`
and it will inject the contents of `somefile.css`.

**[PostCSS Nested](https://github.com/postcss/postcss-nested)**

PostCSS plugin to unwrap nested rules like how Sass does it. Basically... it provides support for rule nesting.

**[PostCSS Mixins](https://github.com/postcss/postcss-mixins)**

This plugin adds support for mixins similar to Sass, however the syntax is a bit different. You define mixins
via `@define-mixin mixinname {}` and you include the mixin via `@mixin mixinname;`.

**[PostCSS MediaQuery Packer](https://github.com/hail2u/node-css-mqpacker)**

This plugin merges identical media queries during compilation into CSS.

## CSS Basics

First and foremost, we make an attempt to adhere to the [WordPress CSS coding standards](https://make.wordpress.org/core/handbook/coding-standards/css/).
There is an exception to this rule, however...**Property Ordering**.

### Property ordering

There are a few strategies for ordering CSS properties out in the wild. The approach we take is alphabetical
ordering of properties.

**Avoid**

```css
.thing {
  color: #555;
  border: 1px solid #ddd;
  background: #eee;
  position: absolute;
  top: 20px;
  left: 10px;
}
```

**Prefer**

```css
.thing {
  background: #eee;
  border: 1px solid #ddd;
  color: #555;
  left: 10px;
  position: absolute;
  top: 20px;
}
```

### Efficiency

Be sure to use [efficient selectors](https://csswizardry.com/2011/09/writing-efficient-css-selectors/).
Classes have a nice balance between reusability and efficiency, so their use is preferred over other
selectors if possible.

### Specificity

Be conscious of [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) when using
selectors. As a rule of thumb, do not use IDs as selectors. They carry too much weight on specificity
and become difficult to override. Use classes instead.

### !important

As a general rule, don't use `!important` unless you absolutely must. Be prepared to justify its
usage during the code review process.

## Methodology

We should use the [Block Element Modifier (BEM)](http://getbem.com/) methodology whenever possible.
The BEM methodology to naming classes allows us to create modular styles and a consistent naming
approach. Below we cover each component of the BEM methodology.

### Block

A block is an independent entity that has meaning on its own. Some examples include header,
menu, card, and slider. Classes that represent a block could be: `.header`, `.menu`,
`.product-card`, and `.image-slider`.

### Element

An element is a part of a block that doesn't mean anything by itself, but has semantic meaning attached
to a block. Some examples include menu item, card title, and slider slide, Classes that represent an
element could be: `.menu__item`, `.card__title`, and `.image-slider__slide`.

### Modifier

A modifier is a flag on a block or element that indicates an altered behavior or appearance. Some examples
include a rounded button, a highlighted menu item, and a featured card. Classes that represent these
could be: `.button--round`, `.menu__item--highlighted`, and `.product-card--featured`.

When applying modifiers, they should be applied in a semantic manner. If we have a featured product card
where the header and content element styles change, we should have a `.product-card--featured` class rather
than a `.product-card__header--featured` and `.product-card__content--featured` class to each of the
elements that have featured styles. This implies that we could have a featured product card header without
a featured product card content, and vice-versa, when they both are applied together. This also introduces
a maintenance problem when the product card grows and new elements that require featured styles are introduced.

## General structure

When building styles for a particular feature, you may run into scenarios where media queries and various
different selectors are required and it may become difficult to know what order these should come in. As a
general guideline, it is best to structure the styles in the following order: base styles, media queries,
pseudo-classes, and modifiers. The example below illustrates how to set this up:

```css
.button {
  background-color: var(--color-dark-grey);
  color: var(--color-white);
  font-size: 16px;
  line-height: 1.25;

  @media (--viewport-medium) {
    font-size: 18px;
    line-height: 1.33;
  }

  &:hover,
  &:focus {
    background-color: var(--color-grey);

    @media (--viewport-medium) {
      background-color: transparent;
      color: var(--color-dark-grey);
    }
  }
}

.button--secondary {
  background-color: var(--color-blue);
  border-radius: 10px;

  @media (--viewport-medium) {
    border-radius: 12px;
  }

  &:hover,
  &:focus {
    background-color: var(--color-dark-blue);

    @media (--viewport-medium) {
      background-color: transparent;
      color: var(--color-blue);
    }
  }
}
```

There are a couple reasons we want to set up the style structure in this order. The first is due to the
cascading nature of CSS. When there are multiple selectors with the same specificity (for example,
`.button:hover` and `.button--secondary:hover`), the styles from the later selector will take effect.
In this example, the background color will become dark blue.

The second reason is that the later items can contain the earlier items. For example, pseudo-classes can
contain media queries that change styles at different viewport sizes. Another example is that modifiers
can contain both pseudo-classes and media queries. This is illustrated beautifully in the above example.
If we did this in a different order than what is outlined in the example above, we may run into issues
when media queries, pseudo-classes, and modifiers all combine together.
