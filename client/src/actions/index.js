import axios from 'axios';

export const FETCH_CAMPAIGNS = 'fetch_campaigns';
export const CREATE_POST = 'create_post';

const ROOT_URL = 'https://trackingapp-linguistic151.c9users.io';
const API_KEY = '?key=108954012';

export function fetchCampaigns() {
    const request = axios.get(`${ROOT_URL}/campaigns`);
    
    return {
      type: FETCH_CAMPAIGNS,
      payload: request
    };
}

export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback());
  
  return {
    type: CREATE_POST,
    payload: request
  };
}