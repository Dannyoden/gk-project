import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = process.env.VUE_APP_BASE_URL + '/api/test/';

class UserBackend {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', {
            headers: {
                Authorization: authHeader()
            }
        });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', {
            headers: {
                Authorization: authHeader()
            }
        });
    }
}

export default new UserBackend();
