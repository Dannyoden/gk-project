import {JsonObject, JsonProperty} from 'json2typescript';
import PlayerDto from './PlayerDto';
import {SessionResult} from "@/data/enum/SessionResult";

@JsonObject('SessionTeamResultDto')
export default class SessionTeamResultDto {

    @JsonProperty('id', String)
    public id: string | undefined = undefined;

    @JsonProperty('playersScored', [PlayerDto])
    public playersScored: PlayerDto[] | undefined = undefined;

    @JsonProperty('result', String)
    public result: SessionResult | undefined = undefined;

    public static create(object: SessionTeamResultDto) {
        const instance = new SessionTeamResultDto();
        instance.id = object.id;
        instance.playersScored = object.playersScored;
        instance.result = object.result;
        return instance;
    }
}
