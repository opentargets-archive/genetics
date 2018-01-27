# State within Open Targets Genetics
The app uses redux to maintain state.

## Entities
The `entities` state represents the set of entities about which we are currently showing information. An entity could be a disease, a gene or a variant currently, but the list may be extended in the future.

```
/* example state */
{
    entities: {
        genes: [
            {
                id: 'ENSG00000157764',
                label: 'BRAF',
            },
            {
                id: 'ENSG00000171862',
                label: 'PTEN',
            }
        ],
        diseases: [
            {
                id: 'EFO_0003767',
                label: 'inflamatory bowel disease',
            }
        ]
    }
}
```

The `entities` state is intended to be passed to all user interface views, which should then take responsibility for loading and displaying information about the entities. The views should not render if the passed `entities` state is inappropriate to the data they display.