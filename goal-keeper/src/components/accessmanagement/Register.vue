<template>
  <div class="columns is-vcentered">
    <div class="login column is-4 ">
      <section class="section">
        <div class="4">
          <div class="has-text-centered">
            <img src="../../assets/images/logo_goalkeeper_white.png" width="250"  alt="">
          </div>
        </div>
        <div class="mt-6" v-if="!successful">
          <p v-if="message.length > 0" class="help is-danger">{{ message }}</p>
          <p v-if="!usernameValid" class="help is-danger"> {{ INVALID_USERNAME_INPUT }} </p>
          <InputField class-name="input is-primary"
                      type="text"
                      @inputChanged="setUsername"
                      place-holder="Username"
                      :iconData="{ icon: 'fas fa-user', position: 'left' }"
                      :input-value="user.username"></InputField>
          <p v-if="!firstNameValid" class="help is-danger"> {{ INVALID_FIRST_NAME_INPUT }} </p>
          <InputField class-name="input is-primary"
                      type="text"
                      @inputChanged="setFirstName"
                      place-holder="first name"
                      :iconData="{ icon: 'fas fa-user', position: 'left' }"
                      :input-value="user.firstName"></InputField>
          <p v-if="!lastNameValid" class="help is-danger"> {{ INVALID_LAST_NAME_INPUT }} </p>
          <InputField class-name="input is-primary"
                      type="text"
                      @inputChanged="setLastName"
                      place-holder="last name"
                      :iconData="{ icon: 'fas fa-user', position: 'left' }"
                      :input-value="user.lastName"></InputField>
          <p v-if="!emailValid" class="help is-danger"> {{ INVALID_EMAIL_INPUT }} </p>
          <InputField class-name="input is-primary"
                      type="text"
                      @inputChanged="setEmail"
                      place-holder="email"
                      :iconData="{ icon: 'fas fa-user', position: 'left' }"
                      :input-value="user.email"></InputField>
          <p v-if="!emailUnique" class="help is-danger"> {{ NOT_UNIQUE_EMAIL_INPUT }} </p>
          <InputField class-name="input is-primary"
                      type="text"
                      @inputChanged="setSecondaryEmail"
                      place-holder="confirm email"
                      :iconData="{ icon: 'fas fa-user', position: 'left' }"
                      :input-value="secondaryEmail"></InputField>
          <p v-if="!passwordValid" class="help is-danger"> {{ INVALID_PASSWORD_INPUT }} </p>
          <InputField class-name="input is-primary"
                      type="password"
                      @inputChanged="setPassword"
                      place-holder="password"
                      :iconData="{ icon: 'fa fa-key', position: 'left' }"
                      :input-value="user.password"></InputField>
          <p v-if="!passwordUnique" class="help is-danger"> {{ NOT_UNIQUE_PASSWORD_INPUT }} </p>
          <InputField class-name="input is-primary"
                      type="password"
                      @inputChanged="setSecondaryPassword"
                      place-holder="confirm password"
                      :iconData="{ icon: 'fa fa-key', position: 'left' }"
                      :input-value="secondaryPassword"></InputField>
          <div class="field is-grouped">
            <Button :icon-data="{icon: 'fas fa-angle-double-left', position: 'left'}"
                    class-name="button is-centered is-warning is-outlined"
                    @clicked="navigateToLogin"/>
            <Button class-name="button is-centered is-primary is-outlined no-background"
                    text="Create account"
                    @clicked="handleRegister"/>
          </div>
        </div>
      </section>
      <section>
        <div class="has-text-centered" v-if="successful">
          <span class="icon is-large">
            <span class="fa-stack fa-lg">
            <i class="fas fa-check"></i>
            </span>
          </span>
          <h2 class="subtitle">Succes! Welcome to Goal-keeper!</h2>
          <div class="has-text-centered">
            <a class="button is-centered is-primary is-outlined" @click="navigateToLogin">Go to login</a>
          </div>
        </div>
      </section>
    </div>
    <div id="particles-js" class="interactive-bg column is-8"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import InputField from '@/components/common/InputField.vue';
