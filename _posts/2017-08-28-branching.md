---
date: 2017-08-28
title: Branching
categories:
  - Git
description: Git strategy for Branching and Pull Requests
icon: fa-file-text-o
---

## Master branch

The `master` branch contains the public, currently released version of the plugin. At the end of a
release cycle, release branches are merged into the master branch. The `master`
branch should generally not be committed to, except by the developer in charge of releasing the plugin.

_**NOTE:** if you need to test something against the currently released version of the plugin, a
simple way to switch to that version is by checking out the master branch. Just be sure to switch
back to your working branch before you make any commits!_

## Bucket branches

Major feature branches are where we work on new development for our products. These branches act as
a shared location for developers to Pull Request work specific to the feature being developed. Major
feature branches should have a Milestone associated with them in GitHub that specifies the branch name.
When a major feature is determined, it should be branched from the latest Tagged release and _all_
code for that feature should be Pull Requested into that branch rather than direct committed and pushed.

When major/maintenance releases are released, the developers that are leading the feature work
are in charge of merging `master` into their respective feature branches.

## Major releases

When one or more features are ready for release prep, a `release/FYY.XX` branch should be created from
the latest tagged release and the feature branches should be Pull Requested into that release branch.

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

## Code reviews

**All code that is intended to be merged to `master`, `release` or `bucket` branch must first
undergo code review.**

Code reviews must be done by a core product engineer.

When an engineer has code ready for merging, they should create a pull request that includes a link
back to the ticket in Modern Tribe's Internal Central Tickets ("Central").  If the request is coming
from a 3rd party contributor, a Modern Tribe representative should create a ticket in Central to
track this change and add a link in a comment on the pull request.  In Central, a reciprocal link
should be added to link back to any pull requests associated with the ticket and the ticket status
should be set to “Pending Code Review”.

Reviewers should consider the following:

* Does this code meet [our standards](/)?
* Is the pull request against the correct branch?
* Does the solution make sense?
* Will this solution lead to other problems? (compatibility, performance, etc)

Once a reviewer has approved a pull request, they should leave a comment on the pull request and
change the Central ticket status to “Pending QA”.  At this point it should undergo QA.  Assuming QA
passes, the status on the ticket should be changed to “Pending Merge”.  Once the original requestor
(or Modern Tribe representative) gets approval, they should merge the code and change the status in
the ticket to “Pending Smoketest” or “Pending Release” as appropriate.


### Labels for pull requests

| Label | Description | Who |
| ----- | ----------- | --- |
| `code-review` | The PR is awaiting code review. | Added by the pull request submitter. Removed by code reviewer. |
| `in-qa` | The code was approved and now is ready to be QA’d | Added by the code reviewer. Removed when `merge` label is added or if fails QA. |
| `merge` | Work on the ticket has been reviewed and tested.  Go ahead and merge! | Added by the person who did the QA. |
| `question` | The PR has a question that needs lovin'. Work is blocked until the question has been answered. | Typically assigned to the person that can answer the question. Typically removed by the person who answers the question. |
| `hold` | Don't move forward with the next status. See comments for details. | Typically added by a PM or lead dev. Confirm with Matt, Rob, or Zach before removing. |
| `bug` | There is a bug in the code submitted in this PR. | Added by the code reviewer. Removed once the bug is resolved. |
| `enhance` | There is a recommended enhancement to the code. | Added by the code reviewer.  Removed if the enhancement is done or it is agreed that it should not be done. |