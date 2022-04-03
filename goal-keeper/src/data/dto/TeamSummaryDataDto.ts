import { JsonObject, JsonProperty } from 'json2typescript';
import LabelValueDto from "@/data/dto/LabelValueDto";

@JsonObject('TeamSummaryData')
export default class TeamSummaryDataDto {

    @JsonProperty('clubTeamName', String)
    public clubTeamName: string | undefined = undefined;

    @JsonProperty('summaryData', [LabelValueDto])
    public summaryData: LabelValueDto[] | undefined = undefined;
}
