package com.goalkeeper.api.controller;

import com.goalkeeper.api.config.security.JwtUtils;
import com.goalkeeper.api.domain.ResetToken;
import com.goalkeeper.api.domain.Role;
import com.goalkeeper.api.domain.User;
import com.goalkeeper.api.dto.*;
import com.goalkeeper.api.exceptions.EntityNotFoundException;
import com.goalkeeper.api.exceptions.InvalidTokenException;
import com.goalkeeper.api.repository.RoleRepository;
import com.goalkeeper.api.repository.UserRepository;
import com.goalkeeper.api.service.impl.EmailService;
import com.goalkeeper.api.service.impl.UserDetailsImpl;
import com.goalkeeper.api.service.impl.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    Logger logger = LoggerFactory.getLogger(AuthController.class);

    final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\."+
            "[a-zA-Z0-9_+&*-]+)*@" +
            "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
            "A-Z]{2,7}$";

    private AuthenticationManager authenticationManager;
    private UserService userService;
    private RoleRepository roleRepository;
    private JwtUtils jwtUtils;
    private EmailService emailService;

    @Autowired
    public AuthController(final AuthenticationManager authenticationManager, final EmailService emailService, final UserService userService, final RoleRepository roleRepository,  final JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.jwtUtils = jwtUtils;
        this.emailService = emailService;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDto loginRequest) {
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Optional<User> userByEmail = Optional.empty();
        if (pattern.matcher(loginRequest.getUsername().toLowerCase()).matches()) {
            userByEmail = userService.findByEmail(loginRequest.getUsername().toLowerCase());
        }

        String usernameToAuthenticate = userByEmail.isPresent() ? userByEmail.get().getUsername().toLowerCase() : loginRequest.getUsername().toLowerCase();
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(usernameToAuthenticate, loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponseDto(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequestDto signUpRequest) {
        if (userService.existsByUsername(signUpRequest.getUsername().toLowerCase())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponseDto("Error: This username is already taken"));
        }

        if (userService.existsByEmail(signUpRequest.getEmail().toLowerCase())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponseDto("Error: This email is already in use"));
        }
        User user = userService.createUserAccount(signUpRequest);
        userService.save(user);
        return ResponseEntity.ok(new MessageResponseDto("User registered successfully!"));
    }

    @PostMapping("/resetPassword")
    public GenericResponseDto resetPassword(@RequestParam("email") String userEmail) {
        Optional<User> user = userService.findByEmail(userEmail);
        if (!user.isPresent()) {
            throw new EntityNotFoundException("User not found");
        }
        String token = UUID.randomUUID().toString();
        userService.createPasswordResetTokenForUser(user.get(), token);
        emailService.send(emailService.constructResetTokenEmail(token, user.get()));
        return new GenericResponseDto("email send");
    }


    @GetMapping("/validateToken")
    public GenericResponseDto showChangePasswordPage(@RequestParam("token") String token) {
        String result = userService.validatePasswordResetToken(token);
        if(result != null) {
            throw new InvalidTokenException("Your token is invalid and/or expired");
        } else {
            new GenericResponseDto("Valid token");
        }
        return null;
    }

    @PostMapping("/savePassword")
    public GenericResponseDto savePassword(@RequestBody PasswordDto passwordDto) {
        String result = userService.validatePasswordResetToken(passwordDto.getToken());
        if(result != null) {
            throw new InvalidTokenException("Your token is invalid and/or expired");
        }
        Optional<ResetToken> token = userService.getUserByPasswordResetToken(passwordDto.getToken());
        if(token.isPresent()) {
            userService.changeUserPassword(token.get().getUser(), passwordDto.getNewPassword());
            return new GenericResponseDto("Password updated");
        } else {
            throw new EntityNotFoundException("user not found");
        }
    }
}
