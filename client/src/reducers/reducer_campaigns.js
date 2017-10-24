import { FETCH_CAMPAIGNS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch (action.type) {
    case FETCH_CAMPAIGNS:
        return _.mapKeys(action.payload.data, '_id');
    default:
        return state;
    }
}