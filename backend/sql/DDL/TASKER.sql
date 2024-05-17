CREATE TABLE tasker
(
    id                  VARCHAR(255) NOT NULL,
    personal_details_id BIGINT,
    about_me            VARCHAR(255),
    address_id          BIGINT,
    CONSTRAINT pk_tasker PRIMARY KEY (id)
);

ALTER TABLE tasker
    ADD CONSTRAINT uc_tasker_address UNIQUE (address_id);

ALTER TABLE tasker
    ADD CONSTRAINT uc_tasker_personal_details UNIQUE (personal_details_id);

ALTER TABLE tasker
    ADD CONSTRAINT FK_TASKER_ON_ADDRESS FOREIGN KEY (address_id) REFERENCES address (id);

ALTER TABLE tasker
    ADD CONSTRAINT FK_TASKER_ON_ID FOREIGN KEY (id) REFERENCES tasklion_user (id);

ALTER TABLE tasker
    ADD CONSTRAINT FK_TASKER_ON_PERSONAL_DETAILS FOREIGN KEY (personal_details_id) REFERENCES personal_detail (id);