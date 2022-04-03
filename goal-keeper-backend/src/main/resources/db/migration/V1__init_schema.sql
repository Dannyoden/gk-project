create table clubteam
(
    id          bigserial   not null
        constraint clubteam_pkey
            primary key,
    public_id   uuid,
    version     integer     not null,
    competition varchar(255),
    country     varchar(255),
    team        varchar(50) not null
);

create table player
(
    id             bigserial   not null
        constraint player_pkey
            primary key,
    public_id      uuid,
    version        integer     not null,
    is_active      boolean     not null,
    date_of_birth  timestamp,
    given_name     varchar(50) not null,
    position       varchar(50) not null,
    preferred_foot varchar(255),
    shirt_number   integer     not null,
    sur_name       varchar(50) not null,
    club_team_id   bigint      not null
        constraint fkr6dju8vnkn8tpan6d93110wfr
            references clubteam
);

create table roles
(
    id   serial not null
        constraint roles_pkey
            primary key,
    name varchar(20)
);

create table sessions
(
    id               bigserial   not null
        constraint sessions_pkey
            primary key,
    public_id        uuid,
    version          integer     not null,
    created_at       timestamp   not null,
    created_by       bigint      not null,
    updated_at       timestamp,
    updated_by       bigint,
    duration_minutes integer     not null,
    name             varchar(50) not null,
    start_date       timestamp   not null,
    club_team_id     bigint
        constraint fk9fxos7c7rcjg7jbn4on9x9tk1
            references clubteam
);

create table session_team
(
    id        bigserial not null
        constraint session_team_pkey
            primary key,
    public_id uuid,
    version   integer   not null
);

create table session_team_player
(
    session_team_id bigint not null
        constraint fkqsw5lwf6ooyy3b1rvix6idenm
            references session_team,
    player_id       bigint not null
        constraint fkt6t2knu9j4tk26tylglvmshc9
            references player,
    constraint session_team_player_pkey
        primary key (session_team_id, player_id)
);

create table session_team_result
(
    id              bigserial not null
        constraint session_team_result_pkey
            primary key,
    public_id       uuid,
    version         integer   not null,
    session_result  varchar(255),
    session_id      bigint    not null
        constraint fkkrcegngi39mj4nlxo5430yp9l
            references sessions,
    session_team_id bigint
        constraint fkefvlddwd3gk28j4nf6wuxby3b
            references session_team
);

create table session_players_scored
(
    session_team_result_id bigint not null
        constraint fk7yk958ljpwlle8o5crlimmmbc
            references session_team_result,
    player_id              bigint not null
        constraint fkd65j013oitgkxwbphk383yc45
            references player
);

create table users
(
    id           bigserial    not null
        constraint users_pkey
            primary key,
    public_id    uuid,
    version      integer      not null,
    birth_date   date,
    email        varchar(255) not null
        constraint uk6dotkott2kjsp8vw4d0m25fb7
            unique,
    first_name   varchar(50),
    last_name    varchar(50),
    password     varchar(100) not null,
    user_name    varchar(100) not null
        constraint ukk8d0f2n7n88w1a16yhua64onx
            unique,
    club_team_id bigint
        constraint fk4vxd48qwyv1cads7i9yibkj64
            references clubteam
);

create table reset_token
(
    id          bigint not null
        constraint reset_token_pkey
            primary key,
    expiry_date timestamp,
    token       varchar(255),
    user_id     bigint not null
        constraint fk4vxwjrcj8j479hf5iehw6qnaa
            references users
);

create table users_roles
(
    user_id bigint  not null
        constraint fk2o0jvgh89lemvvo17cbqvdxaa
            references users,
    role_id integer not null
        constraint fkj6m8fwv7oqv74fcehir1a9ffy
            references roles,
    constraint users_roles_pkey
        primary key (user_id, role_id)
);


INSERT INTO roles values
(1, 'ROLE_USER'),
(2, 'ROLE_ADMIN')
ON CONFLICT DO NOTHING;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
