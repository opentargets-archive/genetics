## Title
Define front-end code repo and package structure for Open Targets Genetics.

## Status
ACCEPTED

## Context
Using a single repo for all front-end code would be the simplest option. On the other hand, we may want to plan for reuse of charts (by us and other teams) and generic components like headers/footers (by us). 
Having a repo or package for every component we create is the other extreme and add a lot of maintenance overhead.

## Decision
Use three repos:
* `genetics-app`: the site
* `ot-charts`: reusable charts
* `ot-ui`: reusable ui components

## Consequences
* Updating of charts and components in development is as straightforward as with a single repo using `yarn link`.
* Updating of charts and components in production requires the update of the `ot-charts` and `ot-ui` packages on `npm` prior to release.
