import PlayerDto from '@/data/dto/PlayerDto';
import type {SessionWizardPlayer} from '@/data/interface/SessionWizardPlayer';
import {SessionTeam} from '@/data/enum/SessionTeam';

export function mapPlayerDtoToSessionWizardPlayer(player: PlayerDto, hasDuplicateName: boolean, team: SessionTeam = SessionTeam.NOT_SELECTED, ): SessionWizardPlayer {
    return { player, team, hasDuplicateName };
}

export function hasDuplicateName(player: PlayerDto, players: PlayerDto[]): boolean {
    const newPlayerArray = players.filter(arrPlayer => arrPlayer.givenName === player.givenName);
    return newPlayerArray.length > 1;
}

export function findPlayerByIdAndTeam(playerId: string, team: PlayerDto[]): PlayerDto | undefined {
    return team.find(player => player.id === playerId);
}
