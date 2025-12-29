import axios from 'axios';
import { User, UserFormValues } from '../Models/User';


axios.defaults.baseURL = 'https://localhost:7050/api';

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const responseBody = (response: any) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
};

const Account = {
    login: (user: UserFormValues) => requests.post('/account/login', user),
    register: (user: UserFormValues) => requests.post('/account/register', user),
};

const Cars = {
    details: (id: string) => requests.get(`/Cars/${id}`),
    list: () => requests.get('/Cars'),
};

export default { Account, Cars };