package com.goalkeeper.api.repository;

import com.goalkeeper.api.domain.ClubTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClubTeamRepository extends JpaRepository<ClubTeam, Long> {

    Optional<ClubTeam> findClubTeamByManagers(Long userId);

}
