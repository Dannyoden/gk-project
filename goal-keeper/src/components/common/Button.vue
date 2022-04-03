<template>
  <div class="control" @click="clickHandler">
    <div class="has-text-centered">
      <a :class="className">
        <i v-if="iconData && iconData.position === 'left'" :class="iconData.icon"></i>
        <div v-if="text" class="text">
          {{ text }}
        </div>
        <i v-if="iconData && iconData.position === 'right'" :class="iconData.icon"></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from "vue-property-decorator";
import {IconInputField} from "@/components/common/IconInputField";

@Component
export default class Button extends Vue {

  @Prop({ default : ''}) private className!: string;
  @Prop({ default : ''}) private text!: string;
  @Prop({ default : undefined}) private iconData: IconInputField | undefined;

  @Emit('clicked')
  clickHandler(): boolean {
    return true;
  }

}
</script>

<style scoped lang="scss">

.text {
  margin-left: 5px;
  margin-right: 5px;
}

.text-right {
  margin-right: 5px;
}

.button.is-primary.is-outlined {
  border-color: turquoise;
  color: turquoise;

}

.button.is-primary.is-outlined.no-background {
  background-color: transparent !important;
}

.button.is-primary {
  color: rgb(255 255 255 / 100%);
}

</style>
