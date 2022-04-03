package com.goalkeeper.api.controller;

import com.goalkeeper.api.config.security.annotation.CurrentUser;
import com.goalkeeper.api.domain.Session;
import com.goalkeeper.api.domain.SessionTeam;
import com.goalkeeper.api.domain.SessionTeamResult;
import com.goalkeeper.api.domain.User;
import com.goalkeeper.api.dto.SessionDto;
import com.goalkeeper.api.dto.SessionTeamDto;
import com.goalkeeper.api.dto.SessionTeamResultDto;
import com.goalkeeper.api.dto.converters.SessionConverter;
import com.goalkeeper.api.dto.converters.SessionTeamResultConverter;
import com.goalkeeper.api.dto.validator.SessionDtoValidator;
import com.goalkeeper.api.exceptions.EntityNotFoundException;
import com.goalkeeper.api.service.impl.PlayerService;
import com.goalkeeper.api.service.impl.SessionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = SessionController.SESSION_ENDPOINT_PATH)
public class SessionController {

    Logger logger = LoggerFactory.getLogger(SessionController.class);

    public static final String SESSION_ENDPOINT_PATH = "/api/sessions";

    private final SessionService sessionService;
    private final SessionDtoValidator sessionDtoValidator;
    private final SessionConverter sessionConverter;
    private final PlayerService playerService;

    @InitBinder("sessionDto")
    public void sessionsDTOValidatorBinding(WebDataBinder binder) {
        binder.addValidators(sessionDtoValidator);
    }

    @Autowired
    public SessionController(SessionService sessionService,
                             SessionDtoValidator sessionDtoValidator,
                             SessionConverter sessionConverter,
                             PlayerService playerService) {
        this.sessionService = sessionService;
        this.sessionDtoValidator = sessionDtoValidator;
        this.sessionConverter = sessionConverter;
        this.playerService = playerService;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public List<SessionDto> getSessions(@CurrentUser User user) {
        return sessionService.findSessionsClubTeam(user.getClubTeam())
                .stream()
                .map(sessionConverter::convert)
                .collect(Collectors.toList());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/id/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public SessionDto getSession(@Validated @PathVariable String id) {
        return sessionService.findSessionByPublicId(UUID.fromString(id))
                .map(sessionConverter::convert)
                .orElseThrow(() -> new RuntimeException("There exists no session with this id."));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void createSession(@Validated @RequestBody SessionDto sessionDto,
                              @CurrentUser User user) {
        logger.info("creating session for user: {}", user.getUsername());
        Session session = sessionConverter.toNewEntity(sessionDto, user);
        sessionService.createSession(session);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/id/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void updateSession(@Validated @RequestBody SessionDto sessionDto) {
        Session session = sessionService.findSessionByPublicId(sessionDto.getPublicId())
                .orElseThrow(() -> new RuntimeException("There exists no session with this id."));
        sessionService.updateSession(session, sessionDto);
    }

}
