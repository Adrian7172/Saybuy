/* Replace with your SQL commands */
CREATE TABLE "address"(
    "address_id" BIGSERIAL PRIMARY KEY,
    "user_id"  BIGINT NOT NULL,
    "address_line1" TEXT,
    "address_line2" TEXT,
    "postal_code" INTEGER,
    "city" VARCHAR,
    "state" VARCHAR,
    "country" VARCHAR,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT (now())
);

/* set indexes */
CREATE INDEX ON "address"("city");
CREATE INDEX ON "address"("postal_code");
CREATE INDEX ON "address"("state");
CREATE INDEX ON "address"("country");

/* added foreign key */
ALTER TABLE "address" ADD FOREIGN KEY ("user_id")  REFERENCES "users"("user_id"); 