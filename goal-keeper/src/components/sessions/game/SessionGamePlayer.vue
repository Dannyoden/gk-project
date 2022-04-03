<template>
    <div class="card is-shadowless"
        :id="playerId"
        :session-game-team="sessionGameTeam">
        <div class="card-content">
            <div class="media">
                <div class="media-left"
                     :class="[playerGoals > 0 ? 'enabled' : '']"
                     @click="unregisterGoal">
                    <i :class="[playerGoals > 0 ? 'fas fa-minus has-text-danger' : 'fas fa-minus fa-disabled has-text-danger']"></i>
                </div>
                <session-game-player-details
                    :player-name="playerName"
                    :player-goals="playerGoals">
                </session-game-player-details>
                <div class="media-right"
                     @click="registerGoal"
                     :class="[sessionGameTeam === TEAM_ONE ? 'first-team-icon-background' : 'second-team-icon-background']">
                    <i class="fas fa-plus" :class="[sessionGameTeam === TEAM_ONE ? 'first-team-icon-color' : 'second-team-icon-color']"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import type { GamePlayer } from '@/data/interface/GamePlayer';
import SessionGamePlayerDetails from '@/components/sessions/game/SessionGamePlayerDetails.vue';
import {SessionGameTeam} from '@/data/enum/SessionGameTeam';

@Component({
    components: { SessionGamePlayerDetails }
})
export default class SessionGamePlayer extends Vue {
    @Prop() player!: GamePlayer;
    @Prop() sessionGameTeam!: string;

    private readonly TEAM_ONE = SessionGameTeam.ONE;

    @Emit('player-scored')
    addTeamGoal(playerId: string) {
        return playerId;
    }

    @Emit('undo-player-scored')
    undoTeamGoal(playerId: string) {
        return playerId;
    }

    get playerId() {
        return this.player.details.id;
    }

    get playerName() {
        return this.player.details.givenName + ' ' + this.player.details.surname;
    }

    get playerGoals() {
        return this.player.goals;
    }

    unregisterGoal() {
        if (this.playerGoals === 0) {
            return console.error('it is not possible to get a negative goal count');
        }
        this.undoTeamGoal(this.playerId!);
    }

    registerGoal() {
        this.addTeamGoal(this.playerId!);
    }

}
</script>


<style scoped lang="scss">


.card {
    max-width: 400px;
    margin-bottom: 10px;
    width: 100%;
    border-radius: 26px;
    background-color: #2e2e2e;

    @media (min-width: 769px) {
        margin-right: 15px;
    }

    &:first-child {
        margin-top: 5px;
    }
}

.card-content {
    padding: 0.5rem;
    font-size: 0.9em;

    .media {
        display: flex;
        align-items: center;

        .media-left {
            display: flex;
            width: 35px;
            height: 35px;
            justify-content: center;
            align-items: center;
            border-radius: 20px;
            margin-right: 0;

            &.enabled {
                border: thin solid rgb(250, 128, 114, 3);
            }

            &.enabled:active {
                background: rgb(250, 128, 114, 3);
            }
        }

        .media-right {
            display: flex;
            width: 35px;
            height: 35px;
            justify-content: center;
            align-items: center;
            border-radius: 20px;
            margin-left: 0;

            &.first-team-icon-background {
                border: thin solid rgb(64, 224, 208, 3);
            }

            &.first-team-icon-background:active {
                background: rgb(64, 224, 208, 3);
            }

            &.second-team-icon-background {
                border: thin solid rgb(64, 224, 208, 3);
            }

            &.second-team-icon-background:active {
                background: rgb(64, 224, 208, 3);
            }

            .first-team-icon-color {
                color: rgb(64, 224, 208);
            }

            .second-team-icon-color {
                color: rgb(64, 224, 208);
            }
        }
    }
}

.fa-disabled {
    opacity: 0.1;
    cursor: not-allowed;
}



</style>
