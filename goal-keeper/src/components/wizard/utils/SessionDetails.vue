<template>
    <div id="session-details-wrapper">
        <input-field
            class-name="input is-primary"
            type="text"
            label="Name"
            place-holder="Choose a session name"
            autocomplete="off"
            :input-value="name"
            @inputChanged="setName"></input-field>
        <input-field
            class-name="input is-primary"
            type="number"
            label="Duration"
            autocomplete="off"
            place-holder="Duration is in minutes"
            :input-value="minutes"
            @inputChanged="setMinutes"></input-field>
        <date-picker :date="date" @dateChanged="setDate"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import DatePicker from '@/components/wizard/utils/DatePicker.vue';
import InputField from '@/components/common/InputField.vue';
import {namespace} from 'vuex-class';

const SessionWizardModuleInstance = namespace('SessionWizardModule');

@Component({
    components: {
        InputField,
        DatePicker
    }
})
export default class SessionDetails extends Vue {

    @SessionWizardModuleInstance.State('step')
    currentStep!: number;

    @SessionWizardModuleInstance.State('previousStep')
    previousStep!: number;

    @SessionWizardModuleInstance.State('name')
    sessionName: string | undefined;

    @SessionWizardModuleInstance.State('duration')
    sessionDuration: number | undefined;

    @SessionWizardModuleInstance.State('date')
    sessionDate: Date | undefined;

    created() {
        if (this.previousStep > this.currentStep) {
            return;
        }
    }

    get name() {
        return this.sessionName ? this.sessionName : '';
    }

    get minutes() {
        return this.sessionDuration ? this.sessionDuration : '';
    }

    get date() {
        return this.sessionDate ? this.sessionDate : undefined;
    }

    private setName(name: string) {
        this.$store.commit('SessionWizardModule/setSessionName', name);
    }

    private setMinutes(minutesArg: string) {
        const minutes = Number.parseInt(minutesArg);
        if (isNaN(minutes)) {
            console.error('Input is not a number');
            return;
        }
        this.$store.commit('SessionWizardModule/setSessionDuration', minutes);
    }

    private setDate(date: Date) {
        this.$store.commit('SessionWizardModule/setSessionDate', date);
    }

}
</script>

<style scoped lang="scss">

#session-details-wrapper {
    max-width: 500px;
    width: 100%;
}

</style>
