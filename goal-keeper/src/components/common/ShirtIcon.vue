<template>
    <div>
        <div class="is-align-content-center">
            <p class="title is-6" :class="[hasSingleShirtNumber === true ? 'single-number' : 'double-number']"> {{ number }} </p>
        </div>
        <div class="is-align-content-center">
            <i class="fas fa-tshirt"></i>
        </div>
    </div>
</template>

<script lang="ts">
import { Prop, Vue, Component} from 'vue-property-decorator';

@Component
export default class ShirtIcon extends Vue {
    @Prop(Number) readonly shirtNumber: number | undefined;
    hasSingleShirtNumber = false;

    get number() {
        if (!this.shirtNumber) {
            return undefined;
        }
        if (this.shirtNumber < 10) {
            this.hasSingleShirtNumber = true;
        }
        return this.shirtNumber;
    }
}
</script>
<style scoped lang="scss">

.title.is-6 {
    font-size: 0.7rem;
    z-index : 2;
    position: relative;
    top: 14px;

    &.single-number {
        padding-left: 17px;
    }

    &.double-number {
        padding-left: 13px;
    }
}

.fa-tshirt:before {
    z-index : 1 ;
    position: relative;
    color:  #efefef;
    font-size: 2rem;
    bottom: 10px;
}

</style>
