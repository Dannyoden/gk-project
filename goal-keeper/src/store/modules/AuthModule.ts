import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import AuthBackend from "@/backend/AuthBackend";
import SignupRequestDto from "@/data/dto/SignupRequestDto";

const storedUser = localStorage.getItem('user');

@Module({ namespaced: true })
class AuthModule extends VuexModule {
    public status = storedUser ? { loggedIn: true } : { loggedIn: false };
    public user = storedUser ? JSON.parse(storedUser) : null;
    public showLoginLoader: boolean = true;

    @Mutation
    public loginSuccess(user: any): void {
        this.status.loggedIn = true;
        this.user = user;
    }

    @Mutation
    public showLoginTransition(status: boolean){
        this.showLoginLoader = status;
    }

    @Mutation
    public loginFailure(): void {
        this.status.loggedIn = false;
        this.user = null;
    }

    @Mutation
    public logout(): void {
        this.status.loggedIn = false;
        this.user = null;
        this.showLoginLoader = true;
    }

    @Mutation
    public registerSuccess(): void {
        this.status.loggedIn = false;
    }

    @Mutation
    public registerFailure(): void {
        this.status.loggedIn = false;
    }

    @Action({ rawError: true })
    login(data: any): Promise<any> {
        return AuthBackend.login(data.username, data.password).then(
            user => {
                this.context.commit('loginSuccess', user);
                return Promise.resolve(user);
            },
            error => {
                this.context.commit('loginFailure');
                const message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                return Promise.reject(message);
            }
        );
    }

    @Action
    signOut(): void {
        AuthBackend.logout();
        this.context.commit('logout');
    }

    @Action({ rawError: true })
    register(data: SignupRequestDto): Promise<any> {
        return AuthBackend.register(data).then(
            response => {
                this.context.commit('registerSuccess');
                return Promise.resolve(response.data);
            },
            error => {
                this.context.commit('registerFailure');
                const message =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                return Promise.reject(message);
            }
        );
    }

    get isLoggedIn(): boolean {
        return this.status.loggedIn;
    }

    get showLoader(): boolean {
        return this.showLoginLoader;
    }
}

export default AuthModule;
