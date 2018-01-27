import axios from 'axios';

export const getGene = (ensgId) => {
    return axios.get(`rest.ensembl.org/lookup/id/${ensgId}?content-type=application/json`)
}

export const getChromosome = (chr) => {
    return axios.get(`rest.ensembl.org/info/assembly/human/${chr}?content-type=application/json`)
}

export const getGenesInRegion = (chr, start, end) => {
    return axios.get(`rest.ensembl.org/overlap/region/human/${chr}:${start}-${end}?feature=gene&content-type=application/json`)
}
