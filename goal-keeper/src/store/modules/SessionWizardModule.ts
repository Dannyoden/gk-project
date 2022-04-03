import {Module, Mutation, VuexModule} from 'vuex-module-decorators';
import PlayerDto from '@/data/dto/PlayerDto';
import type {SessionWizardPlayer} from '@/data/interface/SessionWizardPlayer';
import {mapPlayerDtoToSessionWizardPlayer, hasDuplicateName} from '@/components/wizard/utils/SessionWizardUtils';
import {SessionTeam} from '@/data/enum/SessionTeam';
import SessionDto from '@/data/dto/SessionDto';
import {mapSessionWizardPlayersToSessionTeam} from '@/store/modules/utils/StoreUtils';
import SessionTeamDto from '@/data/dto/SessionTeamDto';
import {SessionResult} from '@/data/enum/SessionResult';
import SessionTeamResultDto from '@/data/dto/SessionTeamResultDto';

@Module({ name: 'SessionWizardModule', namespaced: true, stateFactory: true })
class SessionWizardModule extends VuexModule {
    public step = 1;
    public previousStep = 0;
    public name: string | undefined = undefined;
    public duration: number | undefined = undefined;
    public date: Date | undefined = undefined;
    public team: SessionWizardPlayer[] = [];

    readonly DUMMY_ID = 'a2ec8743-b10d-4387-b67d-4f7fd8d8c8b0';

    @Mutation
    setStep(input: number) {
        this.step += input;
    }

    @Mutation
    setPreviousStep(input: number) {
        this.previousStep = input;
    }

    @Mutation
    setSessionName(name: string) {
        this.name = name;
    }

    @Mutation
    setSessionDuration(minutes: number) {
        this.duration = minutes;
    }

    @Mutation
    setSessionDate(date: Date) {
        this.date = date;
    }

    @Mutation
    setTeam(playersArg: PlayerDto[]) {
        playersArg.forEach(player => {
            const duplicate = hasDuplicateName(player, playersArg);
            this.team.push(mapPlayerDtoToSessionWizardPlayer(player, duplicate));
        });
    }

    @Mutation
    setTeamOfPlayer(input: { playerArg: SessionWizardPlayer, sessionTeamValue: SessionTeam }) {
        const index = this.team.findIndex(sessionWizardPlayer => sessionWizardPlayer.player.id === input.playerArg.player.id);
        this.team[index].team = input.sessionTeamValue;
    }

    get currentStep(): number {
        return this.step;
    }

    get sessionName(): string | undefined {
        return this.name;
    }

    get sessionDuration(): number | undefined {
        return this.duration;
    }

    get sessionDate(): Date | undefined {
        return this.date;
    }

    get hasValidSessionDetails(): boolean {
        if (!this.name || !this.duration || !this.date) {
            return false;
        }
        if (this.name.length === 0) {
            return false;
        }
        return this.duration !== 0;
    }

    get sessionWizardTeam(): SessionWizardPlayer[] {
        return this.team;
    }

    get playersOfTeam(): (team: SessionTeam) => SessionWizardPlayer[] {
        return (team: SessionTeam) => {
            return this.team.filter(player => player.team === team);
        }
    }

    get session(): SessionDto {
        return SessionDto.create({
            id: this.DUMMY_ID,
            name: this.name,
            first: SessionTeamDto.create({
               id: this.DUMMY_ID,
               players: mapSessionWizardPlayersToSessionTeam(SessionTeam.FIRST, this.team),
               result: SessionTeamResultDto.create({
                   id: this.DUMMY_ID,
                   result: SessionResult.NOT_PLAYED,
                   playersScored: []
               })
            }),
            second: SessionTeamDto.create({
               id: this.DUMMY_ID,
               players: mapSessionWizardPlayersToSessionTeam(SessionTeam.SECOND, this.team),
               result: SessionTeamResultDto.create({
                   id: this.DUMMY_ID,
                   result: SessionResult.NOT_PLAYED,
                   playersScored: []
               })
            }),
            minutes: this.duration,
            start: this.date
        });
    }

}

export default SessionWizardModule;
