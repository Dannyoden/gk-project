package com.goalkeeper.api.repository;

import com.goalkeeper.api.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    Optional<Player> findPlayerByPublicId(UUID id);
}
