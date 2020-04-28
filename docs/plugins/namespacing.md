---
layout: default
title: Namespacing
description: Plugin conventions for Namespaces, Assets and Classes
parent: Plugins
nav_order: 2
---

# Namespacing
{: .no_toc }

---


## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

Each plugin and major product area has its own prefix for hooks and `tribe()` container slugs. The
prefixes are as follows:

| Product | Hook prefix | Container prefix | PHP namespace |
|---------|-------------|-------|-------|
| Tribe Common | `tribe_` | `common.` | Tribe\Common |
| Event Aggregator | `tribe_aggregator_` | `aggregator.` | Tribe\Aggregator |
| The Events Calendar | `tribe_events_` | `tec.` | Tribe\Events |
| The Events Calendar PRO | `tribe_events_pro_` | `pro.` | Tribe\Events\Pro |
| Virtual Events | `tribe_events_virtual_` | `events-virtual.` | Tribe\Events\Virtual |
| Community Events | `tribe_events_community_` | `community.` | Tribe\Events\Community |
| Community Tickets | `tribe_community_tickets_` | `community-tickets.` | Tribe\Events\Community\Tickets |
| Eventbrite Tickets | `tribe_events_eventbrite_` | `eventbrite.` | Tribe\Events\Eventbrite |
| Filter Bar | `tribe_events_filter_` | `filterbar.` | Tribe\Events\Filter_Bar |
| Event Tickets | `tribe_tickets_` | `tickets.` | Tribe\Tickets |
| Event Tickets Plus | `tribe_tickets_plus_` | `tickets-plus.` | Tribe\Tickets\Plus |
| Image Widget | `tribe_image_` | `image.` | Tribe\Image_Widget |
| Image Widget Plus | `tribe_image_plus_` | `image-plus.` | Tribe\Image_Widget\Plus |

_Despite being embedded within the-events-calendar, Event Aggregator deserves (and gets) its own prefix._

## Hook examples

```php
<?php
// hook in tribe common for firing the bacon action
do_action( 'tribe_bacon' );

// hook in TEC for firing the potato action
do_action( 'tribe_events_potato' );

// hook in the Event Aggregator section of TEC for firing the squid action
do_action( 'tribe_aggregator_squid' );
```

## Container slug examples

```php
<?php
// declare singleton for the panda class in tribe-common, then call it
tribe_singleton( 'common.panda', 'Tribe__Panda' );
tribe( 'common.panda' );

// declare singleton for the squirrel admin class in TEC, then call it
tribe_singleton( 'tec.admin.squirrel', 'Tribe__Events__Admin__Squirrel' );
tribe( 'tec.admin.squirrel' );

// declare singleton for the baboon class in the Event Aggregator code within TEC, then call it
tribe_singleton( 'aggregator.baboon', 'Tribe__Events__Aggregator__Baboon' );
tribe( 'aggregator.baboon' );
```

## Style and script slugs

When registering and enqueuing scripts and styles, we should append `-css` in the case of stylesheets. Example:

| Asset slug              | Asset type |
|-------------------------|------------|
| `tribe-post-editor`     | JS         |
| `tribe-post-editor-css` | CSS        |

_Note that in this instance we prefer hyphens over underscores._
