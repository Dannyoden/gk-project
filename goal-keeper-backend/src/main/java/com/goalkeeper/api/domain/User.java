package com.goalkeeper.api.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "user_name"),
                @UniqueConstraint(columnNames = "email") })
public class User extends AbstractEntity {

    @Column(name = "first_name", length = 50)
    private String firstName;

    @Column(name = "last_name", length = 50)
    private String lastName;

    @NotBlank
    @Column(name = "user_name",  nullable = false, length = 100)
    private String username;

    @NotBlank
    @Column(name = "password",  nullable = false, length = 100)
    private String password;

    @Email
    @NotBlank
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "birth_date")
    private LocalDate birthday;

    @ManyToOne
    @JoinColumn(name = "club_team_id", referencedColumnName = "id")
    private ClubTeam clubTeam;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

}
