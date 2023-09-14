#!/bin/bash

help: ## Show this help message
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

start: ## Start containers
	docker compose up

stop: ## Stop containers
	docker compose stop

restart: ## Restart containers
	"$(MAKE)" stop && "$(MAKE)" start

api: 
	docker exec -ti eevm-api bash

