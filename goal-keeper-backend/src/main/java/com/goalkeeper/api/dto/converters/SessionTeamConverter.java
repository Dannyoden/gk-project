package com.goalkeeper.api.dto.converters;

import com.goalkeeper.api.domain.SessionTeam;
import com.goalkeeper.api.dto.SessionTeamDto;
import com.goalkeeper.api.dto.SessionTeamResultDto;
import com.goalkeeper.api.service.impl.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class SessionTeamConverter implements Converter<SessionTeam, SessionTeamDto> {

    private final PlayerConverter playerConverter;
    private final PlayerService playerService;

    @Autowired
    public SessionTeamConverter(PlayerConverter playerConverter, PlayerService playerService) {
        this.playerConverter = playerConverter;
        this.playerService = playerService;
    }

    @Override
    public SessionTeamDto convert(SessionTeam sessionTeam) {
        return SessionTeamDto.builder()
                .publicId(sessionTeam.getPublicId())
                .players(sessionTeam.getPlayers()
                        .stream()
                        .map(playerConverter::convert)
                        .collect(Collectors.toSet()))
                .build();
    }

    public SessionTeam toEntity(SessionTeamDto sessionTeamDto) {
        return SessionTeam.builder()
                .publicId(UUID.randomUUID())
                .players(sessionTeamDto.getPlayers().stream()
                        .map(playerDto -> playerService.findPlayerById(playerDto.getId())
                                .orElseThrow(RuntimeException::new)).collect(Collectors.toSet()))
                .build();
    }

}
