start_db:
	docker-compose up -d
stop_db:
	docker-compose down
migrate-up: 
	db-migrate up
migrate-down: 
	db-migrate down
server:
	npm run dev


.PHONY: start_db stop_db server migrate-up migrate-down
