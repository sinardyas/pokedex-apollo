import { filterConstant } from '../../contants';

function doFilter(filterType) {
    return { type: filterConstant.FILTER, filterType };
}

function doClearFilter() {
    return { type: filterConstant.CLEAR };
}

export const filterAction = { doFilter, doClearFilter };