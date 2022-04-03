package com.goalkeeper.api.repository;

import com.goalkeeper.api.domain.ClubTeam;
import com.goalkeeper.api.domain.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

//    @Query("SELECT DISTINCT s FROM Session s " +
//            "JOIN SessionTeam st ON st.session.id=s.id " +
//            "JOIN SessionTeamResult str ON str.sessionTeam.id=st.id " +
//            "WHERE s.clubTeam = ?1 AND str.result = 'NOT_PLAYED'")
    List<Session> findSessionsByClubTeam(ClubTeam clubTeam);

    Optional<Session> findSessionByPublicId(UUID publicId);

    @Query(value = "SELECT count(id), min(start_date) FROM sessions\n" +
                    "WHERE club_team_id = ?1", nativeQuery = true)
    List<Object> getSessionDateAndCount(ClubTeam clubTeam);

    List<Session> findSessionByClubTeamAndStartAfter(ClubTeam clubTeam, LocalDateTime after);
}
