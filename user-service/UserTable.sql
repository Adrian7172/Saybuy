CREATE TABLE "users"(
    "user_id" BIGSERIAL PRIMARY KEY, 
    "email" VARCHAR NOT NULL, 
    "phone_number" VARCHAR NOT NULL, 
    "password" VARCHAR NOT NULL, 
    "salt" VARCHAR NOT NULL, 
    "user_type" VARCHAR NOT NULL, 
    "first_name" VARCHAR NOT NULL, 
    "last_name" VARCHAR NOT NULL, 
    "date_of_birth" TIMESTAMPTZ NOT NULL, 
    "age" INT NOT NULL, 
    "gender" VARCHAR NOT NULL, 
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT (now())
)