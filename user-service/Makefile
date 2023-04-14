start_db:
	docker-compose up -d
stop_db:
	docker-compose down
migrate-up: 
	db-migrate up
migrate-down: 
	db-migrate down
create-migrate: 
	db-migrate create $(n) --sql-file
server:
	npm run dev


.PHONY: start_db stop_db server migrate-up migrate-down create-migrate
