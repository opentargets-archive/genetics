## Title
Choose front-end framework for Open Targets Genetics.

## Status (one of PROPOSED, ACCEPTED, REJECTED, DEPRECATED, SUPERCEDED)
ACCEPTED

## Context
There are multiple options, but those considered are outlined below.
| | AngularJS | Angular (v2+) | React | Vue |
|--|--|--|--|--|
| Release date | 2010 | 2016 | 2013 | 2014 |
| Previously used by team | Y | N | Y | Y |
| Downloads per day (NPM) | ~75K | ~250K | ~5M | ~80K |
| **does everything** vs **bring other packages** | **does everything** | **does everything** | **bring other packages** | **bring other packages** | **bring other packages** |

## Decision
Use React.

## Consequences
* Components created within `ot-ui` will are tied to React, so future Open Targets projects should use React to take advantage.
