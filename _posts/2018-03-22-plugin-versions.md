---
date: 2018-03-21
title: Plugin Versions
description: How to change Plugin Versions at Modern Tribe
icon: fa-file-text-o
categories:
  - Guidelines

---

In general at Modern Tribe plugins we keep our versions mostly inline with what [Semantic Versioning 2.0.0](http://semver.org),
with the exception of HotFixes.

## Feature

Minor version bump (`x.Y.z`) can be introduced only during a Feature release cycle, determined by if we **did** introduce any
features specifically to the plugin in question. Supporting changes in other plugins for a Feature release may be a [patch version](#maintenance-versions).

## Maintenance

Patch version bump (`x.y.Z`) can be introduced when we are doing Maintenance and Feature release cycles, determined by if
we **did not** introduce any features specifically to the plugin in question. Supporting changes to other plugins in a
Feature release may be a patch version too.

## Hotfix

Hotfix version bump (`x.y.x.W`) will only happen when during a Feature or Maintenance Release unexpected breaking changes
were introduced or a important security patch needs to be addressed.
