# operacoes no banco de dados
# autenticacao
docker exec -it 8ed1c89a1515 mongo -u erickwendel -p minhasenhasecreta --authenticationDatabase heroes

# muda o contexto banco 
use herois

# mostra os Bancos
show dbs

# mostra as colecoes
show collections

# insere uma heroina no banco
db.heroes.insert({nome: 'Mulher Gaviao', poder: 'Fodona'})

# busca dados no banco de Dados
# podemos usar o comando pretty para que traga os dados formatados
db.heroes.find().pretty()

# é possivel rodar javascript dentro do banco de Dados, por exemplo um for para inserir varios dados de uma só vez

# atualizando um dado
db.heroes.update({_id : ObjectId("5fa3e9c36612ee64d44bc48e")}, $set: {poder: "Asas"})

# caso voce altere algum campo com nome errado o banco de dados ira adicionar esse campo

# apagar dados do bancos
# caso a query seja mandada vazia apagamos todos os dados do banco
db.heroes.remove({})

# nao funcionam
# // create
db.herois.create({ nome: 'Iron man', poder: 'Rico'})

# // read
db.herois.find({})

# // update
db.herois.update({_id: id}, {$set: {nome: 'papaleguas'}})

# // delete
db.herois.delete({_id: id})

