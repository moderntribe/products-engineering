---
layout: default
title: Changelogs
description: How to keep track of changes and inform to our users about it
parent: Git
---

# Changelogs
{: .no_toc }

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---


## What's a changelog? 

The changelog are used to keep track of the changes in the plugin introduced in Maintenance Release or Feature releases, they are useful to 
indicate what things has been changed or added into the plugin. Are usually included inside of the file `readme.txt` file of the plugins
and are displayed in the main page of the plugins. 

## Examples

You can take a look at the reference used inside of the repository of [TEC plugin](https://github.com/the-events-calendar/the-events-calendar/blob/master/readme.txt#L216-L241)

```
== Changelog ==

= [4.6.14.1] 2018-04-18 =

* Fix - Fixed fatal error that would sometimes arise when The Events Calendar was set to display on the front page

= [4.6.14] 2018-04-18 =

* Fix - Updated the "front page" logic to store the value in the DB instead of "mocking" the view via JS [100832]
* Fix - Fixed the generation of PHP warnings on retrieval of posts if the "Include events in main blog loop" option is checked (thanks to Colin Carmichael for reporting this problem) [97667]
* Fix - Made the `tribe-ea-record` custom post type (used to store Event Aggregator record information) private [99106]
* Fix - Expanded the size of the time zone input in the admin to allow for better visibility for long names [100363]
* Fix - If the main events page is set to be the site's front page, ensure it shows as "selected" in the Customizer's front page option [100832]
* Fix - Fixed an issue where failed Event Aggregator scheduled imports would re-attempt the import too soon [102489]
* Fix - Ensure the Tribe Bar displays all the available ranges of dates and times [100646]
* Fix - Hid the filters in the Tribe Bar if a unique view is enabled [75114]
* Fix - Fixed some imported-event handling so that events with no time and that aren't all-day events do not display on the front-end [93979]
* Fix - Changed the HTTP status codes of empty event, venue, organizer, category, and tag archives from 404 to 200 and return empty arrays to stick with WP REST API standard [102283]
* Fix - Better "guessing" on column mapping during the import of CSV file (thanks to April in our Help Desk for flagging this problem!) [96162]
* Tweak - Added the `tribe_aggregator_find_matching_organizer` and `tribe_aggregator_find_matching_venue` filters in Events Aggregator to allow the definition of custom Venue and Organizer match criteria [97292]
```

## Format

Every single changelog has the following format:

```
* Type - Short description (props if applicable) [#issue]
```

Every entry usually has the format described above, some are optional in some situations.

## Format breakdown

| Part | Description |
| ---- | ------------|
| `*` | The sentence is always entered with the asterisk sign at the start of the line  |
| `Type` | Typically this is: Fix, Feature, Tweak associated with the [name of your branch]({{ site.baseurl }}{{ "/docs/git/branching" | absolute_url }}) |
| `-` | Regular no need hyphen for a full not a fancy stop or period em-dash | 
| `Description` | A short description about the change, meaningful for the end users so if no technicality is included is better |
| `(props if applicable)` | Credit to the users flagging the issue in the Help desk or the WordPress forums |
| `[#issue]` | Number of issue from central associated with change inside of brackets

**Note:** Another important consideration is that usually the description does not have a full stop period.
