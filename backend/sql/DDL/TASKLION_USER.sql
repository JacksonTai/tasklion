CREATE TABLE tasklion_user
(
    id         VARCHAR(255) NOT NULL,
    dtype      VARCHAR(31),
    email      VARCHAR(255),
    password   VARCHAR(255),
    role       VARCHAR(255),
    first_name VARCHAR(255),
    last_name  VARCHAR(255),
    address_id BIGINT,
    CONSTRAINT pk_tasklion_user PRIMARY KEY (id)
);

ALTER TABLE tasklion_user
    ADD CONSTRAINT uc_tasklion_user_address UNIQUE (address_id);

ALTER TABLE tasklion_user
    ADD CONSTRAINT FK_TASKLION_USER_ON_ADDRESS FOREIGN KEY (address_id) REFERENCES address (id);