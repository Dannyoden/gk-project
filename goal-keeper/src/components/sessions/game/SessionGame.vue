<template>
    <div class="body">
        <nav-bar />
        <div id="content" v-if="isSessionAvailable">
            <SessionGameConsole id="game-console"
                :timeInMinutes="minutes"
                :first-team-score="firstTeamGoals"
                :second-team-score="secondTeamGoals"
                @show-finish-game-pop-up="changeShowFinishGamePopUp">
            </SessionGameConsole>
            <div id="team-tabs"
                class="tabs is-fullwidth">
                <ul id="tabs">
                    <li :class="[currentTeam === FIRST_TEAM ? 'is-active highlight-team-one' : 'unhighlight-team-one']">
                        <a @click="currentTeam = FIRST_TEAM"> {{ this.FIRST_TEAM }} </a>
                    </li>
                    <li :class="[currentTeam === SECOND_TEAM ? 'is-active highlight-team-one' : 'unhighlight-team-one']">
                        <a @click="currentTeam = SECOND_TEAM"> {{ this.SECOND_TEAM }} </a>
                    </li>
                </ul>
            </div>
            <agile :dots="false"
                   :nav-buttons="false"
                   :speed="500"
                    @before-change="handleChangeOfTeam">
                <div id="team-first" v-if="this.currentTeam === this.FIRST_TEAM">
                    <SessionGamePlayer
                        v-for="(player, index) in firstTeamPlayers"
                        :key="index"
                        :player="player"
                        :session-game-team="FIRST_TEAM"
                        @player-scored="registerTeamGoal"
                        @undo-player-scored="unregisterTeamGoal">
                    </SessionGamePlayer>
                </div>
                <div id="team-second" v-if="this.currentTeam === this.SECOND_TEAM">
                    <SessionGamePlayer
                        v-for="(player, index) in secondTeamPlayers"
                        :key="index"
                        :player="player"
                        :session-game-team="SECOND_TEAM"
                        @player-scored="registerTeamGoal"
                        @undo-player-scored="unregisterTeamGoal">
                    </SessionGamePlayer>
                </div>
            </agile>
            <PopUp
                v-if="showGoBackPopUp"
                :pop-up-text="textPopUp"
                @decline="changeShowGoBackPopUp"
                @confirm="backToSessionOverview">
            </PopUp>
            <PopUp
                v-if="showFinishGamePopUp"
                :pop-up-text="textPopUp"
                @decline="changeShowFinishGamePopUp"
                @confirm="finishSessionGame">
            </PopUp>
        </div>
        <footer class="footer-details">
            <Button
                :icon-data="{ icon: 'fas fa-angle-double-left', position: 'left' }"
                class-name="button is-centered is-danger is-outlined"
                text="Go Back"
                @clicked="changeShowGoBackPopUp">
            </Button>
            <Button
                :icon-data="{ icon: 'fas fa-angle-double-right', position: 'right' }"
                class-name="button is-centered is-primary is-outlined no-background"
                text="Finish"
                @clicked="changeShowFinishGamePopUp">
            </Button>
        </footer>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import NavBar from '@/components/navigation/NavBar.vue';
import SessionDto from '@/data/dto/SessionDto';
import SessionModule from '@/store/modules/SessionModule';
import SessionGamePlayer from '@/components/sessions/game/SessionGamePlayer.vue';
import SessionGameConsole from '@/components/sessions/game/SessionGameConsole.vue';
import {GamePlayer} from '@/data/interface/GamePlayer';
import SessionBackend from '@/backend/SessionBackend';
import { findGamePlayerByIdAndTeam,
    mapPlayersToGamePlayers,
    mapGoalsToPlayersScoredList } from './SessionGameUtils';
import {SessionResult} from '@/data/enum/SessionResult';
import PopUp from '@/components/common/PopUp.vue';
import {namespace} from 'vuex-class';
import Button from '@/components/common/Button.vue';
import { VueAgile } from 'vue-agile';

import Routes from '@/router/Routes';
import {SessionGameTeam} from '@/data/enum/SessionGameTeam';
const SessionModuleStore = namespace('SessionModule');

@Component({
    components: {
        Button,
        NavBar,
        SessionGameConsole,
        SessionGamePlayer,
        PopUp,
        agile: VueAgile
    }
})
export default class SessionGame extends Vue {

    @SessionModuleStore.Getter('sessionById')
    getSessionById!: (id: string) => SessionDto;

    @SessionModuleStore.Getter('currentGameSession')
    getCurrentGameSession!: () => SessionDto;

    private readonly FIRST_TEAM = SessionGameTeam.ONE;
    private readonly SECOND_TEAM = SessionGameTeam.TWO;

    textPopUp = '';
    session: SessionDto | undefined;
    currentTeam = this.FIRST_TEAM;
    firstTeam: GamePlayer[] = [];
    secondTeam: GamePlayer[] = [];
    isSessionAvailable = true;
    showFinishGamePopUp = false;
    showGoBackPopUp = false;

    async beforeMount() {
        this.session = this.getCurrentGameSession();
        if (this.session) {
            this.firstTeam = mapPlayersToGamePlayers(this.session!.first!.players!);
            this.secondTeam = mapPlayersToGamePlayers(this.session!.second!.players!);
            return;
        }
        this.isSessionAvailable = false;
        const sessionId = this.getSessionIdFromUrl();
        await this.retrieveSessionFromBackend(sessionId);
    }

