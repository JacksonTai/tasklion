CREATE TABLE tasker
(
    id                  UUID NOT NULL,
    creation_date_time  TIMESTAMP WITHOUT TIME ZONE,
    tasklion_account_id VARCHAR(255),
    about_me            VARCHAR(255),
    CONSTRAINT pk_tasker PRIMARY KEY (id)
);

ALTER TABLE tasker
    ADD CONSTRAINT uc_tasker_tasklion_account UNIQUE (tasklion_account_id);

ALTER TABLE tasker
    ADD CONSTRAINT FK_TASKER_ON_TASKLION_ACCOUNT FOREIGN KEY (tasklion_account_id) REFERENCES tasklion_account (id);