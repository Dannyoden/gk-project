<template>
  <div>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="">
        <img src="../../assets/images/logo_goalkeeper_white.png"  alt="">
      </a>
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="true"
       data-target="navbarBasicExample" v-on:click="showNav = !showNav" v-bind:class="{ 'is-active' : showNav }">
      <span aria-hidden="false"></span>
      <span aria-hidden="false"></span>
      <span aria-hidden="false"></span>
    </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu" aria-expanded="true" :class="{ 'is-active': showNav }">
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            App
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item">
              <router-link to="/" exact>Create & start sessions</router-link>
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item">
              <router-link to="/manage-team" exact>Manage your team</router-link>
            </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <i class="far fa-chart-bar"></i>
            Dashboard
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item">
              <router-link to="/dashboard/main" exact>Team statistics</router-link>
            </a>
          </div>
        </div>
        <div class="navbar-item is-right has-dropdown is-hoverable">
          <a class="navbar-link">
            <i class="far fa-user-circle"></i>
            Profile
          </a>
          <div class="navbar-dropdown is-right">
<!--            <a class="navbar-item">-->
<!--              Edit profile-->
<!--            </a>-->
<!--            <hr class="navbar-divider">-->
            <a class="navbar-item" @click="logOut">
              <i class="fas fa-sign-out-alt"></i>
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Footer from "@/components/navigation/Footer.vue";

const Auth = namespace("Auth");

@Component({
  components: {Footer }
})
export default class NavBar extends Vue {

    @Auth.State('user')
    private currentUser!: any;
    @Auth.Action
    private signOut!: () => void;
    private showNav = false;
    
    logOut() {
        this.$store.commit('ClubTeamModule/setClubTeam', null);
        this.$store.commit('SessionModule/setSessionsInSessionOverview', null);
        this.$store.commit('SessionModule/setCurrentSession', null);
        this.signOut();
        this.$router.push('/login');
    }

}

</script>

<style scoped lang="scss">

.navbar-brand {
  background-color: #171717;
}

@media screen and (max-width: 1023px) {
  .navbar-menu {
    margin-left: auto;
    min-width: 100%;
  }
  .navbar-menu.is-active {
    display: block;
    background-color: #171717;;
  }
}


@media screen and (min-width: 1023px) {
  .navbar-menu, a.navbar-item, .navbar-link:not(.is-arrowless),
  .navbar-dropdown, .navbar-item.is-hoverable:hover .navbar-dropdown,
  .navbar-item.has-dropdown:hover .navbar-link, .navbar-dropdown a.navbar-item:hover {
    background-color: #171717;
  }
  .navbar-dropdown a.navbar-item:hover {
    background-color: #171717;
    color: turquoise;
  }

  a:hover {
    color: turquoise;
  }
}

.navbar-burger:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: whitesmoke;
}


.navbar-dropdown .navbar-item {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: #171717;
}

a {
  color: #ffffff;
  cursor: pointer;
  text-decoration: none;
}

.fa-sign-out-alt {
  margin-right: 5px;
}

.fa-user-circle:before {
  content: "\f2bd";
  margin-right: 4px;
  color: turquoise;
}

.fa-chart-bar:before {
  content: "\f080";
  margin-right: 4px;
  color: turquoise;
}

.navbar-link:not(.is-arrowless)::after {
  border-color: #41e0d0;
  margin-top: -0.375em;
  right: 1.125em;
}
.navbar-divider {
  color: #202020;
}

hr {
  background-color: #202020;
}
</style>
