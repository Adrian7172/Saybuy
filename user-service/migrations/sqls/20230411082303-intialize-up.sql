/* Replace with your SQL commands */
CREATE TABLE "users"(
    "user_id" BIGSERIAL PRIMARY KEY, 
    "email" VARCHAR UNIQUE NOT NULL, 
    "phone_number" VARCHAR NOT NULL, 
    "password" VARCHAR NOT NULL, 
    "salt" VARCHAR NOT NULL, 
    "user_type" VARCHAR NOT NULL, 
    "first_name" VARCHAR, 
    "last_name" VARCHAR, 
    "profile_pic" text,
    "date_of_birth" TIMESTAMPTZ, 
    "age" INT, 
    "gender" VARCHAR, 
    "verification_code"  INTEGER,
    "expiry" TIMESTAMPTZ,
    "is_verified" BOOLEAN NOT NULL DEFAULT (FALSE),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT (now())
);


CREATE INDEX ON "users"("phone_number");