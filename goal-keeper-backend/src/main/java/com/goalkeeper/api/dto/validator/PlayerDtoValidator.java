package com.goalkeeper.api.dto.validator;

import com.goalkeeper.api.dto.PlayerDto;
import com.goalkeeper.api.dto.SessionDto;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class PlayerDtoValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return PlayerDto.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        ValidationUtils.rejectIfEmpty(errors, "givenName","Given name name can't be empty");
        ValidationUtils.rejectIfEmpty(errors, "surname","Surname can't be empty");
        ValidationUtils.rejectIfEmpty(errors, "position","Position date can't be empty");
    }
}
