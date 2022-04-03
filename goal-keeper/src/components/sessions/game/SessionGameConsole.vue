<template>
    <div class="box">
        <div class="columns is-multiline is-mobile"
             id="content">
            <div class="column is-one-quarter is-size-5 has-text-centered">
                <p class="team-name"> {{ this.FIRST_TEAM }} </p>
            </div>
            <div class="column is-half" id="time">
                <span> {{ this.showMinutes }} : </span>
                <span> {{ this.showSeconds }} : </span>
                <span> {{ this.showMilliSeconds }}</span>
            </div>
            <div class="column is-one-quarter is-size-5 has-text-centered">
                <p class="team-name"> {{ this.SECOND_TEAM }} </p>
            </div>
            <div class="column is-one-quarter is-size-3" id="score-1">
                <p> {{ this.firstTeamScore }}</p>
            </div>
            <div
                class="column is-half"
                id="wrapper-start-button">
                <button
                    class="button"
                    :class="{
                        'is-danger is-outlined': !timerIsActive,
                        'is-danger': timerIsActive && !gameIsFinished,
                        'is-primary': gameIsFinished }"
                    id="start-button"
                    @click="this.handleTimer">
                    <span> {{ this.buttonMessage }} </span>
                </button>
            </div>
            <div
                class="column is-one-quarter is-size-3" id="score-2">
                <p> {{ this.secondTeamScore }} </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from 'vue-property-decorator';
import NoSleep from 'nosleep.js';

@Component
export default class SessionGameConsole extends Vue {
    @Prop() private timeInMinutes!: number;
    @Prop() private firstTeamScore!: number;
    @Prop() private secondTeamScore!: number;

    private readonly FIRST_TEAM = 'Team One';
    private readonly SECOND_TEAM = 'Team Two';

    seconds: number = 0;
    minutes: number = this.timeInMinutes;
    milliSeconds: number = 0;
    timerIsActive: boolean = false;
    timer: number | undefined = undefined;
    buttonMessage: string = SessionGameConsole.START_MESSAGE;
    noSleep = new NoSleep();

    static START_MESSAGE = 'Start';
    static PAUSE_MESSAGE = 'Pause';
    static FINISH_SESSION_MESSAGE = 'Finish';

    @Emit('show-finish-game-pop-up')
    showFinishGamePopUp() {
        return true;
    }

    get gameIsFinished() {
        return this.minutes === 0 && this.seconds === 0 && this.milliSeconds === 0;
    }

    get showMinutes(): number {
        return this.minutes;
    }

    get showSeconds(): number | string {
        return this.seconds >= 10 ? this.seconds : String(this.seconds).padStart(2, '0');
    }

    get showMilliSeconds(): string {
        return this.milliSeconds === 1000 ?
                    String(this.milliSeconds).slice(0, -2) :
                    this.milliSeconds >= 10 ?
                        String(this.milliSeconds / 10).padStart(2, '0') :
                        String(this.milliSeconds).padStart(2, '0');
    }

    private handleTimer() {
        if (this.gameIsFinished) {
            this.showFinishGamePopUp();
            return;
        }

        if (this.timerIsActive) {
            this.stopTimer();
            this.timerIsActive = false;
            this.buttonMessage = SessionGameConsole.START_MESSAGE;
        } else {
            this.startTimer();
            this.timerIsActive = true;
            this.buttonMessage = SessionGameConsole.PAUSE_MESSAGE;
        }
    }

    private startTimer() {
        this.timer = setInterval(() => {
            if (this.minutes === 0 && this.seconds === 0 && this.milliSeconds === 0) {
                this.stopTimer();
                this.buttonMessage = SessionGameConsole.FINISH_SESSION_MESSAGE;
            } else if (this.seconds === 0 && this.milliSeconds === 0) {
                this.minutes--;
                this.seconds = 59;
                this.milliSeconds = 1000;
            } else if (this.milliSeconds === 0) {
                this.seconds--;
                this.milliSeconds = 1000;
            } else {
                this.milliSeconds -= 10;
            }
        }, 10);
        this.noSleep!.enable();
    }

    private stopTimer() {
        clearInterval(this.timer);
        this.noSleep.disable();
    }

    beforeDestroy() {
        if (this.timer) {
            this.timer = undefined;
        }
        this.noSleep.disable();
    }

}
</script>

<style scoped lang="scss">

#content > div {
    display: flex;
    justify-content: center;
    align-self: center;
}

#content > div > span {
    margin-left: 5px;
}

#wrapper-start-button #start-button {
    width: 100%;
}

.team-name {
  font-size: 1rem;
}

.p {
}

.box {
  background-color: #212121;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;

    @media (min-width: 769px) {
        width: 700px;
        height: 200px;
    }
}

.is-size-3 {
  font-size: 2.6rem !important;
  color: #d43d3d;
}

.team-name {
  font-size: 1rem;
  color: whitesmoke;
}

#time {
  color: yellow;
  border: 1px solid #777777;
}


</style>
