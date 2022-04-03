package com.goalkeeper.api.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Builder
@Data
@JsonRootName("team")
@NoArgsConstructor
@AllArgsConstructor
public class ClubTeamDto {

    private UUID id;
    private String name;
    private List<PlayerDto> players;
    private String competition;
    private String country;
}
