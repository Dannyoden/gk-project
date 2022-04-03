package com.goalkeeper.api.repository;

import com.goalkeeper.api.domain.SessionTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionTeamRepository extends JpaRepository<SessionTeam, Long> {
}
