<!-- Roda um docker de name postgres -->
<!-- Cria um usuario e uma senha -->
<!-- Cria um banco de dados chamado heroes -->
<!-- Seleciona a porta no qual ele ficara exposto -->
<!-- -d indica que nao há nada mais a ser executado e o dokcer executara em segundo plano -->
<!-- Por fim indica o nome da imagem -->
<!-- Caso exista a imagem na maquina cria o container, caso nao exista executa um pull -->
docker run \
    --name postgres \
    -e POSTGRES_USER=erickwendel \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

<!-- Mostra os processos de docker que estao rodando na maquina -->
docker ps
<!-- Abre a linha de comando do container que executa o postgres -->
docker exec -it postgres /bin/bash

<!-- Roda uma instancia concorrente chamada adminer -->
<!-- Pelo link tem permissao para acessar o docker postgres -->
<!-- Baixa a imagem do adminer que apresenta uma interface de administracao do docker contendo o banco de dados -->
<!-- Adminer é uma solução acessível via browser para a administração do MySQL e distribuída gratuitamente sob a forma de um arquivo PHP/imagem Docker. -->
docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer

## ---- MONGODB
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4

docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

docker exec -it mongodb \
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'erickwendel', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'herois'}]})"