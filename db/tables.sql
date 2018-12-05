create table users (
    id serial primary key,
    username varchar,
    email varchar,
    password varchar,
    isAdmin boolean NOT NULL
);

create table posts (
    id serial primary key,
    user_id integer, 
    foreign key (user_id) References users (id),
    content text
);

create table errors (
    id serial primary key,
    user_id integer, 
    foreign key (user_id) References users (id),
    content text
);

create table predictions (
    id serial primary key,
    user_id integer, 
    foreign key (user_id) References users (id),
    team1Prediction integer,
    team2Prediction integer
);