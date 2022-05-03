import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_BASEURL = "http://localhost:3001/api/";

export interface ApiError {
  name: string | undefined;
  message: string | undefined;
  status: number | undefined;
  statusText: string | undefined;
  stack?: string | undefined;
}

const config: AxiosRequestConfig = {
  baseURL: API_BASEURL,
  timeout: 30000,
};

const instance = () => {
  const result = axios.create(config);
  result.interceptors.response.use((response:unknown) => response, errorHandler);
  return result;
};

const errorHandler = (axiosError: AxiosError) => {
  const error: ApiError = {
    name: axiosError.name,
    message: axiosError.message,
    status: axiosError.response?.status,
    statusText: axiosError.response?.statusText,
    stack: axiosError.stack,
  };

  // no status means network error
  if (!error.status) {
    error.status = 599;
    error.statusText = 'Network Error';
  }

  return Promise.reject(error);
};

export default instance();
