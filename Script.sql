CREATE TABLE users (
    id 			        bigserial 	NOT NULL,
    email               text 	    NOT NULL,
    name                text 	    NOT NULL,
    metadata            jsonb 	    NULL,
    CONSTRAINT pk_users PRIMARY KEY (id)
);
