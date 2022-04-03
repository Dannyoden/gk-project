package com.goalkeeper.api.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sessions")
public class Session extends AbstractAuditedEntity {

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @ToString.Exclude
    @OneToMany(mappedBy = "session", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<SessionTeamResult> teamResults;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationInMinutes;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime start;

    @ManyToOne
    @JoinColumn(name = "club_team_id", referencedColumnName = "id")
    private ClubTeam clubTeam;

}
