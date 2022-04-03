import {VuexModule, Module, Mutation} from 'vuex-module-decorators';
import ClubTeamDto from "@/data/dto/ClubTeamDto";
import PlayerDto from '@/data/dto/PlayerDto';

@Module({ namespaced: true, name: 'ClubTeamModule' })
class ClubTeamModule extends VuexModule {
    public clubTeam?: ClubTeamDto = undefined;

    @Mutation
    setClubTeam(clubTeam: ClubTeamDto) {
        this.clubTeam = clubTeam;
    }

    get clubTeamExists(): boolean {
        return !!this.clubTeam;
    }

    get clubTeamPlayers(): () => PlayerDto[] {
        return () => {
            if (!this.clubTeam) {
                return [];
            }
            return this.clubTeam.players;
        }
    }
}

export default ClubTeamModule;
