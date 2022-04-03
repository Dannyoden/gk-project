package com.goalkeeper.api.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@JsonRootName("session")
@NoArgsConstructor
@AllArgsConstructor
public class SessionDto implements Serializable {

    private static final long serialVersionUUID = 6089973893198441014L;

    private UUID publicId;
    private String name;
    private List<SessionTeamResultDto> teamResults;
    private Integer durationInMinutes;
    private LocalDateTime start;
}

