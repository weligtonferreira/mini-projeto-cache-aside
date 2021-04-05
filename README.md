# mini-projeto-cache-aside

API que possibilita um CRUD simples utilizando-se do banco PostgreSQL e o Redis em um domínio market place.

# Instalando dependências

$ npm i

# Configurando varáveis de configuração

Crie um arquivo ".env" na raiz da api e o configure com as seguintes variáveis:

PORT= Porta da aplicação
PG_USERNAME= Nome do usuário do PostgreSQL
PG_PASSWORD= Senha do PostgreSQL
PG_HOST= HOST do banco do PostgreSQL
PG_PORT= Porta do servidor do PostgreSQL
PG_NAME= Nome do banco do PostgreSQL
REDIS_HOST= HOST do servidor Redis
REDIS_PORT= Porta do servidor Redis

# Executando o projeto

$ npm start
