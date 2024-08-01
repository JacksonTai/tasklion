CREATE TABLE tasklion_account
(
    id       VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    email    VARCHAR(255),
    password VARCHAR(255),
    status   VARCHAR(50),
    CONSTRAINT pk_tasklion_account PRIMARY KEY (id)
);