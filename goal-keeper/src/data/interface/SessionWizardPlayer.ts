import PlayerDto from '@/data/dto/PlayerDto';
import { SessionTeam } from '@/data/enum/SessionTeam';

export interface SessionWizardPlayer {
    player: PlayerDto,
    team: SessionTeam,
    hasDuplicateName: boolean
}