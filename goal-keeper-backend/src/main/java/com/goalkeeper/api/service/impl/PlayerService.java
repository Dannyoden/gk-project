package com.goalkeeper.api.service.impl;

import com.goalkeeper.api.domain.ClubTeam;
import com.goalkeeper.api.domain.Player;
import com.goalkeeper.api.dto.PlayerDto;
import com.goalkeeper.api.dto.converters.PlayerConverter;
import com.goalkeeper.api.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class PlayerService {
    private final List<Player.Position> POSITIONS = Arrays.asList(Player.Position.DEFENDER,
            Player.Position.MIDFIELDER, Player.Position.STRIKER, Player.Position.GOALKEEPER);

    private final List<Player.PreferredFoot> PREFFERED_FEET = Arrays.asList(Player.PreferredFoot.BOTH,
            Player.PreferredFoot.LEFT, Player.PreferredFoot.RIGHT);

    private final PlayerRepository playerRepository;
    private final PlayerConverter playerConverter;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Autowired
    public PlayerService(PlayerRepository playerRepository, PlayerConverter playerConverter) {
        this.playerRepository = playerRepository;
        this.playerConverter = playerConverter;
    }

    public Optional<Player> findPlayerById(UUID id) {
        return playerRepository.findPlayerByPublicId(id);
    }

    //soft delete
    public void removePlayer(Player player) {
        player.setActive(false);
        playerRepository.save(player);
    }

    @Transactional
    public void updatePlayer(Player player, PlayerDto playerDto) {
        player.setGivenName(playerDto.getGivenName());
        player.setSurname(playerDto.getSurname());
        player.setPosition(Player.Position.valueOf(playerDto.getPosition()));
        player.setShirtNumber(playerDto.getShirtNumber());
        player.setPreferredFoot(Player.PreferredFoot.valueOf(playerDto.getPreferredFoot()));
        player.setDateOfBirth(playerDto.getDateOfBirth());
        playerRepository.save(player);
    }

    @Transactional
    public void createPlayer(PlayerDto playerDto, ClubTeam clubTeam) {
        Player player = playerConverter.toEntity(playerDto);
        player.setClubTeam(clubTeam);
        player.setActive(true);
        player.setPublicId(UUID.randomUUID());
        playerRepository.save(player);
    }
}
