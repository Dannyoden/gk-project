import { VuexModule, Module, Mutation} from 'vuex-module-decorators';
import PlayerDataDto from "@/data/dto/PlayerDataDto";

@Module({ namespaced: true, name: 'DashboardModule', stateFactory: true })
class DashboardModule extends VuexModule {

    public playerDataDtos: PlayerDataDto[] = [];

    @Mutation
    setClubTeamOverview(playerDataDtos: PlayerDataDto[]) {
        this.playerDataDtos = playerDataDtos;
    }

    get clubTeamOverview(): PlayerDataDto[] {
        return this.playerDataDtos;
    }
}

export default DashboardModule
;
