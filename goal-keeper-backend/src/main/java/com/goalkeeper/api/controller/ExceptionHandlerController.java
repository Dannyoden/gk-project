package com.goalkeeper.api.controller;

import com.goalkeeper.api.dto.ErrorDto;
import com.goalkeeper.api.exceptions.ConstraintViolationException;
import com.goalkeeper.api.exceptions.EntityNotFoundException;
import com.goalkeeper.api.exceptions.InvalidTokenException;
import com.goalkeeper.api.exceptions.NoTeamFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@ResponseBody
@ControllerAdvice
public class ExceptionHandlerController {

    Logger logger = LoggerFactory.getLogger(ExceptionHandlerController.class);

    @ExceptionHandler({EntityNotFoundException.class, ConstraintViolationException.class, InvalidTokenException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ErrorDto entityNotFoundException(Exception e, HttpServletRequest request) {
        return createErrorDTO(e, request, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoTeamFoundException.class)
    @ResponseStatus(HttpStatus.TEMPORARY_REDIRECT)
    ErrorDto teamNotFoundException(Exception e, HttpServletRequest request) {
        return createErrorDTO(e, request, HttpStatus.TEMPORARY_REDIRECT);
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    ErrorDto onMethodArgumentNotValidException(Exception e, HttpServletRequest request) {
        return createErrorDTO(e, request, HttpStatus.UNAUTHORIZED);
    }

    public ErrorDto createErrorDTO(Exception e, HttpServletRequest request, HttpStatus status) {
        logger.error(e.getMessage(), e);
        return ErrorDto.builder().timestamp(LocalDateTime.now())
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(e.getMessage())
                .path((String)request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI))
                .build();
    }
}
