import axios, { AxiosRequestConfig } from 'axios';
import { AUTHENTICATION_API_URL } from '@/backend/AuthBackend';
import Nprogress from 'nprogress';
import router from '@/router/RouterConfig';
import { store } from '@/main';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!config.url?.includes(AUTHENTICATION_API_URL)) {
        Nprogress.configure({ showSpinner: false });
    } else {
        Nprogress.configure({ showSpinner: false });
    }
    Nprogress.start();
    return config;
});

//Auth interceptor handling stop loader
axios.interceptors.response.use(response => {
    Nprogress.done();
    return response;
}, error => {
    switch(error.response.status) {
        case 307:
            console.error(error.response.status, error.message);
            router.push('/create-clubTeam');
            break;
        case 401: // authentication error, logout the user
            console.error(error.response.status, error.message);
            store.dispatch('Auth/signOut');
            router.push('/login');
            break;
    }
    Nprogress.done();
    return Promise.reject(error);
});
