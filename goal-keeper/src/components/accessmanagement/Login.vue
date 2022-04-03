<template>
    <div class="columns is-vcentered">
        <div class="login column is-4 ">
            <section class="section">
                <div class="4">
                    <div class="has-text-centered">
                        <img src="../../assets/images/logo_goalkeeper_white.png" width="250" alt="">
                    </div>
                </div>
                <div class="mt-6">
                    <p v-if="message.length > 0"
                       class="help is-danger">
                        {{ message }}
                    </p>
                    <p v-if="!usernameValid"
                       class="help is-danger">
                        Please enter an username or email
                    </p>
                    <InputField
                        class-name="input is-primary"
                        type="text"
                        @inputChanged="setUsername"
                        place-holder="Username or email"
                        :iconData="{ icon: 'fas fa-user', position: 'left'}"
                        :input-value="user.username"
                        :auto-complete="'on'">
                    </InputField>
                    <p
                        v-if="!passwordValid"
                        class="help is-danger">
                        Please enter a password
                    </p>
                    <InputField
                        class-name="input is-primary"
                        type="password"
                        @inputChanged="setPassword"
                        place-holder="password"
                        :iconData="{ icon: 'fa fa-key', position: 'left'}"
                        :input-value="user.password">
                    </InputField>
                    <div class="has-text-centered">
                        <a class="button is-centered is-primary is-outlined" @click="handleLogin">Login</a>
                    </div>
                    <div class="has-text-centered">
                      <div>
                        <router-link to="/signup" exact>Sign up</router-link>
                      </div>
                      <div>
                        <router-link to="/forgot-password" exact>Forgot password</router-link>
                      </div>
                    </div>
                </div>
            </section>
        </div>
        <div id="particles-js" class="interactive-bg column is-8">
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import InputField from "@/components/common/InputField.vue";

const Auth = namespace("Auth");

@Component({
    components: {
        InputField
    }
})
export default class Login extends Vue {
    private user = {
        username: '',
        password: ''
    };
    private loading: boolean = false;
    private message: string = "";
    private usernameValid: boolean = true;
    private passwordValid: boolean = true;

    @Auth.Getter('isLoggedIn')
    private isLoggedIn!: boolean;

    @Auth.Action
    private login!: (data: any) => Promise<any>;

    created() {
        if (this.isLoggedIn) {
            this.$router.push('/');
            }
    }

    private setPassword(password: string) {
        this.user.password = password;
    }

    private setUsername(username: string) {
        this.user.username = username;
    }

    private validateForm(): boolean {
        this.message = '';
        this.usernameValid = this.user.username?.length !> 0;
        this.passwordValid = this.user.password?.length !> 0;
        return this.usernameValid && this.passwordValid;
    }

    handleLogin() {
        this.loading = true;
        let isValid = this.validateForm();
        if (!isValid) {
            this.loading = false;
            return;
        }
        if (this.user.username && this.user.password) {
            this.login(this.user).then(
                () => {
                    this.$router.push("/");
                },
                (error) => {
                    this.loading = false;
                    if (error === "Bad credentials") {
                        this.message = "The used combination of username/email and password does not exist";
                    } else {
                        this.message = "Oops, something went wrong..";
                    }
                }
            );
        }
    }
}
</script>

<style scoped lang="scss">

.interactive-bg {
    height: 100vh;
    background-color: #00d1b2;
    -webkit-box-shadow: inset 24px 4px 64px -24px rgba(71,71,71,1);
    -moz-box-shadow: inset 24px 4px 64px -24px rgba(71,71,71,1);
    box-shadow: inset 24px 4px 64px -24px rgba(71,71,71,1);
    padding: 0;
}
@media (max-width: 769px) {
    .interactive-bg{
        display: none
    }
}


.button {
    margin-top: 20px;
    margin-bottom: 20px;
    min-width: 150px;
}

.columns{
    margin: 0;
    background-color: #1f1f1f;
    min-height: 700px;
}

.section {

}

</style>
