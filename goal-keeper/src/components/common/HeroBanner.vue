<template>
  <section class="hero is-dark">
    <div class="hero-body has-text-centered">
      <div class="container">
        <h6 class="subtitle is-6">{{ label }}</h6>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Prop, Vue} from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class HeroBanner extends Vue {

  @Prop() private label!: string;

}
</script>

<style scoped lang="scss">

.hero-body {
  padding: 30px;
}

.subtitle {
  font-size: 1.25rem;
  font-weight: 300;
  line-height: 1.25;
  color: #353535;
}

.hero.is-dark {
  background-color: #1e1e1e;
}
</style>
