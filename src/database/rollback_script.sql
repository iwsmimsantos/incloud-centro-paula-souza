USE incloudDB;

-- PROCEDURE: Rollback para tabela Aluno
DELIMITER //

CREATE PROCEDURE rollback_aluno(IN p_id_aluno INT)
BEGIN
    DECLARE v_nome VARCHAR(255);
    DECLARE v_data_nascimento DATE;
    DECLARE v_unidade VARCHAR(255);
    DECLARE v_curso VARCHAR(255);
    DECLARE v_turno VARCHAR(50);
    DECLARE v_tipo_necessidade VARCHAR(255);
    DECLARE v_necessita_tecnologia_assistiva VARCHAR(255);
    DECLARE v_necessita_acompanhamento BOOLEAN;
    DECLARE v_ano_matricula YEAR;
    DECLARE v_data_da_matricula DATE;
    DECLARE v_data_fim_do_curso DATE;
    DECLARE v_tipo_do_curso VARCHAR(100);
    DECLARE v_nome_do_responsavel VARCHAR(255);
    DECLARE v_email_do_responsavel VARCHAR(255);
    DECLARE v_telefone_do_responsavel VARCHAR(20);
    DECLARE v_atendimento_unidade_anterior TEXT;
    DECLARE v_casos_na_familia TEXT;
    DECLARE v_observacao_casos_familia TEXT;
    DECLARE v_operacao VARCHAR(10);

    -- Recupera o último registro histórico para o aluno
    SELECT nome, data_nascimento, unidade, curso, turno,
           tipo_necessidade, necessita_tecnologia_assistiva, necessita_acompanhamento,
           ano_matricula, data_da_matricula, data_fim_do_curso, tipo_do_curso,
           nome_do_responsavel, email_do_responsavel, telefone_do_responsavel,
           atendimento_unidade_anterior, casos_na_familia, observacao_casos_familia,
           operacao
      INTO v_nome, v_data_nascimento, v_unidade, v_curso, v_turno,
           v_tipo_necessidade, v_necessita_tecnologia_assistiva, v_necessita_acompanhamento,
           v_ano_matricula, v_data_da_matricula, v_data_fim_do_curso, v_tipo_do_curso,
           v_nome_do_responsavel, v_email_do_responsavel, v_telefone_do_responsavel,
           v_atendimento_unidade_anterior, v_casos_na_familia, v_observacao_casos_familia,
           v_operacao
      FROM Historico_Aluno
      WHERE id_aluno = p_id_aluno
      ORDER BY data_operacao DESC
      LIMIT 1;

    IF v_operacao = 'UPDATE' THEN
        UPDATE Aluno SET 
            nome = v_nome,
            data_nascimento = v_data_nascimento,
            unidade = v_unidade,
            curso = v_curso,
            turno = v_turno,
            tipo_necessidade = v_tipo_necessidade,
            necessita_tecnologia_assistiva = v_necessita_tecnologia_assistiva,
            necessita_acompanhamento = v_necessita_acompanhamento,
            ano_matricula = v_ano_matricula,
            data_da_matricula = v_data_da_matricula,
            data_fim_do_curso = v_data_fim_do_curso,
            tipo_do_curso = v_tipo_do_curso,
            nome_do_responsavel = v_nome_do_responsavel,
            email_do_responsavel = v_email_do_responsavel,
            telefone_do_responsavel = v_telefone_do_responsavel,
            atendimento_unidade_anterior = v_atendimento_unidade_anterior,
            casos_na_familia = v_casos_na_familia,
            observacao_casos_familia = v_observacao_casos_familia
        WHERE id_aluno = p_id_aluno;
    ELSEIF v_operacao = 'DELETE' THEN
        INSERT INTO Aluno (
            id_aluno, nome, data_nascimento, unidade, curso, turno,
            tipo_necessidade, necessita_tecnologia_assistiva, necessita_acompanhamento,
            ano_matricula, data_da_matricula, data_fim_do_curso, tipo_do_curso,
            nome_do_responsavel, email_do_responsavel, telefone_do_responsavel,
            atendimento_unidade_anterior, casos_na_familia, observacao_casos_familia
        )
        VALUES (
            p_id_aluno, v_nome, v_data_nascimento, v_unidade, v_curso, v_turno,
            v_tipo_necessidade, v_necessita_tecnologia_assistiva, v_necessita_acompanhamento,
            v_ano_matricula, v_data_da_matricula, v_data_fim_do_curso, v_tipo_do_curso,
            v_nome_do_responsavel, v_email_do_responsavel, v_telefone_do_responsavel,
            v_atendimento_unidade_anterior, v_casos_na_familia, v_observacao_casos_familia
        );
    END IF;
END;
//

-- PROCEDURE: Rollback para tabela Atendimento
CREATE PROCEDURE rollback_atendimento(IN p_id_atendimento INT)
BEGIN
    DECLARE v_status_atendimento INT;
    DECLARE v_id_funcionario INT;
    DECLARE v_id_aluno INT;
    DECLARE v_operacao VARCHAR(10);

    -- Recupera o último registro histórico para o atendimento
    SELECT status_atendimento, id_funcionario, id_aluno, operacao
      INTO v_status_atendimento, v_id_funcionario, v_id_aluno, v_operacao
      FROM Historico_Atendimento
      WHERE id_atendimento = p_id_atendimento
      ORDER BY data_operacao DESC
      LIMIT 1;

    IF v_operacao = 'UPDATE' THEN
        UPDATE Atendimento SET 
            status_atendimento = v_status_atendimento,
            id_funcionario = v_id_funcionario,
            id_aluno = v_id_aluno
        WHERE id_atendimento = p_id_atendimento;
    ELSEIF v_operacao = 'DELETE' THEN
        INSERT INTO Atendimento (
            id_atendimento, status_atendimento, id_funcionario, id_aluno
        )
        VALUES (
            p_id_atendimento, v_status_atendimento, v_id_funcionario, v_id_aluno
        );
    END IF;
END;
//

DELIMITER ;

