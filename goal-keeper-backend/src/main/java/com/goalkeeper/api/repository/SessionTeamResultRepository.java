package com.goalkeeper.api.repository;

import com.goalkeeper.api.domain.Player;
import com.goalkeeper.api.domain.SessionTeamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface SessionTeamResultRepository extends JpaRepository<SessionTeamResult, Long> {

//    @Query(value = "SELECT DISTINCT * FROM session_team_result str " +
//            "JOIN session_team s ON s.id = str.session_team_id " +
//            "JOIN session_team_player stp on s.id = stp.session_team_id " +
//            "WHERE stp.player_id IN ?1 " +
//            "AND str.session_result NOT LIKE 'NOT_PLAYED'", nativeQuery = true)
//    Set<SessionTeamResult> findAllByPlayers(Set<Player> players, List<SessionTeamResult.SessionResult> status);


}
