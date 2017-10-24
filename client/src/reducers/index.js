import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CampaignsReducer from './reducer_campaigns';

const rootReducer = combineReducers({
    posts: CampaignsReducer,
    form: formReducer
});

export default rootReducer;