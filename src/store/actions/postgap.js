import axios from 'axios';

export const REQUEST_EVIDENCE_STRINGS = 'REQUEST_EVIDENCE_STRINGS';
function requestEvidenceStrings(entities) {
    return {
        type: REQUEST_EVIDENCE_STRINGS,
        entities,
    }
}

export const RECEIVE_EVIDENCE_STRINGS = 'RECEIVE_EVIDENCE_STRINGS';
function receiveEvidenceStrings(entities, items) {
    return {
        type: REQUEST_EVIDENCE_STRINGS,
        entities,
        items,
    }
}

function generatePostgapUrl(entities) {
    // TODO: map entities
    // const { targets, diseases } = entities;
    // const targetsString = targets[0].
    return `https://master-dot-open-targets-eu-dev.appspot.com/v3/platform/public/evidence/filter?size=1000&datasource=gwas_catalog&datasource=phewas_catalog&fields=unique_association_fields&fields=disease&fields=evidence&fields=variant&fields=target&fields=sourceID&fields=access_level&target=ENSG00000172057&disease=EFO_0000270&expandefo=true`
}

export function fetchEvidenceStrings(entities) {
    return function (dispatch) {
        dispatch(requestEvidenceStrings(entities));
        return axios.get()
            .then(response => {
                return response.data.data;
            }, error => {
                // console.log('An error occurred.', error);
            })
            .then(items => {
                dispatch(receiveEvidenceStrings(entities, items));
            })
    }
}
