import { FETCH_CAMPAIGN } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
    switch (action.type) {
    case FETCH_CAMPAIGN:
        return action.payload.data;
    default:
        return state;
    }
}