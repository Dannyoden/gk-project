package com.goalkeeper.api.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;


@Builder
@Data
@JsonRootName("TeamSummaryData")
@NoArgsConstructor
@AllArgsConstructor
public class TeamSummaryDataDto {

    private String clubTeamName;
    private List<LabelValueDto> summaryData;

}
