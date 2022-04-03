<template>
    <div id="page-wrapper">
        <nav-bar />
        <session-overview />
        <Footer />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/navigation/NavBar.vue';
import SessionOverview from '@/components/sessions/SessionOverview.vue';
import Footer from '@/components/navigation/Footer.vue';
import {namespace} from 'vuex-class';
import ClubTeamBackend from '@/backend/ClubTeamBackend';
import ClubTeamDto from '@/data/dto/ClubTeamDto';

const Auth = namespace('Auth');

@Component({
    components: {
        NavBar,
        SessionOverview,
        Footer
    }
})
export default class Main extends Vue {
    @Auth.Getter
    private showLoader!: boolean;

    @Auth.Mutation
    private showLoginTransition!: (status: boolean) => Promise<any>;

    async created() {
          await this.retrieveTeam();
    }

    retrieveTeam() {
        ClubTeamBackend.retrieveTeam()
            .subscribe(
                (clubTeamDto: ClubTeamDto) => {
                    this.$store.commit('ClubTeamModule/setClubTeam', clubTeamDto);
                }, () => {
                    this.showLoginTransition(false);
                }
            )
    }
}

</script>

<style scoped lang="scss">

#page-wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

</style>
