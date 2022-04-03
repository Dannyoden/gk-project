package com.goalkeeper.api.exceptions;

public class NoTeamFoundException extends RuntimeException {

    public NoTeamFoundException(String message) {
        super(message);
    }
}
