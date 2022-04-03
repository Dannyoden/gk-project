package com.goalkeeper.api.controller;

import com.goalkeeper.api.config.security.annotation.CurrentUser;
import com.goalkeeper.api.domain.Player;
import com.goalkeeper.api.domain.User;
import com.goalkeeper.api.dto.PlayerDto;
import com.goalkeeper.api.dto.converters.PlayerConverter;
import com.goalkeeper.api.dto.validator.PlayerDtoValidator;
import com.goalkeeper.api.service.impl.PlayerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/player")
public class PlayerController {

    Logger logger = LoggerFactory.getLogger(PlayerController.class);

    private PlayerService playerService;
    private PlayerConverter playerConverter;

    @Autowired
    public PlayerController(PlayerService playerService, PlayerConverter playerConverter) {
        this.playerService = playerService;
        this.playerConverter = playerConverter;
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @DeleteMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void removePlayer(@Valid @RequestBody PlayerDto playerDto, @CurrentUser User user) {
        Optional<Player> optionalPlayer = Optional.of(playerService.findPlayerById(playerDto.getId()))
                .orElseThrow(() -> new NullPointerException("This player does not exist"));
        logger.info("removing player with id {} for user: {}", playerDto.getId(),user.getUsername());
        if (optionalPlayer.isPresent()) {
            playerService.removePlayer(optionalPlayer.get());
        }
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public void upsertPlayer(@Valid @RequestBody PlayerDto playerDto, @CurrentUser User user) {
        Optional<Player> playerById = playerService.findPlayerById(playerDto.getId());
        if (playerById.isPresent()) {
            playerService.updatePlayer(playerById.get(), playerDto);
        } else {
            playerService.createPlayer(playerDto, user.getClubTeam());
        }
    }
}
