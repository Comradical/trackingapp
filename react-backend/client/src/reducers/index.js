import { combineReducers } from 'redux';
import campaignsReducer from './reducers_campaigns';
import ActiveCampaign from './reducers_active_campaign';

const rootReducer = combineReducers({
  campaigns: campaignsReducer,
  activeBook: ActiveCampaign
});
