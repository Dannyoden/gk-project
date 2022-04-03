package com.goalkeeper.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.List;

@JsonRootName(value = "error")
@Data
@SuperBuilder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorDto {

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    private LocalDateTime timestamp;

    private Integer status;

    private String error;

    private String message;

    private String path;

    private List<FieldErrorDto> fieldErrors;
}
