package com.goalkeeper.api.domain;

import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.apache.commons.lang3.time.DateUtils;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;

@Data
@SuperBuilder
@Entity
@Table(name = "reset_token")
public class ResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String token;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    private Date expiryDate;

    public ResetToken(final String token, final User user) {
        this.token = token;
        this.user = user;
        expiryDate = DateUtils.addHours(Calendar.getInstance().getTime(), 24);

    }

    public ResetToken() {

    }
}
