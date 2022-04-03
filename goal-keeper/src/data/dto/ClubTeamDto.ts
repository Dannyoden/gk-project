import {JsonObject, JsonProperty} from "json2typescript";
import PlayerDto from "@/data/dto/PlayerDto";

@JsonObject('ClubTeamDto')
export default class ClubTeamDto {

    @JsonProperty('id', String)
    public id: string | undefined = undefined;

    @JsonProperty('name', String)
    public name: string | undefined = undefined;

    @JsonProperty('players', [PlayerDto])
    public players: PlayerDto[] = [];

    @JsonProperty('competition', String)
    public competition: string | undefined = undefined;

    @JsonProperty('country', String)
    public country: string | undefined = undefined;
}
