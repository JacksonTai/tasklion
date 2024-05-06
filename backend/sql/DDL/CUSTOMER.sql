CREATE TABLE customer
(
    id                  VARCHAR(255) NOT NULL,
    personal_details_id BIGINT,
    CONSTRAINT pk_customer PRIMARY KEY (id)
);

ALTER TABLE customer
    ADD CONSTRAINT uc_customer_personal_details UNIQUE (personal_details_id);

ALTER TABLE customer
    ADD CONSTRAINT FK_CUSTOMER_ON_ID FOREIGN KEY (id) REFERENCES tasklion_user (id);

ALTER TABLE customer
    ADD CONSTRAINT FK_CUSTOMER_ON_PERSONAL_DETAILS FOREIGN KEY (personal_details_id) REFERENCES personal_detail (id);