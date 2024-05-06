CREATE TABLE tasklion_user
(
    id       VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    email    VARCHAR(255),
    password VARCHAR(255),
    CONSTRAINT pk_tasklion_user PRIMARY KEY (id)
);