import SignupRequestDto from '@/data/dto/SignupRequestDto';
import Button from '@/components/common/Button.vue';
import validateEmail from '@/components/accessmanagement/RegisterHelpers';

const Auth = namespace("Auth");

@Component({
    components: {
        InputField,
        Button
    }
})
export default class Register extends Vue {
    private readonly INVALID_USERNAME_INPUT = 'Please create a user between the 3 and 20 characters';
    private readonly INVALID_FIRST_NAME_INPUT = 'A first name must be between the 1 and 50 characters';
    private readonly INVALID_LAST_NAME_INPUT = 'A last name must be between the 1 and 50 characters';
    private readonly INVALID_EMAIL_INPUT = 'Please enter a valid email address';
    private readonly NOT_UNIQUE_EMAIL_INPUT = 'Please make sure both given email addresses are equal';
    private readonly INVALID_PASSWORD_INPUT = 'Please use a password between the 6 and 40 characters';
    private readonly NOT_UNIQUE_PASSWORD_INPUT = 'Please make sure both given passwords are equal';


    private user: SignupRequestDto = { username: "", firstName: "", lastName: "", email: "", password: "" };

    private submitted: boolean = false;
    private successful: boolean = false;
    private message: string = "";
    private secondaryPassword: string = "";
    private secondaryEmail: string = "";

    private usernameValid: boolean = true;
    private firstNameValid: boolean = true;
    private lastNameValid: boolean = true;
    private emailValid: boolean = true;
    private emailUnique: boolean = true;
    private passwordValid: boolean = true;
    private passwordUnique: boolean = true;

    @Auth.Getter
    private isLoggedIn!: boolean;

    @Auth.Action
    private register!: (data: any) => Promise<any>;

    mounted() {
        if (this.isLoggedIn) {
            this.$router.push('/');
            }
    }

    private setUsername(username: string) {
        this.user.username = username;
    }

    private setFirstName(firstName: string) {
        this.user.firstName = firstName;
    }

    private setLastName(lastName: string) {
        this.user.lastName = lastName;
    }

    private setEmail(email: string) {
        this.user.email = email;
    }

    private setSecondaryEmail(email: string) {
        this.secondaryEmail = email;
    }

    private setPassword(password: string) {
        this.user.password = password;
    }

    private setSecondaryPassword(password: string) {
        this.secondaryPassword = password;
    }

    private validateForm(): boolean {
        this.usernameValid = this.user.username?.length !>= 3 && this.user.username?.length !<= 20;
        this.firstNameValid = this.user.firstName?.length !> 0 && this.user.firstName?.length !<= 50;
        this.lastNameValid = this.user.lastName?.length !> 0 && this.user.lastName?.length !<= 50;
        this.emailValid = this.user.email?.length !> 0 && validateEmail(this.user.email);
        this.emailUnique = this.user.email === this.secondaryEmail;
        this.passwordValid = this.user.password?.length !>= 6 && this.user.password?.length !<= 40;
        this.passwordUnique = this.user.password === this.secondaryPassword;

        return this.usernameValid && this.firstNameValid && this.lastNameValid
            && this.emailValid && this.emailUnique && this.passwordValid && this.passwordUnique;
    }

    private navigateToLogin() {
        this.$router.push('/login');
    }

    handleRegister() {
        this.message = "";
        this.submitted = true;
        let valid = this.validateForm();
            if (valid) {
                this.register(this.user)
                    .then((response) => {
                        this.message = response.message;
                        this.successful = true;
                    }, (error) => {
                        this.message = error.replace('Error: ', '');
                        this.successful = false;
                    });
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

.fa-check:before {
  content: "\f00c";
  font-size: 2em;
  color: #40cabc;
}

.subtitle {
  color: #4a4a4a;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25;
  padding-top: 30px;
}

.input {
  border-radius: 50px;
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

.help.is-danger {
  color: #dc3545;
  padding-bottom: 3px;
}

.field.is-grouped {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

</style>
