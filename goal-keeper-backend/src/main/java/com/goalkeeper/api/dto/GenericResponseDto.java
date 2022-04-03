package com.goalkeeper.api.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@JsonRootName(value = "fieldError")
public class GenericResponseDto {
    private String message;
    private String error;

    public GenericResponseDto(String message) {
        this.message = message;
    }

    public GenericResponseDto(String message, String error) {
        this.message = message;
        this.error = error;
    }
}
