package com.goalkeeper.api.controller;

import com.goalkeeper.api.config.security.annotation.CurrentUser;
import com.goalkeeper.api.domain.ClubTeam;
import com.goalkeeper.api.domain.Player;
import com.goalkeeper.api.domain.User;
import com.goalkeeper.api.dto.ClubTeamDto;
import com.goalkeeper.api.dto.PlayerDto;
import com.goalkeeper.api.dto.validator.ClubTeamDtoValidator;
import com.goalkeeper.api.exceptions.ConstraintViolationException;
import com.goalkeeper.api.exceptions.EntityNotFoundException;
import com.goalkeeper.api.exceptions.NoTeamFoundException;
import com.goalkeeper.api.service.impl.ClubTeamService;
import com.goalkeeper.api.service.impl.UserService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/team")
public class ClubTeamController {

    Logger logger = LoggerFactory.getLogger(ClubTeamController.class);

    private ClubTeamService clubTeamService;
    private UserService userService;
    private ModelMapper modelMapper;
    private ClubTeamDtoValidator clubTeamDtoValidator;

    @InitBinder("teamDto")
    public void teamDTOValidatorBinding(WebDataBinder binder) {
        binder.addValidators(clubTeamDtoValidator);
    }

    @Autowired
    public ClubTeamController(final ClubTeamService teamService, final UserService userService, final ModelMapper modelMapper, final ClubTeamDtoValidator clubTeamDtoValidator) {
        this.clubTeamService = teamService;
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.clubTeamDtoValidator = clubTeamDtoValidator;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ClubTeamDto getTeam(@CurrentUser User user) {
        return toClubTeamDto(Optional.ofNullable(user.getClubTeam()).orElseThrow(() -> new NoTeamFoundException("This user has no team assigned")));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void createTeam(@Validated @RequestBody ClubTeamDto clubTeamDto, @CurrentUser User user) {
        if (user.getClubTeam() != null) {
            throw new ConstraintViolationException("This user has already been assigned to a team");
        }
        logger.info("creating clubteam for user: {} called: {}", user.getUsername(), clubTeamDto.getName());
        ClubTeam clubTeam = clubTeamService.createClubTeam(clubTeamDto, user);
        userService.addClubTeam(clubTeam, user);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void updateTeam(@Validated @RequestBody ClubTeamDto clubTeamDto, @CurrentUser User user) {
        logger.info("updating clubteam for user: {} and clubteam: {}", user.getUsername(), clubTeamDto.getName());
        clubTeamService.updateClubTeam(clubTeamDto, user);
    }

    //TODO modelmapper vervangen voor custom converter
    protected ClubTeamDto toClubTeamDto(ClubTeam clubTeam) {
        ClubTeamDto clubTeamDto = modelMapper.map(clubTeam, ClubTeamDto.class);
        clubTeamDto.setPlayers(clubTeamDto.getPlayers()
                .stream()
                .filter(playerDto -> playerDto.getActive())
                .sorted(Comparator.comparing(PlayerDto::getShirtNumber))
                .collect(Collectors.toList()));
        return clubTeamDto;
    }

    protected ClubTeam toClubTeam(ClubTeamDto clubTeamDto) {
        return  modelMapper.map(clubTeamDto, ClubTeam.class);
    }
}
