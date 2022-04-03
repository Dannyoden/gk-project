package com.goalkeeper.api.dto.converters;

import com.goalkeeper.api.domain.Player;
import com.goalkeeper.api.domain.SessionTeamResult;
import com.goalkeeper.api.dto.PlayerDto;
import com.goalkeeper.api.dto.SessionTeamResultDto;
import com.goalkeeper.api.service.impl.PlayerService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class SessionTeamResultConverter implements Converter<SessionTeamResult, SessionTeamResultDto> {

    private final PlayerConverter playerConverter;
    private final PlayerService playerService;
    private final SessionTeamConverter sessionTeamConverter;

    public SessionTeamResultConverter(PlayerConverter playerConverter, PlayerService playerService, SessionTeamConverter sessionTeamConverter) {
        this.playerConverter = playerConverter;
        this.playerService = playerService;
        this.sessionTeamConverter = sessionTeamConverter;
    }

    @Override
    public SessionTeamResultDto convert(SessionTeamResult sessionTeamResult) {
        return SessionTeamResultDto.builder()
                .publicId(sessionTeamResult.getPublicId())
                .playersScored(convertPlayerToPlayerDtoOrReturnEmptyList(sessionTeamResult.getPlayersScored()))
                .sessionTeam(sessionTeamConverter.convert(sessionTeamResult.getSessionTeam()))
                .result(sessionTeamResult.getResult())
                .build();
    }

    public SessionTeamResult toNewEntity(SessionTeamResultDto sessionTeamResultDto) {
        if(sessionTeamResultDto == null) {
            return null;
        }
        return SessionTeamResult.builder()
                .publicId(UUID.randomUUID())
                .playersScored(Collections.emptyList())
                .result(sessionTeamResultDto.getResult())
                .sessionTeam(sessionTeamConverter.toEntity(sessionTeamResultDto.getSessionTeam()))
                .build();
    }

    private List<PlayerDto> convertPlayerToPlayerDtoOrReturnEmptyList(List<Player> players) {
        return players.isEmpty()
                ? Collections.emptyList()
                : players.stream().map(playerConverter::convert).collect(Collectors.toList());
    }

}
