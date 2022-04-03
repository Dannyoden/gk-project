<template>
    <div class="column">
        <div class="card" @click="editPlayer">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                        <span class="icon">
                            <i :class="getClass"></i>
                        </span>
                        <span class="name">{{ fullName }}</span>
                        <p id="player-data"> {{ playerInfo }} </p>
                    </div>
                    <div class="media-content"></div>
                    <div class="media-right">
                      <ShirtIcon :shirt-number="this.player.shirtNumber"></ShirtIcon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import PlayerDto from '@/data/dto/PlayerDto';
import Routes from '@/router/Routes';
import ShirtIcon from '@/components/common//ShirtIcon.vue';

@Component({
    components: {
        ShirtIcon
    }
})
export default class PlayerComponent extends Vue {

    @Prop() private player! : PlayerDto;

    private labels = new Map([
      ["DEFENDER", "Defender"], ["MIDFIELDER", "Midfielder"], ["GOALKEEPER", "Goalkeeper"], ["STRIKER", "Striker"]
    ]);

    private iconClasses = new Map([
        ["DEFENDER", "fas fa-shield-alt"], ["MIDFIELDER", "fas fa-running"], ["GOALKEEPER", "fas fa-bullseye"], ["STRIKER", "fas fa-bolt"],
    ]);

    @Emit('return-player')
    public returnPlayer(): PlayerDto {
        return this.player;
    }

    get fullName(): string {
        return this.player.givenName + ' ' + this.player.surname
    }

    get playerInfo(): string | undefined {
        if (this.player.position) {
            return this.labels.get(this.player.position);
        } else {
            return '';
        }
    }

    get getClass(): string | undefined {
        if (this.player.position)
            return this.iconClasses.get(this.player.position);
    }

    private editPlayer() {
        if (this.player) {
            this.$router.push({
                name: Routes.Player,
                params: {
                playerId: this.player.id!
            }});
        }
    }
}

</script>

<style scoped lang="scss">

.card {
    margin: auto;
    width: 500px;
    height: 90px;
    background-color: #292929;

.card-content {
    padding: 0.9rem;
    font-size: 0.9em;

    .media {
        display: flex;
        align-items: center;

        .media-left > * {
            margin: 5px;
            }
        }

        @media screen and (max-width: 350px) {
            .media-right {
                display: none !important;
            }
        }
    }

    .has-text-link {
        color: #33afa2 !important;
        }
}

@media (max-width: 767px) {
    .card {
        width: 80vw;
    }
}



.name {
    color: whitesmoke;
}

.column {
    padding: 0.45rem;
}

#player-data  {
    color: #bdbbbb;
    font-weight: 400;
}

.fa-bullseye:before {
    content: "\f140";
    color: #f14668;
}

.fa-running:before {
    content: "\f70c";
    color: cornflowerblue;
}

.fa-shield-alt:before {
    content: "\f3ed";
    color: turquoise;
}

.fa-bolt:before {
    content: "\f0e7";
    color: #ffdd57
}

</style>
