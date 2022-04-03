import {SessionWizardPlayer} from '@/data/interface/SessionWizardPlayer';
import PlayerDto from '@/data/dto/PlayerDto';
import {SessionTeam} from '@/data/enum/SessionTeam';

export function mapSessionWizardPlayersToSessionTeam(team: SessionTeam, sessionWizardPlayers: SessionWizardPlayer[]): PlayerDto[] {
    return sessionWizardPlayers.filter(player => player.team === team).map(sessionWizardPlayer => sessionWizardPlayer.player);
}