<template>
    <div id="team-picker-wrapper" class="container">
        <select-player
            v-for="player in players"
            :key="player.player.id"
            :player="player"
            @change-select-player="assignTeamOrRemoveTeamOfPlayer">
        </select-player>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import SelectPlayer from '@/components/wizard/utils/SelectPlayer.vue';
import {namespace} from 'vuex-class';
import type {SessionWizardPlayer} from '@/data/interface/SessionWizardPlayer';
import {SessionTeam} from '@/data/enum/SessionTeam';

const SessionWizardModuleInstance = namespace('SessionWizardModule');

@Component({
    components:
        { SelectPlayer }
})
export default class TeamPicker extends Vue {

    @SessionWizardModuleInstance.State('step')
    currentStep!: number;

    @SessionWizardModuleInstance.State('previousStep')
    previousStep!: number;

    @SessionWizardModuleInstance.Getter('sessionWizardTeam')
    sessionWizardTeam!: SessionWizardPlayer[];

    created() {
        if (this.currentStep === 2) {
            this.$toasted.global.selectSessionTeamPlayers({
                message: 'first team'
            })
            return;
        }

        if (this.currentStep === 3) {
            this.$toasted.global.selectSessionTeamPlayers({
                message: 'second team'
            })
            return;
        }

        if (this.previousStep > this.currentStep) {
            return;
        }
    }

    get players() {
        return this.currentStep === 2 ? this.viewSelectFirstTeam() : this.viewSelectSecondTeam();
    }

    viewSelectFirstTeam(): SessionWizardPlayer[] {
        const secondTeam = this.sessionWizardTeam.filter(sessionWizardPlayer => sessionWizardPlayer.team === SessionTeam.SECOND)
            .sort((first: SessionWizardPlayer, second: SessionWizardPlayer) => (first.player.givenName!.localeCompare(second.player.givenName!)));
        const otherPlayers = this.sessionWizardTeam.filter(sessionWizardPlayer => sessionWizardPlayer.team !== SessionTeam.SECOND)
            .sort((first: SessionWizardPlayer, second: SessionWizardPlayer) => (first.player.givenName!.localeCompare(second.player.givenName!)));
        return [...otherPlayers, ...secondTeam];
    }

    viewSelectSecondTeam(): SessionWizardPlayer[] {
        const firstTeam = this.sessionWizardTeam.filter(sessionWizardPlayer => sessionWizardPlayer.team === SessionTeam.FIRST)
            .sort((first: SessionWizardPlayer, second: SessionWizardPlayer) => (first.player.givenName!.localeCompare(second.player.givenName!)));
        const otherPlayers = this.sessionWizardTeam.filter(sessionWizardPlayer => sessionWizardPlayer.team !== SessionTeam.FIRST)
            .sort((first: SessionWizardPlayer, second: SessionWizardPlayer) => (first.player.givenName!.localeCompare(second.player.givenName!)));
        return [...otherPlayers, ...firstTeam];
    }

    assignTeamOrRemoveTeamOfPlayer(player: SessionWizardPlayer): void {
        if (player.team !== SessionTeam.NOT_SELECTED) {
            this.$store.commit('SessionWizardModule/setTeamOfPlayer', { playerArg: player, sessionTeamValue: SessionTeam.NOT_SELECTED });
            return;
        }
        this.currentStep === 2 ? this.assignFirstTeamToPlayer(player) : this.assignSecondTeamToPlayer(player);
    }

    assignFirstTeamToPlayer(player: SessionWizardPlayer): void {
        this.$store.commit('SessionWizardModule/setTeamOfPlayer', { playerArg: player, sessionTeamValue: SessionTeam.FIRST });
    }

    assignSecondTeamToPlayer(player: SessionWizardPlayer): void {
        this.$store.commit('SessionWizardModule/setTeamOfPlayer', { playerArg: player, sessionTeamValue: SessionTeam.SECOND });
    }
}
</script>

<style scoped lang="scss">

#team-picker-wrapper {
    max-width: 500px;
    width: 100%;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

</style>