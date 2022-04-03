import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/AuthModule';
import SessionModule from "@/store/modules/SessionModule";
import ClubTeamModule from "@/store/modules/ClubTeamModule";
import DashboardModule from "@/store/modules/DashboardModule";

Vue.use(Vuex);

export default () => new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    Auth,
    SessionModule,
    ClubTeamModule,
    DashboardModule
  },
});
