<template>
  <div class="body">
    <nav-bar/>
      <div class="box">
          <span class="tag is-info is-pulled-left">No team</span>
            <div class="container has-text-centered">
              <h5 class="title is-5">No team configured yet</h5>
              <h6 class="subtitle is-6">
                You haven't configured a team yet. Before moving any further you need to add a team via 'add team' below.
              </h6>
              <span class="icon is-large">
                <i class="fas fa-arrow-down"></i>
              </span>
            </div>
            <div class="control">
            <div class="has-text-centered">
              <a class="button is-centered is-primary is-outlined" @click="navigateTeamWizard">Add team</a>
            </div>
        </div>
      </div>
    <Footer class="footer"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import NavBar from "@/components/navigation/NavBar.vue";
import {namespace} from "vuex-class";
import Footer from "@/components/navigation/Footer.vue";

const Auth = namespace("Auth");

@Component({
  components: {
    Footer,
    NavBar
  }
})
export default class CreateClubTeam extends Vue {

  @Auth.State("user")
  private currentUser!: any;

  private navigateTeamWizard() {
    this.$router.push('manage-team/edit');
  }

  created() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped lang="scss">

.footer {
  position: absolute;
  bottom: 0;
}

.box {
  margin: 20px;
  background-color: #1e1e1e;
}

.title.is-5 {
  font-size: 1.25rem;
  margin-top: 80px;
  color: whitesmoke;
}

.fa-arrow-down:before {
  font-size: 2em;
  color: #40cabc;
}

.subtitle.is-6 {
  font-size: 1rem;
  margin-top: 20px;
  color: whitesmoke;
}

.button.is-primary.is-outlined {
  background-color: transparent;
  border-color: turquoise;
  color: turquoise;
  margin-top: 40px;
}

</style>
