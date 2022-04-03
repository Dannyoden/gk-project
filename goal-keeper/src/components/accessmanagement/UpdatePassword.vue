<template>
  <div class="columns is-vcentered">
    <div class="login column is-4 ">
      <section class="section">
        <div class="4">
          <div class="has-text-centered">
            <img id="logo" src="../../assets/images/logo_goalkeeper_white.png" width="250"  alt="">
          </div>
        </div>
        <div v-if="!invalidToken && !passwordUpdated">
          <p v-if="!passwordIsValid" class="help is-danger">Please enter a new password</p>
          <p v-if="!passwordConfirmIsValid" class="help is-danger">Please make sure both passwords match</p>
          <InputField class-name="input is-primary" type="password" @inputChanged="setPassword" place-holder="Please enter your new password" :input-value="password"></InputField>
          <InputField id="password-input" class-name="input is-primary" type="password" @inputChanged="setPasswordConfirm" place-holder="Confirm password" :input-value="passwordConfirm"></InputField>
          <div class="has-text-centered">
            <Button class-name="button is-centered is-primary is-outlined"
                    text="Update password"
                    @clicked="handlePasswordReset"/>
          </div>
        </div>
        <div v-if="invalidToken || passwordUpdated">
          <h2 v-if="invalidToken" class="subtitle has-text-centered">Invalid reset token. Your password reset token is either invalid or expired. Please try resetting the password again</h2>
          <h2 v-if="passwordUpdated" class="subtitle has-text-centered">Your password has been updated</h2>
          <div class="has-text-centered">
            <Button class-name="button is-centered is-primary is-outlined no-background"
                    text="Go to login"
                    @clicked="navigateToLogin"/>
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
import Button from "@/components/common/Button.vue";
import InputField from "@/components/common/InputField.vue";
import AuthBackend from "@/backend/AuthBackend";

@Component({
  components: {
    InputField,
    Button
  }
})
export default class UpdatePassword extends Vue {

  private invalidToken: boolean = false;
  private passwordIsValid: boolean = true;
  private passwordUpdated: boolean = false;
  private passwordConfirmIsValid: boolean = true;
  private password: string = "";
  private passwordConfirm: string = "";
  private token = "";

  mounted() {
    this.token = this.$route.query.token as string;
    if (this.token.length > 0) {
      AuthBackend.validatePasswordToken(this.token)
      .then(() => {
      }).catch(error => {
        if (error.response.status === 400) {
          this.invalidToken = true;
        }
      });
    } else {
      this.invalidToken = true;
    }
  }

  private navigateToLogin() {
    this.$router.push("/login");
  }

  private setPassword(password: string) {
    this.password = password;
  }

  private setPasswordConfirm(password: string) {
    this.passwordConfirm = password;
  }

  handlePasswordReset() {
    this.passwordIsValid = this.password.length > 0;
    this.passwordConfirmIsValid = this.password === this.passwordConfirm;
    if (this.passwordIsValid && this.passwordConfirmIsValid) {
      AuthBackend.savePassword(this.password, this.token).then(() => {
        this.passwordUpdated = true;
      }).catch(error => {
        if (error.response.status === 400) {
          console.log('error')
        }
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

.columns{
  margin: 0;
}

#logo {
  margin-bottom: 30px;
}

#password-input {
  margin-bottom: 40px;
}

.subtitle {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
}
</style>
