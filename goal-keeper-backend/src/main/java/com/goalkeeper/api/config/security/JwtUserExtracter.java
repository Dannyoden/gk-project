package com.goalkeeper.api.config.security;

import com.goalkeeper.api.domain.User;
import com.goalkeeper.api.exceptions.EntityNotFoundException;
import com.goalkeeper.api.service.impl.UserDetailsImpl;
import com.goalkeeper.api.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component("jwtUserExtractor")
public class JwtUserExtracter {

    @Autowired
    private UserService userService;

    public User getUser(UserDetailsImpl u) {
        return userService.findUserById(u.getId()).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }
}



