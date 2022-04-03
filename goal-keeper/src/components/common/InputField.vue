<template>
    <div class="field has-text-left">
        <label class="has-text-weight-bold" v-if="label">{{this.label}}</label>
        <div class="control"
            :class="iconPosition">
            <input :class="className" :type="type" :placeholder="placeHolder" v-model="input" :autocomplete="autoCompleteSetting">
            <span v-if="iconData"
                  class="icon is-small"
                  :class="alignIcon">
                <i :class="icon"></i>
            </span>
        </div>
    </div>
</template>

<script lang="ts">

import { Prop, Vue, Component, Watch } from 'vue-property-decorator';
import {IconInputField} from '@/components/common/IconInputField';

@Component
export default class InputField extends Vue {
    @Prop({ default : ''}) private type!: string;
    @Prop({ default : ''}) private placeHolder!: string;
    @Prop({ default : ''}) private className!: string;
    @Prop({ default : undefined}) private iconData: IconInputField | undefined;
    @Prop({ default : undefined}) private label: string | undefined;
    @Prop({ default : undefined}) private inputValue: string | undefined;
    @Prop({ default : 'off'}) private autoCompleteSetting!: string;

    private inputStringValue: string = '';

    @Watch('inputStringValue')
    public returnValue(): void {
        this.$emit('inputChanged', this.inputStringValue);
    }

    get iconPosition() {
        if (!this.iconData?.position) {
            return '';
        }
        if (this.iconData.position === 'left') {
            return 'has-icons-left';
        }
        if (this.iconData.position === 'right') {
            return 'has-icons-right';
        }
        console.error('Position of icon is not valid');
        return;
    }

    get alignIcon() {
        if (!this.iconData?.position) {
            return '';
        }
        if (this.iconData.position === 'left') {
            return 'is-left';
        }
        if (this.iconData.position === 'right') {
            return 'is-right';
        }
    }

    get icon() {
        return this.iconData!.icon;
    }

    get input() {
        return this.inputValue ? this.inputValue : '';
    }

    set input(newInput: string) {
        this.inputStringValue = newInput;
    }

}
</script>

<style scoped lang="scss">

.textarea, .input{
  box-shadow: inset 0 0.0625em 0.125em rgb(10 10 10 / 5%);
  max-width: 100%;
  width: 100%;
  background-color: #1f1f1f;
  color: whitesmoke;
}

::placeholder {
  color: grey;
}

.has-text-weight-bold {
  color: whitesmoke;
}

</style>
