<template>
    <div class="body">
      <HeroBanner label="Training sessions"/>
      <PlaceHolder
          v-if="showPlaceholder"
          icon="fas fa-arrow-down"
          :text="placeholderText"/>
        <div class="columns is-multiline is-mobile">
            <Session
                v-for="session in sessionOverview"
                :key="session.id"
                :session="session">
            </Session>
        </div>
        <div class="fixed-button">
            <Button :icon-data="{icon: 'fas fa-plus', position: 'left'}"
                    class-name="button is-centered is-primary"
                    text="New Session"
                    @clicked="createNewSession"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import Session from '@/components/sessions/Session.vue';
import SessionDto from '@/data/dto/SessionDto';
import SessionBackend from '@/backend/SessionBackend';
import { namespace } from 'vuex-class';
import Routes from '@/router/Routes';
import HeroBanner from "@/components/common/HeroBanner.vue";
import Button from '@/components/common/Button.vue';
import PlaceHolder from "@/components/common/PlaceHolder.vue";

const SessionModule = namespace('SessionModule');

@Component({
    components: {
      PlaceHolder,
        Session,
        HeroBanner,
        Button
    }
})
export default class SessionOverview extends Vue {

    @SessionModule.Getter('sessionOverview')
    getSessionOverview!: SessionDto[];

    sessionsFetched = false;
    placeholder = false;
    placeholderText = 'You haven\'t added any sessions yet. You can do so by clicking the \'New Session\' button below';

    created() {
        try {
            this.getSessions();
        } catch (error) {
            throw error;
        }
    }

    @Watch('sessionsFetched')
    sessionRetrieved(): void {
        if (!this.sessionsFetched) {
            return;
        }
        this.$emit('showNewSessionPopUp', true);
    }

    getSessions() {
      let loader = this.initLoader();
        let sessions: SessionDto[] = [];
        SessionBackend.retrieveSessions().subscribe(
            (sessionCollection: SessionDto[]) => {
                sessionCollection.forEach(sessionDto => {
                    sessions.push(sessionDto);
                });
            }, (error: any) => {
                console.error(error);
                loader.hide();
                return;
            }, () => {
                this.sessionsFetched = true;
                this.$store.commit('SessionModule/setSessionsInSessionOverview', sessions);
                loader.hide();
            }
        );
    }

    get showPlaceholder() {
        return this.placeholder && this.sessionsFetched;
    }

    get sessionOverview() {
        const overview = this.getSessionOverview;

        if (!overview || overview.length === 0) {
            this.placeholder = true;
            return;
        }
        this.placeholder = false;
        return overview.sort((first: SessionDto, second: SessionDto) => (first.start!.getTime() - second.start!.getTime()));
    }

    createNewSession() {
        this.$router.push({
            name: Routes.SessionWizard
        });
    }

    initLoader() {
      return this.$loading.show({
        opacity: 0.2,
        color: '#50ffe5',
        backgroundColor: '#ffffff',
        width: 40,
        canCancel: true
      });
    }
}

</script>

<style scoped lang="scss">

.body {
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
}

.fixed-button {
    position: fixed;
    align-self: center;
    bottom: 6vh;
    z-index: 1;
}

.columns {
  margin: 30px 0 0;
}

@media screen and (min-width: 768px) {
  .columns {
    margin-left: -2rem;
    margin-right: -2rem;
  }
}


</style>
