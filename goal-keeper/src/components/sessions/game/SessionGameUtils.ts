import PlayerDto from '@/data/dto/PlayerDto';
import {GamePlayer} from '@/data/interface/GamePlayer';
import SessionTeamDto from "@/data/dto/SessionTeamDto";

export function findGamePlayerByIdAndTeam(playerId: string, team: GamePlayer[]): GamePlayer | undefined {
    return team.find(player => player.details.id === playerId);
}

export function mapPlayersToGamePlayers(players: PlayerDto[]): GamePlayer[] {
    let gamePlayers: GamePlayer[] = [];
    players.forEach(player => {
        let gamePlayer: GamePlayer = { details: player, goals: 0 }
        gamePlayers.push(gamePlayer);
    });
    return gamePlayers;
}

export function mapGamePlayerToPlayer(gamePlayer: GamePlayer): PlayerDto {
    return PlayerDto.create(gamePlayer.details);
}

export function mapGoalsToPlayersScoredList(gameTeam: GamePlayer[], sessionTeam: SessionTeamDto): void {
    gameTeam.forEach(player => {
        if (player.goals === 0) {
            return;
        }
        for (let count = 0; count < player.goals; count++) {
            const gamePlayer = findGamePlayerByIdAndTeam(player.details.id!, gameTeam);
            const playerToAdd = mapGamePlayerToPlayer(gamePlayer!);
            sessionTeam.result!.playersScored!.push(playerToAdd!);
        }
    });
}
