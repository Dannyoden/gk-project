package com.goalkeeper.api.service.impl;

import com.goalkeeper.api.domain.ClubTeam;
import com.goalkeeper.api.domain.Session;
import com.goalkeeper.api.domain.SessionTeam;
import com.goalkeeper.api.domain.SessionTeamResult;
import com.goalkeeper.api.dto.SessionDto;
import com.goalkeeper.api.dto.SessionTeamDto;
import com.goalkeeper.api.dto.SessionTeamResultDto;
import com.goalkeeper.api.exceptions.EntityNotFoundException;
import com.goalkeeper.api.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final PlayerService playerService;

    public final static String AVG_SESSIONS = "avgSessions";
    public final static String SESSIONS_PLANNED = "sessionsPlanned";
    public final static String TEAM_NAME = "teamName";
    public final static String TOTAL_SESSIONS = "totalSessions";
    public final static String SESSIONS_3_WEEKS = "sessions3WeeksAgo";
    public final static String SESSIONS_2_WEEKS = "sessions2WeeksAgo";
    public final static String SESSIONS_1_WEEKS = "sessions1WeeksAgo";
    public final static String SESSIONS_THIS_WEEK = "sessionsThisWeek";

    @Autowired
    public SessionService(SessionRepository sessionRepository, PlayerService playerService) {
        this.sessionRepository = sessionRepository;
        this.playerService = playerService;
    }

    @Transactional
    public void createSession(Session session) {
//        session.getTeams().forEach(team -> team.setSession(session));
//        session.getTeams().forEach(team -> team.getResult().setTeam(team));
        sessionRepository.save(session);
    }

    public List<Session> findSessionsClubTeam(ClubTeam clubTeam) {
        return sessionRepository.findSessionsByClubTeam(clubTeam);
    }

    public Optional<Session> findSessionByPublicId(UUID publicId) {
        return sessionRepository.findSessionByPublicId(publicId);
    }

    public void updateSession(Session session, SessionDto sessionDto) {
        session.setName(sessionDto.getName());
        session.setDurationInMinutes(sessionDto.getDurationInMinutes());

        //update team
        session.getTeamResults().stream()
                .forEach(tr -> updateTeam(tr.getSessionTeam(), sessionDto.getTeamResults()
                        .stream().map(t -> t.getSessionTeam()).collect(Collectors.toList())));

        //update results
        session.getTeamResults().stream().forEach(s -> updateResults(s, sessionDto.getTeamResults()));
        sessionRepository.save(session);
    }

    private void updateTeam(SessionTeam sessionTeam, List<SessionTeamDto> sessionTeamDtos) {
        SessionTeamDto matchingSessionTeamDto = sessionTeamDtos
                .stream()
                .filter(sessionTeamDto -> sessionTeamDto.getPublicId().equals(sessionTeam.getPublicId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Couldn't find a matching sessionTeam"));

        sessionTeam.setPlayers(matchingSessionTeamDto.getPlayers()
                .stream()
                .map(playerDto -> playerService.findPlayerById(playerDto.getId())
                        .orElseThrow(RuntimeException::new))
                .collect(Collectors.toSet()));
    }

    private void updateResults(SessionTeamResult sessionTeamResult, List<SessionTeamResultDto> sessionTeamResultDtos) {
        SessionTeamResultDto dto = sessionTeamResultDtos.stream()
                .filter(str -> str.getPublicId().equals(sessionTeamResult.getPublicId()))
                .findFirst().orElseThrow(() -> new EntityNotFoundException("no sessiondto match found"));

        sessionTeamResult.setResult(dto.getResult());
        sessionTeamResult.setPlayersScored(dto.getPlayersScored()
                .stream()
                .map(playerDto -> playerService.findPlayerById(playerDto.getId())
                        .orElseThrow(() -> new RuntimeException("The given playerDto UUID is not present in the database")))
                .collect(Collectors.toList()));
    }

    public Map<String, Object> computeSummary(ClubTeam clubTeam) {
        Map<String, Object> summary = new HashMap<>();
        List<Object> countDate = sessionRepository.getSessionDateAndCount(clubTeam);
        List<Session> sessions = sessionRepository.findSessionByClubTeamAndStartAfter(clubTeam, LocalDateTime.now().minusMonths(1));

        Object[] results = (Object[]) countDate.get(0);
        BigInteger totalSessions = results[0] != null ? (BigInteger) results[0] : BigInteger.ZERO;
        Timestamp firstSession = results[1] != null ? (Timestamp) results[1] : null;

        //compute & add values
        summary.put(TEAM_NAME, clubTeam.getName());
        summary.put(TOTAL_SESSIONS, totalSessions.intValue());
        summary.put(AVG_SESSIONS, computeSessionAverage(totalSessions.doubleValue(), firstSession.toLocalDateTime()));
        summary.put(SESSIONS_3_WEEKS, computeSessionsPerWeek(sessions, LocalDateTime.now().minusWeeks(4)));
        summary.put(SESSIONS_2_WEEKS, computeSessionsPerWeek(sessions, LocalDateTime.now().minusWeeks(3)));
        summary.put(SESSIONS_1_WEEKS, computeSessionsPerWeek(sessions, LocalDateTime.now().minusWeeks(2)));
        summary.put(SESSIONS_THIS_WEEK, computeSessionsPerWeek(sessions, LocalDateTime.now().minusWeeks(1)));
        summary.put(SESSIONS_PLANNED, computeSessionsPerWeek(sessions, LocalDateTime.now()));
        return summary;
    }

    private Object computeSessionsPerWeek(List<Session> sessions, LocalDateTime date) {
        return sessions.stream().filter(s -> s.getStart().isAfter(date)
                && s.getStart().isBefore(date.plusWeeks(1))).count();
    }

    private Double computeSessionAverage(Double totalSessions, LocalDateTime firstSession) {
        if (firstSession != null && totalSessions != null) {
            double weeks = ChronoUnit.WEEKS.between(firstSession, LocalDateTime.now());
            if (weeks == 0 && totalSessions > 0) {
                return totalSessions;
            } else if (weeks == 0 && totalSessions == 0) {
                return 0d;
            } else {
                return (double) Math.round((totalSessions/weeks * 10)) / 10;
            }
        } else {
            return 0d;
        }
    }

}
