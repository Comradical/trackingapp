import axios from 'axios';

export const FETCH_CAMPAIGNS = 'fetch_campaigns';
export const FETCH_CAMPAIGN = 'fetch_campaign';
export const CREATE_POST = 'create_post';
export const CREATE_EXPENSE = 'create_expense';

const ROOT_URL = 'https://obscure-temple-12836.herokuapp.com';
const API_KEY = '?key=108954012';

export function fetchCampaigns() {
  const request = axios.get(`${ROOT_URL}/campaigns`);
  return {
    type: FETCH_CAMPAIGNS,
    payload: request
  };
}

export function fetchCampaign(id) {
  const request = axios.get(`${ROOT_URL}/campaigns/${id}`);
  
  return {
    type: FETCH_CAMPAIGN,
    payload: request
  };
}

// export function createPost(values, callback) {
//   const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
//     .then(() => callback());
  
//   return {
//     type: CREATE_POST,
//     payload: request
//   };
// }

export function createExpense(props){
  console.log(props);
  const request = axios.post(`https://trackingapp-linguistic151.c9users.io/campaigns/59e556f651019f13514f4497/expenses`, props);
  
  return {
    type: CREATE_EXPENSE,
    payload: request
  }
}