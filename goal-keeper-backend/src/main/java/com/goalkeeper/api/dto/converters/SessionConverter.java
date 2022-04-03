package com.goalkeeper.api.dto.converters;

import com.goalkeeper.api.domain.Session;
import com.goalkeeper.api.domain.User;
import com.goalkeeper.api.dto.SessionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class SessionConverter implements Converter<Session, SessionDto> {

    private final SessionTeamConverter sessionTeamConverter;
    private final SessionTeamResultConverter sessionTeamResultConverter;

    @Autowired
    public SessionConverter(SessionTeamConverter sessionTeamConverter, SessionTeamResultConverter sessionTeamResultConverter) {
        this.sessionTeamConverter = sessionTeamConverter;
        this.sessionTeamResultConverter = sessionTeamResultConverter;
    }

    @Override
    public SessionDto convert(Session session) {
        return SessionDto.builder()
                .publicId(session.getPublicId())
                .name(session.getName())
                .durationInMinutes(session.getDurationInMinutes())
                .teamResults(session.getTeamResults()
                        .stream()
                        .map(tr -> sessionTeamResultConverter.convert(tr))
                        .collect(Collectors.toList()))
                .start(session.getStart())
                .build();
    }

    public Session toNewEntity(SessionDto sessionDto, User user) {
        Session newSession = Session.builder()
                .publicId(UUID.randomUUID())
                .durationInMinutes(sessionDto.getDurationInMinutes())
                .clubTeam(user.getClubTeam())
                .teamResults(sessionDto.getTeamResults()
                        .stream()
                        .map(tr -> sessionTeamResultConverter.toNewEntity(tr))
                        .collect(Collectors.toList()))
                .start(sessionDto.getStart())
                .createdAt(LocalDateTime.now())
                .createdBy(user.getId())
                .build();
        return newSession;
    }
}
