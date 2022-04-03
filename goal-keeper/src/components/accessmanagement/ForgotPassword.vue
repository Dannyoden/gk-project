<template>
  <div class="columns is-vcentered">
    <div class="login column is-4 ">
      <section class="section">
        <div class="4">
          <div class="has-text-centered">
            <img id="logo" src="../../assets/images/logo_goalkeeper_white.png" width="250"  alt="">
          </div>
        </div>
        <div v-if="!tokenIsSent" class="input-field">
          <p v-if="!emailValid" class="help is-danger">Please enter your email</p>
          <p v-if="userNotFound" class="help is-danger">We haven't found a user with the given email</p>
          <InputField id="email-input" class-name="input is-primary" type="text" @inputChanged="setEmail" place-holder="Please enter your email" :input-value="email"></InputField>
          <div class="field is-grouped">
            <Button :icon-data="{icon: 'fas fa-angle-double-left', position: 'left'}"
                    class-name="button is-centered is-warning is-outlined"
                    @clicked="navigateToLogin"/>
            <Button class-name="button is-centered is-primary is-outlined"
                    text="Reset password"
                    @clicked="handlePasswordReset"/>
          </div>
        </div>
        <div v-if="tokenIsSent">
          <h2 class="subtitle">We've successfully sent a reset link to your email adress. Please check your mail and follow the instructions</h2>
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
import AuthBackend from "@/backend/AuthBackend";
import InputField from "@/components/common/InputField.vue";
import Button from "@/components/common/Button.vue";

@Component({
  components: {
    InputField,
    Button
  }
})
export default class ForgotPassword extends Vue {

  private emailValid: boolean = true;
  private userNotFound: boolean = false;
  private tokenIsSent: boolean = false;
  private email: string = "";

  private setEmail(email: string) {
    this.email = email;
  }

  handlePasswordReset() {
    this.emailValid = this.email.length > 0;
    if (this.emailValid) {
      AuthBackend.resetPassword(this.email)
          .then(() => {
            this.tokenIsSent = true
          })
          .catch(error => {
            if (error.response.status === 400) {
              this.userNotFound = true;
            }
          });
    }
  }

  private navigateToLogin() {
    this.$router.push("/login");
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
  .input-field {
    margin-top: 40px;
  }

}

.columns{
  margin: 0;
}

#logo {
  margin-bottom: 30px;
}

#back-button {
  margin-right: 10px;
}

#email-input {
  margin-bottom: 40px;
}

.field.is-grouped {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.columns{
  margin: 0;
  background-color: #1f1f1f;
  min-height: 700px;
}

.subtitle {
  color: #ffffff;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
}


</style>
