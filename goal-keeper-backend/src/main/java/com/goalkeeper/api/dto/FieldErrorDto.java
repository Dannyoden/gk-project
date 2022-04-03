package com.goalkeeper.api.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
@JsonRootName(value = "fieldError")
public class FieldErrorDto {

    private final String fieldName;
    private final String message;
}

