import axios, { AxiosError } from 'axios';
import getConfig from 'next/config';
import Cookies from 'js-cookie';
import { logout } from 'src/core/utils/auth';
import { getCookie } from 'src/core/utils/cookie';

const { publicRuntimeConfig } = getConfig();

const timeout = publicRuntimeConfig?.TIMEOUT || 30000;

/**
|--------------------------------------------------
| CUSTOM AXIOS
|--------------------------------------------------
*/

export interface AppAxiosConfig {
  headers: any;
}

let noAuthCount = 0;

export const appAxios = (config?: AppAxiosConfig) => {
  let token = '';
  const tokenCookie = getCookie('token')
  
  if (tokenCookie) {
    token = tokenCookie
  }
  
  const defaultAppAxiosConfigs = {
    timeout: Number.parseInt(`${timeout}`),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const axiosInstance = config ? axios.create(config) : axios.create(defaultAppAxiosConfigs);

  axiosInstance.interceptors.request.use(
    (configParam) => {
      return configParam;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if ((error.response?.status === 401  ) && (error.response?.data as { message?: string })?.message === 'Invalid Token') {
        noAuthCount++;
        if (noAuthCount === 3) {
          logout()
          noAuthCount = 0; 
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};