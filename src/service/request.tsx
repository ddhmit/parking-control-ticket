import React from 'react';
import axios, { AxiosError } from 'axios';
import apiConfig from '~/config/api';
import { isProd } from '~/util/env';
import { notification } from 'antd';

let axiosInstance = axios.create({
  timeout: apiConfig.Timeout,
  baseURL: apiConfig.BaseUrl
});

axiosInstance.interceptors.response.use(
  res => {
    return res.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      error.message = error.response.data.msg || error.response.data.message;
    }
    // timeout: ECONNABORTED timeout of 5000ms exceeded
    // offline: undefined Network Error
    // message.error(error.message);
    // 非生产环境下的请求报错
    if (!isProd()) {
      notification.error({
        message: '请求错误(非生产环境)',
        description: (
          <p style={{ whiteSpace: 'pre-wrap' }}>
            code: {error.code}
            <br />
            message: {error.message}
            <br />
            status: {error.response && error.response.status}
            <br />
            method: {error.config.method}
            <br />
            url: {error.config.url}
          </p>
        ),
        duration: 8
      });
      console.log('axios error =>', error.toJSON());
    }
    throw error;
  }
);

export default axiosInstance;
