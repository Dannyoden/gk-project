package com.goalkeeper.api.domain;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "clubTeam")
@ToString
@Entity
public class Player extends AbstractEntity {

    public enum Position {
        GOALKEEPER, DEFENDER, MIDFIELDER, STRIKER
    }

    public enum PreferredFoot {
        LEFT, RIGHT, BOTH
    }

    @Column(name = "given_name", nullable = false, length = 50)
    private String givenName;

    @Column(name = "sur_name", nullable = false, length = 50)
    private String surname;

    @Column(name = "shirt_number", nullable = false)
    private Integer shirtNumber;

    @Column(name = "position", nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private Position position;

    @Enumerated(EnumType.STRING)
    @Column(name = "preferred_foot")
    private PreferredFoot preferredFoot;

    @ToString.Exclude
    @Column(name = "date_of_birth")
    private LocalDateTime dateOfBirth;

    @ManyToOne
    @JoinColumn(name = "club_team_id", referencedColumnName = "id", nullable = false)
    private ClubTeam clubTeam;

    @Column(name = "is_active", nullable = false)
    private Boolean active = true;

}
