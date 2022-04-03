package com.goalkeeper.api.dto.converters;

import com.goalkeeper.api.controller.DashboardController;
import com.goalkeeper.api.domain.Player;
import com.goalkeeper.api.domain.SessionTeamResult;
import com.goalkeeper.api.dto.PlayerDataDto;
import com.goalkeeper.api.service.impl.SessionTeamResultService;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class PlayerDataConverter implements Converter<Player, PlayerDataDto> {

    Logger logger = LoggerFactory.getLogger(PlayerDataConverter.class);
    private final SessionTeamResultService sessionTeamResultService;

    @Autowired
    public PlayerDataConverter(SessionTeamResultService sessionTeamResultService) {
        this.sessionTeamResultService = sessionTeamResultService;
    }

    @Override
    public PlayerDataDto convert(Player player) {
        return PlayerDataDto.builder()
                .fullName(player.getGivenName() + " " + player.getSurname())
                .position(player.getPosition().toString())
                .shirtNumber(player.getShirtNumber())
                .id(player.getPublicId())
                .build();
    }

    public List<PlayerDataDto> convertResults(Set<Player> players, Set<SessionTeamResult> sessionTeamResults) {
        List<PlayerDataDto> playerDataDtos = new ArrayList<>();
        players.forEach(p -> {
            List<SessionTeamResult> results = sessionTeamResults.stream().filter(str -> str.getSessionTeam().getPlayers().contains(p)).collect(Collectors.toList());
            PlayerDataDto playerData = convert(p);
            if (playerData != null) {
                playerData.setTotalSessions(results.size());
                if (results.size() == 0) {
                    playerData.setLossPercentage(0 + "%");
                    playerData.setWinPercentage(0 + "%");
                    playerData.setTiePercentage(0 + "%");
                } else {
                    List<Integer> sessionResultPercentages = sessionTeamResultService.getSessionResultPercentages(results);
                    playerData.setWinPercentage(sessionResultPercentages.get(1) + "%");
                    playerData.setLossPercentage(sessionResultPercentages.get(0) + "%");
                    playerData.setTiePercentage(sessionResultPercentages.get(2) + "%");
                }
                playerData.setTotalGoals(sessionTeamResultService.getTotalGoals(results, p));
                playerDataDtos.add(playerData);
            }
        });
        playerDataDtos.sort(Comparator.comparing(PlayerDataDto::getShirtNumber));
        return playerDataDtos;
    }


    private boolean isOneHundredPercentage(int lossPercentage, int winPercentage, int tiePercentage ) {
        return lossPercentage + winPercentage + tiePercentage == 100;
    }
}
