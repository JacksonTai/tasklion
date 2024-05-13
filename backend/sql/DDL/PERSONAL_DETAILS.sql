CREATE TABLE personal_detail
(
    id                  BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    full_name           VARCHAR(255),
    phone_number        VARCHAR(255),
    profile_picture_url VARCHAR(255),
    address_id          BIGINT,
    CONSTRAINT pk_personal_detail PRIMARY KEY (id)
);

ALTER TABLE personal_detail
    ADD CONSTRAINT uc_personal_detail_address UNIQUE (address_id);

ALTER TABLE personal_detail
    ADD CONSTRAINT FK_PERSONAL_DETAIL_ON_ADDRESS FOREIGN KEY (address_id) REFERENCES address (id);