import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { SESSION_COOKIE_NAME } from '@/pages/auth/services/AuthService';

const client = axios.create({
    baseURL: 'http://localhost:5059/api',
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
    }
});

export const request = async (options: AxiosRequestConfig) => {
    const onSuccess = (response: AxiosResponse) => {
        const { data } = response;
        return data;
    };

    const onError = function (error: AxiosError) {
        return Promise.reject({
            message: error.message,
            code: error.code,
            response: error.response,
        });
    };

    return client(options).then(onSuccess).catch(onError);
};


client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get(SESSION_COOKIE_NAME);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

client.interceptors.response.use(
    (res: AxiosResponse) => {
        return res;
    },
    async (err) => {
        const status = err.response ? err.response.status : null;

        if (status === 403 && err.response.data) {
            return Promise.reject(err.response.data);
        }

        return Promise.reject(err);
    }
);

export default client;

// export async function getProducts() {
//     const response = await client.get<Product[]>('/api/Products');
//     return response.data;
// }