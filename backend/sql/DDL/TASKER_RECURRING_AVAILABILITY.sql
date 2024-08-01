CREATE TABLE tasker_recurring_availability
(
    id                          BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    day_of_week                 VARCHAR(255)                            NOT NULL,
    tasker_time_availability_id BIGINT                                  NOT NULL,
    CONSTRAINT pk_tasker_recurring_availability PRIMARY KEY (id)
);

ALTER TABLE tasker_recurring_availability
    ADD CONSTRAINT FK_TASKER_RECURRING_AVAILABILITY_ON_TASKER_TIME_AVAILABILITY FOREIGN KEY (tasker_time_availability_id) REFERENCES tasker_time_availability (id);