import { JsonObject, JsonProperty } from 'json2typescript';
import SessionTeamDto from "@/data/dto/SessionTeamDto";
import DateConverter from "@/serializer/converter/DateConverter";

@JsonObject('SessionDto')
export default class SessionDto {

    @JsonProperty('id', String)
    public id: string | undefined = undefined;

    @JsonProperty('name', String)
    public name: string | undefined = undefined;

    @JsonProperty('first', SessionTeamDto)
    public first: SessionTeamDto | undefined = undefined;

    @JsonProperty('second', SessionTeamDto)
    public second: SessionTeamDto | undefined = undefined;

    @JsonProperty('durationInMinutes', Number)
    public minutes: number | undefined = undefined;

    @JsonProperty('start', DateConverter)
    public start: Date | undefined = undefined;

    public static create(object: SessionDto) {
        const instance = new SessionDto;
        instance.id = object.id;
        instance.name = object.name;
        instance.first = object.first;
        instance.second = object.second;
        instance.minutes = object.minutes;
        instance.start = object.start;
        return instance;
    }
}
