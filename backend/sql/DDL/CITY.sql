CREATE TABLE city
(
    id       BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name     VARCHAR(255)                            NOT NULL,
    state_id BIGINT                                  NOT NULL,
    CONSTRAINT pk_city PRIMARY KEY (id)
);

ALTER TABLE city
    ADD CONSTRAINT uc_city_name UNIQUE (name);

ALTER TABLE city
    ADD CONSTRAINT FK_CITY_ON_STATE FOREIGN KEY (state_id) REFERENCES state (id);