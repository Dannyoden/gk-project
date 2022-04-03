package com.goalkeeper.api.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.goalkeeper.api.domain.Session;
import com.goalkeeper.api.domain.SessionTeam;
import com.goalkeeper.api.domain.SessionTeamResult;
import com.goalkeeper.api.domain.SessionTeamResult.SessionResult;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Builder
@Data
@JsonRootName("sessionTeamResult")
@NoArgsConstructor
@AllArgsConstructor
public class SessionTeamResultDto {

    private UUID publicId;
    private List<PlayerDto> playersScored;
    private SessionResult result;
    private SessionTeamDto sessionTeam;
}
