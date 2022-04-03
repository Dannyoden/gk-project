package com.goalkeeper.api.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@JsonRootName("playerData")
@NoArgsConstructor
@AllArgsConstructor
public class PasswordDto {

    private String oldPassword;

    private  String token;

    private String newPassword;
}
