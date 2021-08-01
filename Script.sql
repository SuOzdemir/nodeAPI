CREATE TABLE users (
    id 			        bigserial 	NOT NULL,
    email               text 	    NOT NULL,
    name                text 	    NOT NULL,
    metadata            jsonb 	    NULL,
    CONSTRAINT pk_users PRIMARY KEY (id)
);


CREATE TABLE  IF NOT EXISTS  books  (
    id 			        bigint 	NOT NULL,
    name                text 	    NOT NULL,
    author_name         text 	    NOT NULL,
    category            text 	    NOT NULL,
    CONSTRAINT pk_books PRIMARY KEY (id)
);
