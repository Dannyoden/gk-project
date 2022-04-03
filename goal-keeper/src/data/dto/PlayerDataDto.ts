import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('PlayerDataDto')
export default class PlayerDataDto {

    @JsonProperty('id', String)
    public id: string | undefined = undefined;

    @JsonProperty('fullName', String)
    public fullName: string | undefined = undefined;

    @JsonProperty('shirtNumber', Number)
    public shirtNumber: number | undefined = undefined;

    @JsonProperty('position', String)
    public position: string | undefined = undefined;

    @JsonProperty('totalSessions', String)
    public totalSessions: string | undefined = undefined;

    @JsonProperty('totalGoals', Number)
    public totalGoals: number | undefined = undefined;

    @JsonProperty('winPercentage', String)
    public winPercentage: string | undefined = undefined;

    @JsonProperty('winPercentage', String)
    public tiePercentage: string | undefined = undefined;

    @JsonProperty('winPercentage', String)
    public lossPercentage: string | undefined = undefined;
}
