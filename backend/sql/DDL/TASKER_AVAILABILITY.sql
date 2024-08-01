CREATE TABLE tasker_availability
(
    id                          BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    date                        date                                    NOT NULL,
    tasker_time_availability_id BIGINT                                  NOT NULL,
    status                      VARCHAR(255)                            NOT NULL,
    CONSTRAINT pk_tasker_availability PRIMARY KEY (id)
);

ALTER TABLE tasker_availability
    ADD CONSTRAINT FK_TASKER_AVAILABILITY_ON_TASKER_TIME_AVAILABILITY FOREIGN KEY (tasker_time_availability_id) REFERENCES tasker_time_availability (id);