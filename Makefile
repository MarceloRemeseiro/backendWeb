# Define el shell para los comandos
SHELL := /bin/bash

# Ayuda
help: ## Show this help message
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

# Iniciar contenedores
start: ## Start containers
	docker-compose up -d

# Detener contenedores
stop: ## Stop containers
	docker-compose stop

# Reiniciar contenedores
restart: ## Restart containers
	$(MAKE) stop && $(MAKE) start

# Acceder al contenedor de la aplicación
api: ## Access the app container
	docker exec -ti $$(docker ps -qf "name=app") bash

# Acceder al contenedor de la base de datos
db: ## Access the database container
	docker exec -ti $$(docker ps -qf "name=database") bash
