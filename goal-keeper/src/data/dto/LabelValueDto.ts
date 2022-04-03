import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('LabelValueDto')
export default class LabelValueDto {

    @JsonProperty('label', String)
    public label: string | undefined = undefined;

    @JsonProperty('value', Number)
    public value: number | undefined = undefined;
}
