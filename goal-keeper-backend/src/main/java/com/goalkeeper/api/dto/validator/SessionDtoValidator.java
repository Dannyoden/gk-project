package com.goalkeeper.api.dto.validator;

import com.goalkeeper.api.dto.SessionDto;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class SessionDtoValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return SessionDto.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        ValidationUtils.rejectIfEmpty(errors, "name","Session name can't be empty");
        ValidationUtils.rejectIfEmpty(errors, "durationInMinutes","duration can't be empty");
        ValidationUtils.rejectIfEmpty(errors, "start","Start date can't be empty");
    }
}