    get firstTeamPlayers() {
        return this.firstTeam.sort((first: GamePlayer, second: GamePlayer) => first.details.givenName!.localeCompare(second.details.givenName!));
    }

    get secondTeamPlayers() {
        return this.secondTeam.sort((first: GamePlayer, second: GamePlayer) => first.details.givenName!.localeCompare(second.details.givenName!));
    }

    get firstTeamGoals() {
        let goals: number = 0;
        this.firstTeam.forEach(player => goals += player.goals);
        return goals;
    }

    get secondTeamGoals() {
        let goals: number = 0;
        this.secondTeam.forEach(player => goals += player.goals);
        return goals;
    }

    get minutes () {
        return this.session!.minutes;
    }

    changeShowFinishGamePopUp() {
        this.textPopUp = 'Finish Game?';
        this.showFinishGamePopUp = !this.showFinishGamePopUp;
    }

    changeShowGoBackPopUp() {
        this.textPopUp = 'Quit Game?';
        this.showGoBackPopUp = !this.showGoBackPopUp;
    }

    getSessionIdFromUrl(): string {
        const path = this.$route.path;
        const sessionId = path.split('/').pop();
        if (!sessionId) {
            throw Error('The session does not have a valid id');
        }
        return sessionId;
    }

    async retrieveSessionFromBackend(sessionId: string) {
        try {
            await SessionBackend.retrieveSession(sessionId).subscribe(
                (session: SessionDto) => {
                    this.$store.commit('SessionModule/setCurrentSession', session);
                }, (error: any) => {
                    console.error(error);
                    return;
                }, () => {
                    this.session = this.getCurrentGameSession();
                    this.firstTeam = mapPlayersToGamePlayers(this.session!.first!.players!);
                    this.secondTeam = mapPlayersToGamePlayers(this.session!.second!.players!);
                    this.isSessionAvailable = true;
                });
        } catch (error) {
            throw (error);
        }
    }

    registerTeamGoal(playerId: string): void {
        const playerFirstTeam = findGamePlayerByIdAndTeam(playerId, this.firstTeam);
        if (!playerFirstTeam) {
            const playerSecondTeam = findGamePlayerByIdAndTeam(playerId, this.secondTeam);
            playerSecondTeam!.goals++;
        } else {
            playerFirstTeam.goals++;
        }
    }

    unregisterTeamGoal(playerId: string) {
        const playerFirstTeam = findGamePlayerByIdAndTeam(playerId, this.firstTeam);
        if (!playerFirstTeam) {
            const playerSecondTeam = findGamePlayerByIdAndTeam(playerId, this.secondTeam);
            playerSecondTeam!.goals--;
        } else {
            playerFirstTeam.goals--;
        }
    }

    determineResultOfSessionGame() {
        if (this.firstTeamGoals === this.secondTeamGoals) {
            this.session!.first!.result!.result = SessionResult.TIE;
            this.session!.second!.result!.result = SessionResult.TIE;
        } else if (this.firstTeamGoals > this.secondTeamGoals) {
            this.session!.first!.result!.result = SessionResult.WON;
            this.session!.second!.result!.result = SessionResult.LOST;
        } else {
            this.session!.first!.result!.result = SessionResult.LOST;
            this.session!.second!.result!.result = SessionResult.WON;
        }
    }

    finishSessionGame() {
        this.changeShowFinishGamePopUp();
        this.determineResultOfSessionGame();
        mapGoalsToPlayersScoredList(this.firstTeam, this.session!.first!);
        mapGoalsToPlayersScoredList(this.secondTeam, this.session!.second!);
        SessionBackend.updateSession(this.session!).subscribe(() => this.backToSessionOverview());
    }

    backToSessionOverview() {
        this.$router.push({
            name: Routes.Main
        });
    }

    handleChangeOfTeam() {
        return this.currentTeam === this.FIRST_TEAM
            ? this.currentTeam = this.SECOND_TEAM
            : this.currentTeam = this.FIRST_TEAM;
    }

}
</script>

<style scoped lang="scss">
$team-one-selected: #40e0d0;
$team-one-unselected: rgba(206, 207, 207, 0.2);

.body {
    display: flex;
    flex-direction: column;
    background-image: url("../../../assets/images/background.png");
    background-size: cover;
    min-height: 100vh;
}

.body #content {
    display: flex;
    flex-basis: 100%;
    flex-direction: column;
    align-content: center;
    margin: 20px;

    @media (min-width: 1025px) {
        max-width: 1000px;
        align-self: center;
    }

    .agile {
        -ms-touch-action: pan-y;
        touch-action: pan-y;

        [id^=team] {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
    }

    #team-tabs {

        @media (min-width: 768px) {
            display: flex;
            align-self: center;
            width: 500px;
        }

        @media (min-width: 1024px) {
            display: flex;
            align-self: center;
            width: 700px;
        }

        #tabs {
            border-color: transparent;

            .highlight-team-one {
                background: $team-one-selected;
                border-radius: 10px;
                margin-right: 10px;

                a {
                    color: white;
                    border-color: transparent;
                }
            }

            .unhighlight-team-one {
                background: $team-one-unselected;
                border-radius: 10px;
                margin-right: 10px;

                a {
                    color: white;
                    border-color: transparent;
                }
            }
        }
    }
}

.body #content #game-console {
    display: flex;
    flex-basis: 30%;
}

.body .footer-details {
    display: flex;
    align-self: flex-end;
    justify-content: space-between;
    margin-top: auto;
    padding: 4vw;
    width: 100vw;
}

</style>
