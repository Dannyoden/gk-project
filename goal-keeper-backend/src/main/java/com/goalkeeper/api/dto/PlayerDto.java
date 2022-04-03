package com.goalkeeper.api.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.UUID;

@Builder
@Data
@JsonRootName("player")
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDto {

    private UUID id;

    @NotBlank
    @Size(min = 3, max = 20)
    private String givenName;

    @NotBlank
    @Size(max = 50)
    private String surname;

    @NotNull
    private Integer shirtNumber;

    private String position;
    private String preferredFoot;
    private LocalDateTime dateOfBirth;
    private Boolean active;


}
