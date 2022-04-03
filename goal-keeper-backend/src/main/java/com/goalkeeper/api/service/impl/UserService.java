package com.goalkeeper.api.service.impl;

import com.goalkeeper.api.domain.ClubTeam;
import com.goalkeeper.api.domain.ResetToken;
import com.goalkeeper.api.domain.Role;
import com.goalkeeper.api.domain.User;
import com.goalkeeper.api.dto.SignUpRequestDto;
import com.goalkeeper.api.repository.ResetTokenRepository;
import com.goalkeeper.api.repository.RoleRepository;
import com.goalkeeper.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserService {

    private UserRepository userRepository;
    private ResetTokenRepository resetTokenRepository;
    private PasswordEncoder encoder;
    private RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, ResetTokenRepository resetTokenRepository, PasswordEncoder encoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.resetTokenRepository = resetTokenRepository;
        this.encoder = encoder;
        this.roleRepository = roleRepository;
    }

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public void addClubTeam(ClubTeam clubTeam, User user) {
            user.setClubTeam(clubTeam);
            userRepository.save(user);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String email) {
        return userRepository.existsByUsername(email);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createUserAccount(SignUpRequestDto signUpRequest) {
        // Create new user's account
        User user = User.builder()
                .publicId(UUID.randomUUID())
                .username(signUpRequest.getUsername().toLowerCase())
                .email(signUpRequest.getEmail().toLowerCase())
                .firstName(signUpRequest.getFirstName())
                .lastName(signUpRequest.getLastName())
                .password(encoder.encode(signUpRequest.getPassword()))
                .build();

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(Role.ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(Role.ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(Role.ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        return user;
    }

    //TODO move all token stuff to seperate securityService
    public void createPasswordResetTokenForUser(User user, String token) {
        ResetToken myToken = new ResetToken(token, user);
        resetTokenRepository.save(myToken);
    }

    public String validatePasswordResetToken(String token) {
        final ResetToken passToken = resetTokenRepository.findByToken(token);
        return !isTokenFound(passToken) ?
                "invalidToken" :
                isTokenExpired(passToken) ? "expired" : null;
    }

    private boolean isTokenFound(ResetToken passToken) {
        return passToken != null;
    }

    private boolean isTokenExpired(ResetToken passToken) {
        final Calendar cal = Calendar.getInstance();
        return passToken.getExpiryDate().before(cal.getTime());
    }


    public Optional<ResetToken> getUserByPasswordResetToken(String token) {
        return Optional.ofNullable(resetTokenRepository.findByToken(token));
    }

    public void changeUserPassword(User user, String newPassword) {
        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);
    }
}
