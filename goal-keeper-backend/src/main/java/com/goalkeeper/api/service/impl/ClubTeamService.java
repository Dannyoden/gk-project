package com.goalkeeper.api.service.impl;

import com.goalkeeper.api.domain.ClubTeam;
import com.goalkeeper.api.domain.Player;
import com.goalkeeper.api.domain.User;
import com.goalkeeper.api.dto.ClubTeamDto;
import com.goalkeeper.api.dto.PlayerDto;
import com.goalkeeper.api.dto.converters.PlayerConverter;
import com.goalkeeper.api.repository.ClubTeamRepository;
import com.goalkeeper.api.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ClubTeamService {

    private ClubTeamRepository clubTeamRepository;
    private PlayerConverter conversionService;
    private PlayerRepository playerRepository;
    private UserService userService;

    @Autowired
    public ClubTeamService(ClubTeamRepository clubTeamRepository, PlayerConverter conversionService, PlayerRepository playerRepository, UserService userService) {
        this.clubTeamRepository = clubTeamRepository;
        this.conversionService = conversionService;
        this.playerRepository = playerRepository;
        this.userService = userService;
    }

    public Optional<ClubTeam> findByManager(Long userId) {
        return clubTeamRepository.findClubTeamByManagers(userId);
    }

    @Transactional
    public ClubTeam createClubTeam(ClubTeamDto clubTeamDTO, User user) {
        ClubTeam clubTeam = ClubTeam.builder()
                .name(clubTeamDTO.getName())
                .competition(clubTeamDTO.getCompetition())
                .country(clubTeamDTO.getCountry())
                .publicId(UUID.randomUUID())
                .managers(new HashSet<>(Arrays.asList(user)))
                .build();
        return clubTeamRepository.save(clubTeam);
    }

    @Transactional
    public void updateClubTeam(ClubTeamDto update, User user) {
        if (user.getClubTeam() != null) {
            ClubTeam existingTeam = user.getClubTeam();
            existingTeam.setName(update.getName());
            existingTeam.setCompetition(update.getCompetition());
            existingTeam.setCountry(update.getCountry());
            clubTeamRepository.save(existingTeam);
        }
    }
}
