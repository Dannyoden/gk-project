import { JsonObject, JsonProperty } from 'json2typescript';
import PlayerDto from './PlayerDto';
import SessionTeamResultDto from "@/data/dto/SessionTeamResultDto";

@JsonObject('SessionTeamDto')
export default class SessionTeamDto {

    @JsonProperty('id', String)
    public id: string | undefined = undefined;

    @JsonProperty('players', [PlayerDto])
    public players: PlayerDto[] | undefined = undefined;

    @JsonProperty('result', SessionTeamResultDto)
    public result: SessionTeamResultDto | undefined = undefined;

    public static create(object: SessionTeamDto) {
        const instance = new SessionTeamDto();
        instance.id = object.id;
        instance.players = object.players;
        instance.result = object.result;
        return instance;
    }
}