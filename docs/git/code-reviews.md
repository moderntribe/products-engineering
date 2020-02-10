---
layout: default
title: Code Reviews
description: GitHub pull requests for Plugins on Modern Tribe
parent: Git
---

# Code Reviews
{: .no_toc }

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

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

### Status Labels

| Label | Description | Who |
| ----- | ----------- | --- |
| `code-review` | Status: requires a code review. | Added by the pull request submitter. Removed by code reviewer. |
| `hold` | Status: on hold–do not proceed with other status items. | Typically added by a PM or lead dev. Confirm with Matt, Rob, or Zach before removing. |
| `in-qa` | Status: requires QA before merging. | Added by the code reviewer. Removed when `merge` label is added or if fails QA. |
| `merge` | Status: ready to merge. | Added by the reviewer or the person who did the QA. |

### Review Labels

| Label | Description | Who |
| ----- | ----------- | --- |
| `bug` | Contains a bug that needs resolution. | Added by the code reviewer. Removed once the bug is resolved. |
| `enhance` | Code could use some enhancements before merging. | Added by the code reviewer.  Removed if the enhancement is done or it is agreed that it should not be done. |
| `needs artifact` | A screencast, screenshot, or other artifact is needed before merging. | Added by code reviewer. |
| `needs changelog` | Needs a changelog entry before merging. | Added by code reviewer. |
| `needs release` | Needs an associated release in Jira before merging. | Added by code reviewer. |
| `needs tests` | Needs tests before merging. | Added by code reviewer. |
| `needs ticket` | Needs an associated Jira ticket before merging. | Added by code reviewer. |
| `question` | Needs an answer to one or more questions before merging. | Typically assigned to the person that can answer the question. Typically removed by the person who answers the question. |
| `translation` | Has translation issues that need to be resolved before merging. | Added by code reviewer. |
