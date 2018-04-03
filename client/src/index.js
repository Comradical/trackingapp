import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import promise from 'redux-promise';

//routes
import HomePage from './components/home_page';
import CampaignsPage from './components/campaigns_page';
import CampaignShowPage from './components/campaign_show_page';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/campaigns/:id" component={CampaignShowPage} />
          <Route path="/campaigns" component={CampaignsPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
    
  </Provider>
  , document.querySelector('.container'));
