# Tocloc - Sistema de Gerenciamento de Locais Esportivos

O **Tocloc** é um sistema de gerenciamento de locais esportivos que permite registrar, atualizar, listar e excluir locais, bem como gerenciar reservas e disponibilidades de horários para esses locais.

## Como Rodar o Projeto

### 1. Instalação das Dependências

Clone o repositório e navegue até o diretório do projeto. Em seguida, execute o seguinte comando para instalar as dependências do projeto:

```bash
npm install
```
### 2. Configuração das Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto com as variáveis de ambiente necessárias. O arquivo .env deve conter as seguintes configurações:

```bash
SUPABASE_URL=<sua_url_do_supabase>
SUPABASE_KEY=<sua_chave_de_api_do_supabase>
```
### 3. Iniciando o Servidor
Após configurar o arquivo .env, execute o seguinte comando para iniciar o servidor:
```bash
npm start
```
O servidor estará rodando na porta 3000 por padrão.

## Estrutura do Projeto
node_modules/ - Contém as dependências do projeto.
.env - Contém as variáveis de ambiente sensíveis.
.gitignore - Ignora arquivos e diretórios que não devem ser versionados no Git.
src/ - Diretório contendo a lógica do servidor, rotas, serviços e repositórios.
package.json - Contém as dependências e scripts do projeto.

# Dependências instaladas
node_modules/

# Arquivos de logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Arquivos de ambiente
.env

# Build ou arquivos gerados
dist/
build/

# Sistema operacional (opcional)
.DS_Store
Thumbs.db


Acesse as rotas disponíveis pelo endereço http://localhost:5173.(Front-End) ou http://localhost:3000.(Back-End)
