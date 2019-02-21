---
layout: default
title: Versions
description: How to change Plugin Versions at Modern Tribe
parent: Plugins
nav_order: 3
---

# Versions
{: .no_toc }

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---


On creation of a new `release/FYY.XX` or `release/MYY.XX` branch it is important to change the version string on a few files:
- `src/Tribe/Main.php`: On most plugins
- `package.json`: On all plugins
- `readme.txt`: On all plugins
- On plugin main PHP file on the root of the repository

In general at Modern Tribe plugins we keep our versions mostly inline with what [Semantic Versioning 2.0.0](http://semver.org),
with the exception of HotFixes.

## Feature

Minor version bump (`x.Y.z`) can be introduced only during a Feature release cycle, determined by if we **did** introduce any
features specifically to the plugin in question. Supporting changes in other plugins for a Feature release may be a [patch version](#maintenance-versions).

When changing the string on the required files for a minor version bump, we omit the zero (`x.Y.0`) on all files **but** the `package.json`.

## Maintenance

Patch version bump (`x.y.Z`) can be introduced when we are doing Maintenance and Feature release cycles, determined by if
we **did not** introduce any features specifically to the plugin in question. Supporting changes to other plugins in a
Feature release may be a patch version too.

## Hotfix

Hotfix version bump (`x.y.x.W`) will only happen when during a Feature or Maintenance Release, unexpected breaking changes
were introduced or an important security patch needs to be addressed.
