CREATE TABLE personal_detail
(
    id                  BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    full_name           VARCHAR(255),
    phone_number        VARCHAR(255),
    date_of_birth       date,
    tasklion_account_id VARCHAR(255),
    CONSTRAINT pk_personal_detail PRIMARY KEY (id)
);

ALTER TABLE personal_detail
    ADD CONSTRAINT uc_personal_detail_tasklion_account UNIQUE (tasklion_account_id);

ALTER TABLE personal_detail
    ADD CONSTRAINT FK_PERSONAL_DETAIL_ON_TASKLION_ACCOUNT FOREIGN KEY (tasklion_account_id) REFERENCES tasklion_account (id);