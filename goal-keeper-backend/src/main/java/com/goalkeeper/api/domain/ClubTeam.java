package com.goalkeeper.api.domain;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode(exclude = {"players", "managers", "sessions"})
@Entity
@Table(name = "clubteam")
public class ClubTeam extends AbstractEntity {

    @NotNull
    @Column(name = "team", nullable = false, length = 50)
    private String name;

    @ToString.Exclude
    @OneToMany(mappedBy = "clubTeam", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private Set<Player> players;

    @Column(name = "competition")
    private String competition;

    @Column(name = "country")
    private String country;

    @ToString.Exclude
    @OneToMany(mappedBy = "clubTeam")
    private Set<User> managers;

    @Lazy
    @ToString.Exclude
    @OneToMany(mappedBy = "clubTeam")
    private Set<Session> sessions;

}
