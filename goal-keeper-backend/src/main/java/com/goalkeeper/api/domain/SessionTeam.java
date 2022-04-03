package com.goalkeeper.api.domain;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Set;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
public class SessionTeam extends AbstractEntity {

    @ManyToMany
    @JoinTable(
            name = "session_team_player",
            joinColumns = @JoinColumn(name = "session_team_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "player_id", referencedColumnName = "id")
    )
    private Set<Player> players;

}
