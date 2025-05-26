<Table>
  <tr>
    <td><a href= "https://www.cps.sp.gov.br/"><img src="img/logo-CPS.jpg" alt="Centro Paula Souza" border="0"></td>
    <td>
      <a href= "https://www.inteli.edu.br/"><img src="img/logo-Inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
    </td>
  </tr>
</table>

# Nome do Projeto: Incloud

## Nome do Grupo: Inclouders

# Guia de Montagem e Uso do Protótipo Incloud

O **Incloud** é uma plataforma para visualização dos profissionais da Assessoria de Inclusão do CPS. Este guia explica como montar, conectar e utilizar o protótipo.

## Estrutura do Projeto

```
/backend
/database
/frontend
docker-compose.yml
```

## Passos para Montagem

### 1. Clonar ou Obter o Projeto
Garanta que você tenha os arquivos do projeto organizados conforme a estrutura acima.

### 2. Ajustar Credenciais
Antes de iniciar, edite o arquivo `docker-compose.yml` conforme necessário:
- Atualize **usuário**, **senha** e demais configurações do banco de dados.
- Caso precise, ajuste também as variáveis de ambiente nos diretórios `backend` e `frontend`.

### 3. Rodar o Docker Compose
Dentro da raiz do projeto (onde está o `docker-compose.yml`), execute:

```
docker-compose up -d
```
Isso irá montar e conectar automaticamente o backend, banco de dados e frontend.

### 4. Acessar a Plataforma
Após os containers estarem rodando:
- Acesse o frontend pelo navegador no endereço "localhost" ou outro utilizado:
  ```
  http://localhost:4200
  ```
  (ou a porta configurada no `docker-compose.yml`)

### 5. Acessando a Plataforma

Após acessar a plataforma, você será direcionado para a **Homepage**, que apresenta quatro botões principais:

**Botões da Homepage:**

- **Dashboard**:  
  Leva para uma visão geral de informações e indicadores importantes.

- **Painel de Alunos**:  
  Exibe os alunos cadastrados e permite adicionar novos alunos à base de dados.

- **Painel de Atendimentos**:  
  Lista todos os atendimentos realizados e possibilita registrar novos atendimentos.

- **Painel de Profissionais do CPS**:  
  Mostra os profissionais da Assessoria de Inclusão e permite o cadastro de novos profissionais.

**Funcionalidade Comum:**

Em cada uma dessas telas, além da visualização das informações existentes, há a possibilidade de **cadastrar novos registros** facilmente, através de formulários intuitivos.

### 6. Parar os Containers

Para parar a aplicação:

```
docker-compose down
```


