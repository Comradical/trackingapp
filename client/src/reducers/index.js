import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CampaignsReducer from './reducer_campaigns';
import CampaignReducer from './reducer_campaign';

const rootReducer = combineReducers({
    campaign: CampaignReducer,
    campaigns: CampaignsReducer,
    form: formReducer
});

export default rootReducer;