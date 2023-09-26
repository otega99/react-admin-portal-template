import axios from 'axios';
export type { AxiosRequestConfig as RequestConfig } from 'axios';

export const baseURL = 'https://adminapi.respectedfx.com';  
export const mobileAppBaseUrl = 'https://api.respectedfx.com/';  

export const AxiosConfig = axios.create({
  baseURL
});

export const addTokenHeader = (token: string, type?: 'json' | 'formData') => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': type === 'formData' ? 'multipart/form-data' : 'application/json'
    }
  };
};
