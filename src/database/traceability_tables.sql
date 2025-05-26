USE incloudDB;

CREATE TABLE IF NOT EXISTS Historico_Aluno (
    id_hist_aluno INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT,
    nome VARCHAR(255),
    data_nascimento DATE,
    unidade VARCHAR(255),
    curso VARCHAR(255),
    turno VARCHAR(50),
    tipo_necessidade VARCHAR(255),
    necessita_tecnologia_assistiva VARCHAR(255),
    necessita_acompanhamento BOOLEAN,
    ano_matricula YEAR,
    data_da_matricula DATE,
    data_fim_do_curso DATE,
    tipo_do_curso VARCHAR(100),
    nome_do_responsavel VARCHAR(255),
    email_do_responsavel VARCHAR(255),
    telefone_do_responsavel VARCHAR(20),
    atendimento_unidade_anterior TEXT,
    casos_na_familia TEXT,
    observacao_casos_familia TEXT,
    operacao VARCHAR(10),               -- 'UPDATE' ou 'DELETE'
    data_operacao DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS Historico_Atendimento (
    id_hist_atendimento INT PRIMARY KEY AUTO_INCREMENT,
    id_atendimento INT,
    status_atendimento INT,
    id_funcionario INT,
    id_aluno INT,
    operacao VARCHAR(10),               -- 'UPDATE' ou 'DELETE'
    data_operacao DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- CRIAÇÃO DOS TRIGGERS (USANDO DELIMITER //)
DELIMITER //

-- TRIGGER: Aluno - AFTER UPDATE
CREATE TRIGGER trg_aluno_after_update
AFTER UPDATE ON Aluno
FOR EACH ROW
BEGIN
    INSERT INTO Historico_Aluno (
        id_aluno, nome, data_nascimento, unidade, curso, turno,
        tipo_necessidade, necessita_tecnologia_assistiva, necessita_acompanhamento,
        ano_matricula, data_da_matricula, data_fim_do_curso, tipo_do_curso,
        nome_do_responsavel, email_do_responsavel, telefone_do_responsavel,
        atendimento_unidade_anterior, casos_na_familia, observacao_casos_familia,
        operacao, data_operacao
    )
    VALUES (
        OLD.id_aluno, OLD.nome, OLD.data_nascimento, OLD.unidade, OLD.curso, OLD.turno,
        OLD.tipo_necessidade, OLD.necessita_tecnologia_assistiva, OLD.necessita_acompanhamento,
        OLD.ano_matricula, OLD.data_da_matricula, OLD.data_fim_do_curso, OLD.tipo_do_curso,
        OLD.nome_do_responsavel, OLD.email_do_responsavel, OLD.telefone_do_responsavel,
        OLD.atendimento_unidade_anterior, OLD.casos_na_familia, OLD.observacao_casos_familia,
        'UPDATE', NOW()
    );
END;
//

-- TRIGGER: Aluno - AFTER DELETE
CREATE TRIGGER trg_aluno_after_delete
AFTER DELETE ON Aluno
FOR EACH ROW
BEGIN
    INSERT INTO Historico_Aluno (
        id_aluno, nome, data_nascimento, unidade, curso, turno,
        tipo_necessidade, necessita_tecnologia_assistiva, necessita_acompanhamento,
        ano_matricula, data_da_matricula, data_fim_do_curso, tipo_do_curso,
        nome_do_responsavel, email_do_responsavel, telefone_do_responsavel,
        atendimento_unidade_anterior, casos_na_familia, observacao_casos_familia,
        operacao, data_operacao
    )
    VALUES (
        OLD.id_aluno, OLD.nome, OLD.data_nascimento, OLD.unidade, OLD.curso, OLD.turno,
        OLD.tipo_necessidade, OLD.necessita_tecnologia_assistiva, OLD.necessita_acompanhamento,
        OLD.ano_matricula, OLD.data_da_matricula, OLD.data_fim_do_curso, OLD.tipo_do_curso,
        OLD.nome_do_responsavel, OLD.email_do_responsavel, OLD.telefone_do_responsavel,
        OLD.atendimento_unidade_anterior, OLD.casos_na_familia, OLD.observacao_casos_familia,
        'DELETE', NOW()
    );
END;
//

-- TRIGGER: Atendimento - AFTER UPDATE
CREATE TRIGGER trg_atendimento_after_update
AFTER UPDATE ON Atendimento
FOR EACH ROW
BEGIN
    INSERT INTO Historico_Atendimento (
        id_atendimento, status_atendimento, id_funcionario, id_aluno,
        operacao, data_operacao
    )
    VALUES (
        OLD.id_atendimento, OLD.status_atendimento, OLD.id_funcionario, OLD.id_aluno,
        'UPDATE', NOW()
    );
END;
//

-- TRIGGER: Atendimento - AFTER DELETE
CREATE TRIGGER trg_atendimento_after_delete
AFTER DELETE ON Atendimento
FOR EACH ROW
BEGIN
    INSERT INTO Historico_Atendimento (
        id_atendimento, status_atendimento, id_funcionario, id_aluno,
        operacao, data_operacao
    )
    VALUES (
        OLD.id_atendimento, OLD.status_atendimento, OLD.id_funcionario, OLD.id_aluno,
        'DELETE', NOW()
    );
END;
//

DELIMITER ;
