## 🗄️ Orientação sobre o uso do banco de dados

Este guia serve para o entendimento do modelo físico do banco de dados e como utilizar os scripts SQL com instruções precisas sobre a execução dos scripts e o propósito de cada arquivo no projeto.

- Para utilizar os Scripts primeiramente realize a conexão com o banco de dados. Após realizar essa conexão com as informações e passo a passo providos individualmente, acesse a estrutura de diretórios e localize a pasta `src/database`, entre no arquivo `create_database.sql`.
- Verifique que o arquivo contém todos os comandos SQL necessários para criar o banco e as tabelas, como:
  - Criação do banco de dados (se já não existir).
  - Definição e criação das tabelas.
  - Configuração de chaves primárias, estrangeiras e demais restrições.
- Por meio do arquivo `create_database.sql`, copie todo o código `SQL` e execute no editor de queries no seu cliente MySQL.
- Após a execução do script, confirme que as tabelas foram criadas corretamente com o comando `SHOW TABLES`.

Após a criação do banco de dados, realize a população dele caso não haja nenhum dado acrescentado, acessando o arquivo `initial_data.sql` no mesmo diretório do arquivo de criação inicial.

- Com a conexão com o banco de dados realizada, selecione o banco de dados ativo por meio de `USE inclusao;`.
- Localize o arquivo `initial_data.sql` na pasta `src/database` e veja que ele está separado em seções:

1. **População das Tabelas Base:**
    - Tabela Funcionario
    - Tabela Necessidade_Especial
    - Tabela Tecnologia_Assistiva
    - Tabela Auxiliar_de_Acompanhamento
    - Tabela Aluno

2. **População das Tabelas com Dependências:**
    - Tabela Autenticacao (depende de Funcionario)
    - Tabela Log_de_Acoes (depende de Funcionario)
    - Tabela Atendimento (depende de Funcionario e Aluno)
    - Tabela de relação Necessidade_Especial_e_Aluno (depende de Aluno e Necessidade_Especial)
    - Tabela de relação Tecnologia_e_Aluno (depende de Aluno e Tecnologia_Assistiva)
    - Tabela de relação Auxiliar_e_Aluno (depende de Aluno e Auxiliar_de_Acompanhamento)

- Selecione todo o código SQL e no cliente MySQL execute a query de uma só vez. Após isso, verifique se os dados foram inseridos corretamente em cada tabela utilizando comandos como:

```sql
SELECT * FROM Funcionario;
SELECT * FROM Aluno;
SELECT * FROM Autenticacao;
```

- Quando tudo estiver certo no banco de dados, finalize sua sessão no MySQL com `EXIT;`.

- Após isso, você terá o banco de dados completo e populado conforme os scripts de database.

---

## **Rollback de Alterações no Banco de Dados**

Para reverter alterações feitas em registros das tabelas **Aluno** ou **Atendimento**, utilize os procedimentos de **rollback** descritos abaixo. Estes procedimentos restauram os dados para o estado anterior conforme o histórico registrado nas tabelas de **Historico_Aluno** e **Historico_Atendimento**.

### 1. **Rollback para a Tabela Aluno**
Para restaurar um registro de aluno, execute o procedimento `rollback_aluno` passando o `id_aluno` como parâmetro. O procedimento vai reverter a última alteração realizada (se foi uma atualização ou exclusão).

**Exemplo:**

```sql
-- Para restaurar os dados do aluno com id_aluno = 3
CALL rollback_aluno(3);

-- Para restaurar os dados do aluno com id_aluno = 5
CALL rollback_aluno(5);

-- Para restaurar os dados do aluno com id_aluno = 9
CALL rollback_aluno(9);
```

### 2. **Rollback para a Tabela Atendimento**
É possível restaurar registros da tabela **Atendimento** utilizando o procedimento `rollback_atendimento`.

**Exemplo:**

```sql
-- Para restaurar os dados do atendimento com id_atendimento = 1
CALL rollback_atendimento(1);

-- Para restaurar os dados do atendimento com id_atendimento = 2
CALL rollback_atendimento(2);
```

### 3. **Verificação após Rollback**
Após executar o procedimento de rollback, verifique se os dados foram restaurados:

```sql
-- Verificar os dados do aluno após o rollback
SELECT * FROM Aluno WHERE id_aluno = 3;

-- Verificar os dados do atendimento após o rollback
SELECT * FROM Atendimento WHERE id_atendimento = 1;
```

Esses procedimentos fazem com que os registros sejam revertidos para os valores anteriores, conforme registrado nas tabelas de histórico.
