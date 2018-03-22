---
date: 2018-03-22
title: Code Reviews
description: GitHub pull requests for Plugins on Modern Tribe
icon: fa-file-text-o
categories:
  - Git
---
**All code that is intended to be merged to `master`, `release` or `bucket` branch must first
undergo code review.**

Code reviews must be done by a core product engineer.

When an engineer has code ready for merging, they should create a pull request that includes a link
back to the ticket in Modern Tribe's Internal Central Tickets ("Central").  If the request is coming
from a 3rd party contributor, a Modern Tribe representative should create a ticket in Central to
track this change and add a link in a comment on the pull request.  In Central, a reciprocal link
should be added to link back to any pull requests associated with the ticket and the ticket status
should be set to “Pending Code Review”.

## Considerations

Reviewers should consider the following:

* Does this code meet [our standards]({{ site.baseurl }}/category/#code-standards)?
* Is the pull request against the correct branch?
* Does the solution make sense?
* Will this solution lead to other problems?
  * Backwards Compaitiblity
  * Performance
  * Security
  * Language Typos

Once a reviewer has approved a pull request, they should leave a comment on the pull request and
change the Central ticket status to “Pending Merge”. After the merge it should undergo QA. Assuming QA
passes, the status on the ticket should be changed to “Pending Merge”. Once the original requestor
(or Modern Tribe representative) gets approval, they should merge the code and change the status in
the ticket to “Pending QA".

## Labels

| Label | Description | Who |
| ----- | ----------- | --- |
| `code-review` | The PR is awaiting code review. | Added by the pull request submitter. Removed by code reviewer. |
| `in-qa` | The code was approved and now is ready to be QA’d | Added by the code reviewer. Removed when `merge` label is added or if fails QA. |
| `merge` | Work on the ticket has been reviewed and tested.  Go ahead and merge! | Added by the person who did the QA. |
| `question` | The PR has a question that needs lovin'. Work is blocked until the question has been answered. | Typically assigned to the person that can answer the question. Typically removed by the person who answers the question. |
| `hold` | Don't move forward with the next status. See comments for details. | Typically added by a PM or lead dev. Confirm with Matt, Rob, or Zach before removing. |
| `bug` | There is a bug in the code submitted in this PR. | Added by the code reviewer. Removed once the bug is resolved. |
| `enhance` | There is a recommended enhancement to the code. | Added by the code reviewer.  Removed if the enhancement is done or it is agreed that it should not be done. |