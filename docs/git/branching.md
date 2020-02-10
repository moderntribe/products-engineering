---
layout: default
title: Branching
description: Git strategy for Branching on Plugins for Modern Tribe
parent: Git
---

# Branching
{: .no_toc }

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---


## Master branch

The `master` branch contains the public and stable, currently released version of the plugin. At the end of a
release cycle, release branches are merged into the master branch. The `master` branch should
generally not be committed to, except by the developer in charge of releasing the plugin.

_**NOTE:** if you need to test something against the currently released version of the plugin, a
simple way to switch to that version is by checking out the `master` branch. Just be sure to switch
back to your working branch before you make any commits!_

## Release branches

We organize our releases on release branches by team. Release branches follow this naming scheme: `release/<T><Y>.<R>[.<H>]`, where:

* T = team initial
* Y = 2 digit year
* R = release number
* H = hotfix number

An example release from the 2nd release from Blue Team in 2020 would be: `release/B20.02` and a hotifx for that release
would be: `release/B20.02.1`.

## Ticket branches

_**NOTE:** The following instructions are for internal use only, if you're sending a pull request,
it'll already be in its own branch._

The naming convention for new branches should be as such
```
<feature|fix>/<ticket number>-<brief-description>
```

**For example:**
- `feature/TEC-24343-activation-page`
- `fix/TEC-28363-list-view-eod-cutoff`
- `hotfix/TEC-123-very-minor-text-change`

## Types of Pull Requests

### Features

#### Major features

When working on features that require multiple devs, multiple sprints, or parts built in chunks, we consider this a major
feature. Major features require "Bucket branches"–specifically, branches named `bucket/feature-name`. These bucket
branches should be decided upon by the team, as all PRs related to that feature will be pull requested into that
bucket branch.

Major features are segregated into bucket branches to allow for focused QA effort _before_ being merged into a release
branch, as major features carry the most risk of being delayed.

#### Minor features

Minor features can be developed using branches named `feature/TICKET-name-of-feature` and pull requested directly into
release branches.

### Fixes

Fixes can be developed using branches named `fix/TICKET-name-of-fix` and pull requested directly into
release branches.

### Tweaks

Tweaks–or small changes to functionality with low impact–can be developed using branches named `feature/TICKET-name-of-fix`
and pull requested directly into release branches.

## Ticket branches

_**NOTE:** The following instructions are for internal use only, if you're sending a pull request,
it'll already be in its own branch._

If you find yourself assigned to a ticket you anticipate may need extreme QA effort, break other
areas of the plugin, or has the potential (for any reason) not to be finished in a single release
cycle, please create a branch off of develop, and do your work in there.

The naming convention for new branches should be as such
```
<feature|fix>/<ticket number>-<brief-description>
```

**For example:**
- `feature/24343-activation-page`
- `fix/28363-list-view-eod-cutoff`
- `hotfix/very-minor-text-change`

Please ensure that the prefix (_“feature”_ or _“fix”_) corresponds to the issue tracker selected in
the ticket.
