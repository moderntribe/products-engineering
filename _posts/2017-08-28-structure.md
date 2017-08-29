---
date: 2017-08-28
title: Structure
categories:
  - Guidelines
description: Plugin file Structure
icon: fa-file-text-o
---
## File Naming

It should also be rare that you need to create a new file. Note that file naming is one of the few areas where we depart from the published WordPress coding standards.

**PHP Class Files** - `Class_Name.php` (please note, only one class per file. The filename needs to match exactly the final portion of the actual class name, i.e. the portion after the last double underscore)
**Javascript Files** - `some-descriptor.js` (use a dash to separate segments)

## Directory structure

It’ll be rare that new directories will need to be created, but please adhere to the following structure:

<pre>
plugin-directory/
  lang/                 ← translations go here
  src/                  ← all new code will go in here
    Tribe/              ← all the Modern Tribe php classes
    admin-views/        ← plugin dashboard view files
    deprecated/         ← deprecated logic goes here
    functions/          ← files containing global functions for public use
      template-tags/    ← files containing template tags
    resources/          ← any static assets, including js, css, and images
      css/              ← compiled CSS goes here
      images/           ← images and icons
      js/               ← javascript goes here
      scss/             ← SCSS goes here
    views/              ← plugin view files
  tests/                ← unit tests go here
  vendor/               ← 3rd party libraries should be added here
</pre>