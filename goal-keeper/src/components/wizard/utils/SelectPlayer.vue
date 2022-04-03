<template>
    <button
        class="button"
        @click="changeSelection"
        :class="[notSelected ? 'not-selected' : firstTeam ? 'first-team' : 'second-team']"
        :disabled="firstTeamPlayerDisabled || secondTeamPlayerDisabled">
            {{ player.hasDuplicateName ? player.player.givenName + ' ' + player.player.surname : player.player.givenName }}
    </button>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import type {SessionWizardPlayer} from '@/data/interface/SessionWizardPlayer';
import {SessionTeam} from '@/data/enum/SessionTeam';
import {namespace} from 'vuex-class';

const SessionWizardModuleInstance = namespace('SessionWizardModule');

@Component
export default class SelectPlayer extends Vue {
    @Prop() player!: SessionWizardPlayer;

    @SessionWizardModuleInstance.Getter('currentStep')
    step!: number;

    get notSelected() {
        return this.player.team === SessionTeam.NOT_SELECTED;
    }

    get firstTeamPlayerDisabled() {
        return this.step === 3 && this.player.team === SessionTeam.FIRST;
    }

    get secondTeamPlayerDisabled() {
        return this.step === 2 && this.player.team === SessionTeam.SECOND;
    }

    get firstTeam() {
        return this.player.team === SessionTeam.FIRST;
    }

    changeSelection() {
        this.$emit('change-select-player', this.player);
    }

}
</script>

<style scoped lang="scss">

.button {
    margin: 5px;
    min-width: 120px;
    color: whitesmoke;

    @media screen and (min-width: 768px){
        min-width: 150px;
    }
}

.not-selected {
    background: transparent;
}

.first-team {
    background: turquoise !important;
}

.second-team {
    background: lightcoral !important;
}



</style>
