CREATE TABLE customer
(
    id                  UUID NOT NULL,
    creation_date_time  TIMESTAMP WITHOUT TIME ZONE,
    tasklion_account_id VARCHAR(255),
    CONSTRAINT pk_customer PRIMARY KEY (id)
);

ALTER TABLE customer
    ADD CONSTRAINT uc_customer_tasklion_account UNIQUE (tasklion_account_id);

ALTER TABLE customer
    ADD CONSTRAINT FK_CUSTOMER_ON_TASKLION_ACCOUNT FOREIGN KEY (tasklion_account_id) REFERENCES tasklion_account (id);