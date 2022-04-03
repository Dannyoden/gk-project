package com.goalkeeper.api.service.impl;

import com.goalkeeper.api.domain.Player;
import com.goalkeeper.api.domain.SessionTeamResult;
import com.goalkeeper.api.repository.SessionTeamResultRepository;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SessionTeamResultService {

    private final static String WIN = "win";
    private final static String LOSS = "loss";
    private final static String TIE = "tie";

    private SessionTeamResultRepository sessionTeamResultRepository;
    private final List<SessionTeamResult.SessionResult> STATUS_TYPES =
            Arrays.asList(SessionTeamResult.SessionResult.LOST, SessionTeamResult.SessionResult.WON, SessionTeamResult.SessionResult.TIE);

    @Autowired
    public SessionTeamResultService(final SessionTeamResultRepository sessionTeamResultRepository) {
        this.sessionTeamResultRepository = sessionTeamResultRepository;
    }

    public Set<SessionTeamResult> getSessionTeamResults(Set<Player> players){
        return new HashSet<>();
//        return sessionTeamResultRepository.findAllByPlayers(players, STATUS_TYPES);
    }

    public Double calculatePercentage(List<SessionTeamResult> sessionTeamResults, SessionTeamResult.SessionResult sessionResult) {
        double totalSessions = sessionTeamResults.size();
        double count = sessionTeamResults.stream().filter(str -> str.getResult() == sessionResult).count();
        return totalSessions > 0.0 ? count / totalSessions * 100 : 0;
    }

    public Integer getTotalGoals(List<SessionTeamResult> filteredList, Player p) {
        return (int) filteredList.stream().flatMap(f -> f.getPlayersScored().stream()).filter(player -> player.getId().equals(p.getId())).count();

    }

    public List<Integer> getSessionResultPercentages(List<SessionTeamResult> results) {
        double winPercentageInput = calculatePercentage(results, SessionTeamResult.SessionResult.WON);
        double lossPercentageInput = calculatePercentage(results, SessionTeamResult.SessionResult.LOST);
        double tiePercentageInput = calculatePercentage(results, SessionTeamResult.SessionResult.TIE);
        double roundedWinPercentage = Math.floor(winPercentageInput);
        double roundedLossPercentage = Math.floor(lossPercentageInput);
        double roundedTiePercentage = Math.floor(tiePercentageInput);

        if (roundedLossPercentage + roundedWinPercentage + roundedTiePercentage != 100) {
            Double difference = 100 - roundedLossPercentage - roundedWinPercentage - roundedTiePercentage;

            Pair<String, Double> win = Pair.of(WIN, getDecimals(winPercentageInput));
            Pair<String, Double> loss = Pair.of(LOSS, getDecimals(lossPercentageInput));
            Pair<String, Double> tie = Pair.of(TIE, getDecimals(tiePercentageInput));

            //create a sorted list of pairs
            List<Pair<String, Double>> pairs = Arrays.asList(win, loss, tie);
            Collections.sort(pairs, Comparator.comparing(p -> -p.getRight()));

            //collect the number of pairs that need to have a +1 based on difference
            List<Pair<String, Double>> values = pairs.stream()
                    .limit(difference.longValue())
                    .collect(Collectors.toList());

            //for each entry add +1 to the base value
            for (Pair<String, Double> value : values) {
                if (value.getLeft().equals(WIN)) {
                    roundedWinPercentage += 1;
                } else if (value.getLeft().equals(LOSS)) {
                    roundedLossPercentage += 1;
                } else if (value.getLeft().equals(TIE)){
                    roundedTiePercentage += 1;
                }
            }
        }
        return List.of((int)roundedLossPercentage, (int)roundedWinPercentage, (int)roundedTiePercentage);
    }

    private Double getDecimals(Double percentage) {
        BigDecimal bigDecimal = BigDecimal.valueOf(percentage);
        BigDecimal decimals = bigDecimal.subtract(BigDecimal.valueOf(bigDecimal.intValue()));
        return decimals.doubleValue();
    }
}
