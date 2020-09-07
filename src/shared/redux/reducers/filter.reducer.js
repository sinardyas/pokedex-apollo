import { filterConstant } from '../../contants';

export function filter(state = { filterType: '' }, action) {
    switch (action.type) {
        case filterConstant.FILTER:
            return { filterType: action.filterType }
        case filterConstant.CLEAR:
            return { filterType: 'clear' }
        default:
            return state;
    }
}