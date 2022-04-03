<template>
    <div class="column is-full">
        <div class="card is is-centered" @click="changeShowPopUp">
            <div class="card-content">
                <div class="media">
                    <div class="media-left">
                      <span class="icon"><i class="far fa-calendar"></i></span><span class="date">{{ this.sessionDate}}</span>
                      <p id="session-name"> {{ this.sessionName }} </p>
                    </div>
                    <div class="media-content ">
                      <div>

                      </div>
                    </div>
                    <div class="media-right">
                      <div>
                        <span v-if="session.first.players.length <= 2" class="tag is-primary is-pulled-left">{{ playerCount }}</span>
                        <span v-if="session.first.players.length >= 3" class="tag is-warning is-pulled-left">{{ playerCount }}</span>
                        <span v-if="session.first.players.length >= 5" class="tag is-danger is-pulled-left">{{ playerCount }}</span>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <PopUp
            v-if="showPopUp"
            :pop-up-text="textPopUp"
            @decline="changeShowPopUp"
            @confirm="routeToSessionGame">
        </PopUp>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SessionDto from '@/data/dto/SessionDto';
import DateUtils from '@/components/sessions/DateUtils';
import PopUp from '@/components/common/PopUp.vue';
import Routes from '@/router/Routes';

@Component({
    components: {
        PopUp
    }
})
export default class Session extends Vue {
    @Prop() session!: SessionDto;
    showPopUp = false;
    readonly textPopUp = 'Start Session?';

    get sessionName(): string | undefined {
        return 'Training session ' +  this.session.name;
    }

    get playerCount(): string | undefined {
      return this.session.first?.players?.length + 'x' + this.session.second?.players?.length;
    }

    get sessionDate(): string | undefined {
        return DateUtils.formatDateToString(this.session.start!);
    }

    changeShowPopUp() {
        this.showPopUp = !this.showPopUp;
    }

    private routeToSessionGame() {
        this.$store.commit('SessionModule/setCurrentSession', this.session);
        this.$router.push({
            name: Routes.SessionGame,
            params: {
                sessionId: this.session.id!
            }
        });
    }
}

</script>

<style scoped lang="scss">

.card {
  margin: auto;
  max-width: 500px;
  max-height: 89px;
  background-color: #2d2d2d;

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
    }

    .has-text-link {
        color: #33afa2 !important;
    }

}

@media (max-width: 769px) {
  .card {
    margin-right: 20px;
    margin-left: 20px;
  }
}

.column {
  padding: 0.45rem;
  overflow-x: hidden;
}

.fa-edit:before {
    content: "\f044";
    color: #40e0d0;
}

.fa-trash-alt:before {
    content: "\f2ed";
    color: indianred;
    padding-left: 3px;
}

.icon {
  color: whitesmoke;
}

.date {
  color: whitesmoke;
}

#session-name  {
  color: whitesmoke;
  font-weight: 400;
}

#session-type {
  font-style: italic;
  color: #dcdcdc;
  font-weight: 400;
  position: absolute;
  top: 51px;
  right: 20px;
}

.tag {
  position: absolute;
  top: 18px;
  right: 21px;
  font-size: 0.9rem;
}

</style>
