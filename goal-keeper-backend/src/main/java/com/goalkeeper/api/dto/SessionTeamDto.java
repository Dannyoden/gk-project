package com.goalkeeper.api.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Builder
@Data
@JsonRootName("sessionTeam")
@NoArgsConstructor
@AllArgsConstructor
public class SessionTeamDto {

    private UUID publicId;
    private Set<PlayerDto> players;
}
