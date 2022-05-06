import axios, { AxiosRequestConfig } from 'axios';
import HttpHeaders from './HttpHeaders';

const HttpClient = () => {
    const api = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
    });

    api.interceptors.request.use((config: AxiosRequestConfig) =>
        HttpHeaders(config),
    );

    return { api };
};

export default HttpClient;
