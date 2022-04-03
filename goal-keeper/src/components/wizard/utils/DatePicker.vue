<template>
    <div class="field has-text-left">
        <label for="date-input"
            class="has-text-weight-bold">
                {{this.label}}
        </label>
    <input  id="date-input"
            type="date"
            ref="date"/>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';

@Component
export default class DatePicker extends Vue {
    @Prop() date!: Date | undefined;
    @Prop({ default : 'Date'}) private label: string | undefined;
    selectedDate: Date | undefined;
    calendar: any;

    mounted() {
        this.calendar = this.initCalendar();
        this.calendar.on('select', (event: any) => {
            (this.selectedDate = event.data.startDate);
            this.$emit('dateChanged', this.selectedDate!);
        });
        this.calendar.on('clear', () => {
           this.$emit('dateChanged', '');
        });
    }

    private initCalendar() {
        const initialDate = this.date ? this.date : undefined;
        return bulmaCalendar.attach(this.createRef(), {
            startDate: initialDate,
            dateFormat: 'DD-MM-YYYY',
            displayMode: 'dialog'
        })[0];
    }

    private createRef() {
        return this.$refs.date;
    }

}
</script>

<style scoped lang="scss">

.has-text-weight-bold {
  color: whitesmoke;
}

#date-input {
  color: whitesmoke;
}
</style>
