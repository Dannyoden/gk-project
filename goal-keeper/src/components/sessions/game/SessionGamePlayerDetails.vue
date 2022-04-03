<template>
    <div class="media-content has-text-centered">
        <p class=" is-size-6"> {{ playerName }} </p>
        <div class="goal-icons">
            <div v-if="playerGoals === 0">
                <i class="far fa-futbol fa fa-disabled"></i>
            </div>
            <transition-group
                v-if="playerGoals >= 1 && playerGoals <= 5"
                name="slide-fade"
                class="multiple-max-five">
                <div
                    v-for="goal in playerGoals"
                    :key="goal">
                    <i class="far fa-futbol fa"></i>
                </div>
            </transition-group>
            <div v-if="playerGoals > 5">
                <i class="far fa-futbol fa">
                    <span class="badge"> {{ playerGoals }} </span>
                </i>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class SessionGamePlayerDetails extends Vue {
    @Prop() playerName!: string;
    @Prop() playerGoals!: number;

}
</script>


<style scoped lang="scss">

.media-content{
    display: flex;
    flex-direction: column;

    .goal-icons {
        display: flex;
        align-self: center;
        justify-content: center;
        max-width: 40%;
        color: whitesmoke;
    }

    .multiple-max-five {
        display: flex;
    }

    .slide-fade-enter {
        transform: translateX(30px);
        opacity: 0;
    }

    .slide-fade-enter-active {
        transition: .5s ease;
    }
}

.fa-disabled {
    opacity: 0.1;
    cursor: not-allowed;
}

.is-size-6 {
  font-size: 0.9rem !important;
  font-weight: 500;
  color: whitesmoke;
}

</style>
