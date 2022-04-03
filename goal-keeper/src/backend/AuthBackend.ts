import axios from 'axios';
import SignupRequestDto from "@/data/dto/SignupRequestDto";
import authHeader from "@/backend/AuthHeader";

export const AUTHENTICATION_API_URL = process.env.VUE_APP_BASE_URL + '/api/auth/';
const SIGN_IN_URL = 'signin';
const SIGN_UP_URL = 'signup';
const RESET_PASSWORD_URL = 'resetPassword';
const UPDATE_PASSWORD_URL = 'savePassword';
const VALIDATE_TOKEN_URL = 'validateToken';

class AuthBackend {

    login(username: string, password: string) {
        return axios
            .post(AUTHENTICATION_API_URL + SIGN_IN_URL, {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.clear();
    }

    register(data: SignupRequestDto) {
        return axios.post(AUTHENTICATION_API_URL + SIGN_UP_URL, data);
    }

    resetPassword(email: string) {
        return axios.post(AUTHENTICATION_API_URL + RESET_PASSWORD_URL, null, { params: {email: email }});
    }

    savePassword(newPassword: string, token: string) {
        return axios.post(AUTHENTICATION_API_URL + UPDATE_PASSWORD_URL, {newPassword: newPassword, token: token}, {
            headers: {  Accept: 'application/json'}
        });
    }

    validatePasswordToken(token: string) {
        return axios.get(AUTHENTICATION_API_URL + VALIDATE_TOKEN_URL, { params: {token: token }});
    }
}

export default new AuthBackend();
