---
date: 2017-08-28
title: Branching
description: Git strategy for Branching on Plugins for Modern Tribe
icon: fa-file-text-o
categories:
  - Git
---

## Master branch

The `master` branch contains the public and stable, currently released version of the plugin. At the end of a
release cycle, release branches are merged into the master branch. The `master` branch should
generally not be committed to, except by the developer in charge of releasing the plugin.

_**NOTE:** if you need to test something against the currently released version of the plugin, a
simple way to switch to that version is by checking out the `master` branch. Just be sure to switch
back to your working branch before you make any commits!_

## Bucket branches

We are developing our features in what we call bucket branches, they allow us to work on the major feature
changes in separate and parallel to other development.

These branches should have a Milestone associated with them in GitHub that specifies the branch name, via
it's description. That will allow the bot to sync Tribe Common with the correct version. _E.g.:_

![Bucket Milestone Edit]({{ "/assets/images/posts/branches/bucket-milestone.png" | absolute_url }})

When a bucket is determined, it should be branched from the latest Tagged release and _all_ code for that
feature should be Pull Requested into that branch rather than direct committed and pushed. See the article
about [plugin versions]({{ site.baseurl }}/guidelines/plugin-versions) to see how to what file changes are required.

Eventually every bucket branch will become a Feature release once we get into smoketesting phase.

On feature/maintenance releases, the developers that are leading the feature work are in charge of merging
`master` into their respective feature branches.

## Feature releases

Once a bucket branch reaches the Smoketest phase we need to branch out of that `bucket/name` into `release/FYY.XX`.

Important to note that version numbers on this stage of the release a version change might be noted with a release
candidate pre-release tag as `x.y.z-RC`, which denotes that we are publicly shipping this to customers. See more
on [plugin versions]({{ site.baseurl }}/guidelines/plugin-versions).

## Maintenance releases

While working on a maintenance release, most code should be developed in the corresponding release
branch (`release/MYY.XX`). This should be considered the primary working branch during every
maintenance release cycle.

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