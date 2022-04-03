import { VuexModule, Module, Mutation} from 'vuex-module-decorators';
import SessionDto from "@/data/dto/SessionDto";

@Module({ namespaced: true, name: 'SessionModule', stateFactory: true })
class SessionModule extends VuexModule {
    public sessions: SessionDto[] = [];
    public currentSession: SessionDto | undefined = undefined;

    @Mutation
    setSessionsInSessionOverview(sessions: SessionDto[]) {
        this.sessions = sessions;
    }

    @Mutation
    setCurrentSession(session: SessionDto) {
        this.currentSession = session;
    }

    get sessionById(): (id: string) => SessionDto | undefined {
        return (id: string) => {
            const session = this.sessions.find(session => session.id === id);
            this.currentSession = session;
            return session;
        }
    }

    get currentGameSession() {
        return () => {
            return this.currentSession;
        }
    }

    get sessionOverview(): SessionDto[] {
        return this.sessions;
    }
}

export default SessionModule;
