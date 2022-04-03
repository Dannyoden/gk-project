package com.goalkeeper.api.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
public class SessionTeamResult extends AbstractEntity {

//    public enum TeamOrder {
//        FIRST, SECOND
//    }

    public enum SessionResult {
        WON, LOST, TIE, NOT_PLAYED
    }

    @ManyToOne
    @JoinColumn(name = "session_team_id", referencedColumnName = "id")
    private SessionTeam sessionTeam;

    @ManyToMany
    @JoinTable(
            name = "session_players_scored",
            joinColumns = @JoinColumn(name = "session_team_result_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "player_id", referencedColumnName = "id")
    )
    private List<Player> playersScored;

    @Column(name = "session_result")
    @Enumerated(EnumType.STRING)
    private SessionResult result;

    @ManyToOne
    @JoinColumn(name = "session_id", referencedColumnName = "id")
    private Session session;

}
