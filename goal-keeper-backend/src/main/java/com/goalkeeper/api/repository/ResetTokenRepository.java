package com.goalkeeper.api.repository;

import com.goalkeeper.api.domain.ResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResetTokenRepository extends JpaRepository<ResetToken, Long> {

    ResetToken findByToken(String token);
}
