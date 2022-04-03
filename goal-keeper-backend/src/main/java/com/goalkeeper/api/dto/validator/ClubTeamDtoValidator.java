package com.goalkeeper.api.dto.validator;

import com.goalkeeper.api.dto.ClubTeamDto;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Component
public class ClubTeamDtoValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return ClubTeamDto.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        ValidationUtils.rejectIfEmpty(errors, "name", "name can't be empty");
        ValidationUtils.rejectIfEmpty(errors, "competition", "competition can't be empty");
        ValidationUtils.rejectIfEmpty(errors, "country", "country can't be empty");
    }
}
