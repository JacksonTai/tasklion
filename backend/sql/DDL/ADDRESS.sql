CREATE TABLE address
(
    id           BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    address_line VARCHAR(255),
    city         VARCHAR(30),
    state        VARCHAR(20),
    postcode     VARCHAR(5),
    CONSTRAINT pk_address PRIMARY KEY (id)
);