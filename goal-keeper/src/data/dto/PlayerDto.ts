import { JsonObject, JsonProperty } from 'json2typescript';
import DateConverter from "@/serializer/converter/DateConverter";

@JsonObject('PlayerDto')
export default class PlayerDto {

    @JsonProperty('id', String)
    public id: string | undefined = undefined;

    @JsonProperty('givenName', String)
    public givenName: string | undefined = undefined;

    @JsonProperty('surname', String)
    public surname: string | undefined = undefined;

    @JsonProperty('position', String)
    public position: string | undefined = undefined;

    @JsonProperty('shirtNumber', Number)
    public shirtNumber: number | undefined = undefined;

    @JsonProperty('preferredFoot', String)
    public preferredFoot: string | undefined = undefined;

    @JsonProperty('dateOfBirth', DateConverter, true)
    public dateOfBirth: Date | undefined = undefined;

    static create(player: PlayerDto) {
        return {
            id: player.id,
            givenName: player.givenName,
            surname: player.surname,
            position: player.position,
            shirtNumber: player.shirtNumber,
            preferredFoot: player.preferredFoot,
            dateOfBirth: player.dateOfBirth
        }
    }
}
