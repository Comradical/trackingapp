import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CampaignsReducer from './reducer_campaigns';

const rootReducer = combineReducers({
    campaigns: CampaignsReducer,
    form: formReducer
});

export default rootReducer;