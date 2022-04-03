package com.goalkeeper.api.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Builder
@Data
@JsonRootName("playerData")
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDataDto {

    private UUID id;
    private String fullName;
    private Integer shirtNumber;
    private String position;
    private Integer totalSessions;
    private Integer totalGoals;
    private String winPercentage;
    private String tiePercentage;
    private String lossPercentage;

}
