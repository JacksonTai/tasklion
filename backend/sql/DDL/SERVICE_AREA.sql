CREATE TABLE service_area
(
    id        BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    city      VARCHAR(30),
    state     VARCHAR(20),
    postcode  VARCHAR(5),
    tasker_id UUID,
    CONSTRAINT pk_service_area PRIMARY KEY (id)
);

ALTER TABLE service_area
    ADD CONSTRAINT FK_SERVICE_AREA_ON_TASKER FOREIGN KEY (tasker_id) REFERENCES tasker (id);