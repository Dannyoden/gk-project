package com.goalkeeper.api.controller;

import com.goalkeeper.api.config.security.annotation.CurrentUser;
import com.goalkeeper.api.domain.*;
import com.goalkeeper.api.dto.PlayerDataDto;
import com.goalkeeper.api.dto.TeamSummaryDataDto;
import com.goalkeeper.api.dto.converters.PlayerDataConverter;
import com.goalkeeper.api.dto.converters.TeamSummaryConverter;
import com.goalkeeper.api.service.impl.ClubTeamService;
import com.goalkeeper.api.service.impl.SessionService;
import com.goalkeeper.api.service.impl.SessionTeamResultService;
import com.goalkeeper.api.service.impl.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/dashboard")
public class DashboardController {

    Logger logger = LoggerFactory.getLogger(DashboardController.class);

    private ClubTeamService clubTeamService;
    private UserService userService;
    private SessionService sessionService;
    private SessionTeamResultService sessionTeamResultService;
    private PlayerDataConverter playerDataConverter;
    private TeamSummaryConverter teamSummaryConverter;

    @Autowired
    public DashboardController(ClubTeamService clubTeamService, UserService userService, SessionTeamResultService sessionTeamResultService,
                               PlayerDataConverter playerDataConverter, SessionService sessionService, TeamSummaryConverter teamSummaryConverter) {
        this.clubTeamService = clubTeamService;
        this.userService = userService;
        this.sessionTeamResultService = sessionTeamResultService;
        this.playerDataConverter = playerDataConverter;
        this.sessionService = sessionService;
        this.teamSummaryConverter = teamSummaryConverter;
    }

    @GetMapping(value = "/overview")
    public List<PlayerDataDto> getTeamOverviewData(@CurrentUser User user) {
        Set<Player> activePlayers = user.getClubTeam().getPlayers().stream().filter(p -> p.getActive()).collect(Collectors.toSet());
        Set<SessionTeamResult> sessionTeamResults = sessionTeamResultService.getSessionTeamResults(activePlayers);
        return playerDataConverter.convertResults(activePlayers, sessionTeamResults);
    }

    @GetMapping(value = "/summary")
    public TeamSummaryDataDto getTeamSummaryData(@CurrentUser User user) {
        Map<String, Object> results = sessionService.computeSummary(user.getClubTeam());
        return teamSummaryConverter.convert(results);
    }

}
