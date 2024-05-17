CREATE TABLE service
(
    id          VARCHAR(255) NOT NULL,
    tasker_id   VARCHAR(255),
    title       VARCHAR(255),
    description VARCHAR(255),
    CONSTRAINT pk_service PRIMARY KEY (id)
);

ALTER TABLE service
    ADD CONSTRAINT FK_SERVICE_ON_TASKER FOREIGN KEY (tasker_id) REFERENCES tasker (id);