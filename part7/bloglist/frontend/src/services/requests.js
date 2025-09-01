// src/services/requests.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Auth-token (valgfritt)
let token = null;
export const setToken = (t) => {
  token = t;
};

export const getConfig = () => {
  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  return config;
};
