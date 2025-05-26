-- Populando a tabela Funcionario (tabela base)
INSERT INTO Funcionario (nome, cargo, departamento, email, possui_deficiencia, configuracoes_acessibilidade) VALUES
('Ana Silva', 'Coordenadora', 'Assessoria de Inclusão', 'ana.silva@cps.sp.gov.br', FALSE, NULL),
('Bruno Souza', 'Atendente', 'Assessoria de Inclusão', 'bruno.souza@cps.sp.gov.br', TRUE, 'Leitor de tela ativado'),
('Carlos Mendes', 'Analista', 'Assessoria de Inclusão', 'carlos.mendes@cps.sp.gov.br', FALSE, NULL),
('Débora Lima', 'Assistente', 'Assessoria de Inclusão', 'debora.lima@cps.sp.gov.br', TRUE, 'Modo de alto contraste ativado'),
('Eduardo Rocha', 'Gerente', 'Assessoria de Inclusão', 'eduardo.rocha@cps.sp.gov.br', FALSE, NULL),
('Fernanda Costa', 'Supervisora', 'Assessoria de Inclusão', 'fernanda.costa@cps.sp.gov.br', FALSE, NULL),
('Gabriel Nunes', 'Atendente', 'Assessoria de Inclusão', 'gabriel.nunes@cps.sp.gov.br', TRUE, 'Ampliador de tela ativado'),
('Helena Martins', 'Psicóloga', 'Assessoria de Inclusão', 'helena.martins@cps.sp.gov.br', FALSE, NULL),
('Isabela Torres', 'Pedagoga', 'Assessoria de Inclusão', 'isabela.torres@cps.sp.gov.br', FALSE, NULL),
('João Ribeiro', 'Técnico', 'Assessoria de Inclusão', 'joao.ribeiro@cps.sp.gov.br', FALSE, NULL);

-- Populando a tabela Necessidade_Especial (tabela base)
INSERT INTO Necessidade_Especial (descricao) VALUES
('Deficiência Visual'),
('Deficiência Auditiva'),
('Deficiência Física'),
('Transtorno do Espectro Autista'),
('Dislexia'),
('Déficit de Atenção'),
('Baixa Visão'),
('Paralisia Cerebral'),
('Surdez Total'),
('Mobilidade Reduzida');

-- Populando a tabela Tecnologia_Assistiva (tabela base)
INSERT INTO Tecnologia_Assistiva (nome, descricao, tipo) VALUES
('Leitor de Tela', 'Software que lê conteúdos da tela para usuários com deficiência visual.', 'Software'),
('Prancha de Comunicação', 'Dispositivo usado por pessoas com dificuldades de comunicação oral.', 'Dispositivo Físico'),
('Teclado Ampliado', 'Teclado adaptado para usuários com deficiência motora.', 'Hardware'),
('Cadeira de Rodas Motorizada', 'Equipamento de mobilidade para pessoas com deficiência física.', 'Equipamento'),
('Software de Leitura', 'Aplicativo que auxilia pessoas com dislexia.', 'Software'),
('Software de Concentração', 'Ajuda alunos com déficit de atenção a manterem o foco.', 'Software'),
('Ampliador de Tela', 'Ferramenta para usuários com baixa visão.', 'Software'),
('Comunicador Alternativo', 'Sistema para usuários não verbais.', 'Dispositivo Eletrônico'),
('Mouse Adaptado', 'Mouse especial para usuários com mobilidade reduzida.', 'Hardware'),
('Aparelho Auditivo', 'Dispositivo para amplificação de som.', 'Dispositivo Físico');

-- Populando a tabela Auxiliar_de_Acompanhamento (tabela base)
INSERT INTO Auxiliar_de_Acompanhamento (nome, especializacoes, email, telefone, empresa) VALUES
('João Almeida', 'Fisioterapia, Terapia Ocupacional', 'joao.almeida@assistiva.com', '11999887766', 'Assistiva Saúde'),
('Paula Lima', 'Fonoaudiologia', 'paula.lima@fonoaudiologia.com', '11988776655', 'Fonoaudiólogos Associados'),
('Rodrigo Souza', 'Psicopedagogia', 'rodrigo.souza@psicoped.com', '11977665544', 'Centro Psicopedagógico'),
('Camila Ribeiro', 'Terapia Ocupacional', 'camila.ribeiro@terapia.com', '11966554433', 'Terapia Integrada'),
('Eduardo Martins', 'Neurologia', 'eduardo.martins@neurologia.com', '11955443322', 'NeuroCare'),
('Fernanda Oliveira', 'Psicologia', 'fernanda.oliveira@psicologia.com', '11944332211', 'PsicoMais'),
('Gustavo Lima', 'Fisioterapia', 'gustavo.lima@fisioterapia.com', '11933221100', 'FisioTop'),
('Helena Costa', 'Pedagogia', 'helena.costa@pedagogia.com', '11922110099', 'EducaMais'),
('Igor Nascimento', 'Fonoaudiologia', 'igor.nascimento@fono.com', '11911009988', 'Fono Integrada'),
('Juliana Torres', 'Terapia Ocupacional', 'juliana.torres@terapia.com', '11900998877', 'Terapia Avançada');

-- Populando a tabela Aluno (tabela base)
INSERT INTO Aluno (nome, data_nascimento, unidade, curso, turno, tipo_necessidade, necessita_tecnologia_assistiva, necessita_acompanhamento, ano_matricula, data_da_matricula, data_fim_do_curso, tipo_do_curso, nome_do_responsavel, email_do_responsavel, telefone_do_responsavel, atendimento_unidade_anterior, casos_na_familia, observacao_casos_familia) VALUES
('Gabriel Santos', '2006-05-15', 'ETEC São Paulo', 'Informática', 'Manhã', 'Deficiência Visual', 'Leitor de Tela', TRUE, 2024, '2024-02-01', '2026-12-01', 'Técnico', 'Mariana Santos', 'mariana.santos@gmail.com', '11987654321', 'Sim', 'Não', NULL),
('Fernanda Oliveira', '2005-09-10', 'FATEC Campinas', 'Gestão Empresarial', 'Noite', 'Deficiência Auditiva', 'Prancha de Comunicação', FALSE, 2023, '2023-07-15', '2026-06-15', 'Superior', 'José Oliveira', 'jose.oliveira@gmail.com', '11965432178', 'Não', 'Sim', 'Irmão também possui deficiência auditiva.'),
('Lucas Ferreira', '2007-03-22', 'ETEC Sorocaba', 'Mecatrônica', 'Tarde', 'Transtorno do Espectro Autista', 'Tablet Adaptado', TRUE, 2024, '2024-01-20', '2027-12-20', 'Técnico', 'Patrícia Ferreira', 'patricia.ferreira@gmail.com', '11998765432', 'Não', 'Não', NULL),
('Amanda Souza', '2006-12-02', 'FATEC Jundiaí', 'Análise de Sistemas', 'Integral', 'Deficiência Física', 'Teclado Ampliado', TRUE, 2023, '2023-06-10', '2026-06-10', 'Superior', 'Carlos Souza', 'carlos.souza@gmail.com', '11977889900', 'Sim', 'Não', NULL),
('Ricardo Lima', '2005-08-25', 'ETEC Guarulhos', 'Logística', 'Manhã', 'Déficit de Atenção', 'Software de Concentração', FALSE, 2023, '2023-02-10', '2025-12-10', 'Técnico', 'Sônia Lima', 'sonia.lima@gmail.com', '11966554433', 'Não', 'Sim', 'Tio também possui déficit de atenção.'),
('Juliana Martins', '2008-07-18', 'ETEC Barueri', 'Enfermagem', 'Noite', 'Deficiência Auditiva', 'Aparelho Auditivo', TRUE, 2024, '2024-03-15', '2027-12-15', 'Técnico', 'Fernando Martins', 'fernando.martins@gmail.com', '11933221144', 'Sim', 'Não', NULL),
('Pedro Henrique', '2006-04-12', 'FATEC São Paulo', 'Administração', 'Manhã', 'Deficiência Física', 'Cadeira de Rodas Motorizada', TRUE, 2023, '2023-08-05', '2026-07-05', 'Superior', 'Laura Henrique', 'laura.henrique@gmail.com', '11955443322', 'Não', 'Não', NULL),
('Beatriz Carvalho', '2007-01-30', 'ETEC Santos', 'Eletrotécnica', 'Tarde', 'Baixa Visão', 'Ampliador de Tela', TRUE, 2024, '2024-02-20', '2027-11-20', 'Técnico', 'Renato Carvalho', 'renato.carvalho@gmail.com', '11922334455', 'Sim', 'Sim', 'Avó também possui baixa visão.'),
('Leonardo Souza', '2005-11-05', 'FATEC Ribeirão Preto', 'Marketing', 'Noite', 'Dislexia', 'Software de Leitura', FALSE, 2023, '2023-05-18', '2026-05-18', 'Superior', 'Márcia Souza', 'marcia.souza@gmail.com', '11977885544', 'Não', 'Sim', 'Irmão possui dislexia.'),
('Camila Torres', '2006-06-29', 'ETEC Campinas', 'Design Gráfico', 'Integral', 'Transtorno do Espectro Autista', 'Comunicação Alternativa', TRUE, 2024, '2024-01-30', '2027-12-30', 'Técnico', 'Roberto Torres', 'roberto.torres@gmail.com', '11988997766', 'Sim', 'Não', NULL);

-- Populando as tabelas com dependências (após as tabelas base serem preenchidas)

-- Populando a tabela Autenticacao (depende de Funcionario)
INSERT INTO Autenticacao (id_funcionario, nivel_acesso) VALUES
(1, 3), (2, 2), (3, 2), (4, 2), (5, 3), (6, 3), (7, 1), (8, 2), (9, 2), (10, 1);

-- Populando a tabela Log_de_Acoes (depende de Funcionario)
INSERT INTO Log_de_Acoes (id_funcionario, descricao) VALUES
(1, 'Realizou cadastro de novo aluno.'),
(2, 'Atualizou informações de acessibilidade de um aluno.'),
(3, 'Gerou relatório de atendimentos.'),
(4, 'Registrou novo atendimento.'),
(5, 'Modificou status de acompanhamento.'),
(6, 'Fez revisão de cadastro de necessidades especiais.'),
(7, 'Inseriu nova tecnologia assistiva no sistema.'),
(8, 'Remanejou auxiliar para outro aluno.'),
(9, 'Ajustou configuração de acessibilidade para um funcionário.'),
(10, 'Excluiu registro duplicado de aluno.');

-- Populando a tabela Atendimento (depende de Funcionario e Aluno)
INSERT INTO Atendimento (status_atendimento, id_funcionario, id_aluno) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(1, 4, 4),
(2, 5, 5),
(3, 6, 6),
(1, 7, 7),
(2, 8, 8),
(3, 9, 9),
(1, 10, 10);

-- Populando a tabela de relação Necessidade_Especial_e_Aluno (depende de Aluno e Necessidade_Especial)
INSERT INTO Necessidade_Especial_e_Aluno (id_aluno, id_necessidade) VALUES
(1, 1),
(2, 2),
(3, 4),
(4, 3),
(5, 6),
(6, 2),
(7, 3),
(8, 7),
(9, 5),
(10, 4);

-- Populando a tabela de relação Tecnologia_e_Aluno (depende de Aluno e Tecnologia_Assistiva)
INSERT INTO Tecnologia_e_Aluno (id_aluno, id_tecnologia) VALUES
(1, 1),
(2, 2),
(3, 6),
(4, 3),
(5, 5),
(6, 10),
(7, 4),
(8, 7),
(9, 8),
(10, 9);

-- Populando a tabela de relação Auxiliar_e_Aluno (depende de Aluno e Auxiliar_de_Acompanhamento)
INSERT INTO Auxiliar_e_Aluno (id_aluno, id_auxiliar) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- Populando a tabela Funcionario (tabela base)
INSERT INTO Funcionario (nome, cargo, departamento, email, possui_deficiencia, configuracoes_acessibilidade) VALUES
('Ana Silva', 'Coordenadora', 'Assessoria de Inclusão', 'ana.silva@cps.sp.gov.br', FALSE, NULL),
('Bruno Souza', 'Atendente', 'Assessoria de Inclusão', 'bruno.souza@cps.sp.gov.br', TRUE, 'Leitor de tela ativado'),
('Carlos Mendes', 'Analista', 'Assessoria de Inclusão', 'carlos.mendes@cps.sp.gov.br', FALSE, NULL),
('Débora Lima', 'Assistente', 'Assessoria de Inclusão', 'debora.lima@cps.sp.gov.br', TRUE, 'Modo de alto contraste ativado'),
('Eduardo Rocha', 'Gerente', 'Assessoria de Inclusão', 'eduardo.rocha@cps.sp.gov.br', FALSE, NULL),
('Fernanda Costa', 'Supervisora', 'Assessoria de Inclusão', 'fernanda.costa@cps.sp.gov.br', FALSE, NULL),
('Gabriel Nunes', 'Atendente', 'Assessoria de Inclusão', 'gabriel.nunes@cps.sp.gov.br', TRUE, 'Ampliador de tela ativado'),
('Helena Martins', 'Psicóloga', 'Assessoria de Inclusão', 'helena.martins@cps.sp.gov.br', FALSE, NULL),
('Isabela Torres', 'Pedagoga', 'Assessoria de Inclusão', 'isabela.torres@cps.sp.gov.br', FALSE, NULL),
('João Ribeiro', 'Técnico', 'Assessoria de Inclusão', 'joao.ribeiro@cps.sp.gov.br', FALSE, NULL);

-- Populando a tabela Necessidade_Especial (tabela base)
INSERT INTO Necessidade_Especial (descricao) VALUES
('Deficiência Visual'),
('Deficiência Auditiva'),
('Deficiência Física'),
('Transtorno do Espectro Autista'),
('Dislexia'),
('Déficit de Atenção'),
('Baixa Visão'),
('Paralisia Cerebral'),
('Surdez Total'),
('Mobilidade Reduzida');

-- Populando a tabela Tecnologia_Assistiva (tabela base)
INSERT INTO Tecnologia_Assistiva (nome, descricao, tipo) VALUES
('Leitor de Tela', 'Software que lê conteúdos da tela para usuários com deficiência visual.', 'Software'),
('Prancha de Comunicação', 'Dispositivo usado por pessoas com dificuldades de comunicação oral.', 'Dispositivo Físico'),
('Teclado Ampliado', 'Teclado adaptado para usuários com deficiência motora.', 'Hardware'),
('Cadeira de Rodas Motorizada', 'Equipamento de mobilidade para pessoas com deficiência física.', 'Equipamento'),
('Software de Leitura', 'Aplicativo que auxilia pessoas com dislexia.', 'Software'),
('Software de Concentração', 'Ajuda alunos com déficit de atenção a manterem o foco.', 'Software'),
('Ampliador de Tela', 'Ferramenta para usuários com baixa visão.', 'Software'),
('Comunicador Alternativo', 'Sistema para usuários não verbais.', 'Dispositivo Eletrônico'),
('Mouse Adaptado', 'Mouse especial para usuários com mobilidade reduzida.', 'Hardware'),
('Aparelho Auditivo', 'Dispositivo para amplificação de som.', 'Dispositivo Físico');

-- Populando a tabela Auxiliar_de_Acompanhamento (tabela base)
INSERT INTO Auxiliar_de_Acompanhamento (nome, especializacoes, email, telefone, empresa) VALUES
('João Almeida', 'Fisioterapia, Terapia Ocupacional', 'joao.almeida@assistiva.com', '11999887766', 'Assistiva Saúde'),
('Paula Lima', 'Fonoaudiologia', 'paula.lima@fonoaudiologia.com', '11988776655', 'Fonoaudiólogos Associados'),
('Rodrigo Souza', 'Psicopedagogia', 'rodrigo.souza@psicoped.com', '11977665544', 'Centro Psicopedagógico'),
('Camila Ribeiro', 'Terapia Ocupacional', 'camila.ribeiro@terapia.com', '11966554433', 'Terapia Integrada'),
('Eduardo Martins', 'Neurologia', 'eduardo.martins@neurologia.com', '11955443322', 'NeuroCare'),
('Fernanda Oliveira', 'Psicologia', 'fernanda.oliveira@psicologia.com', '11944332211', 'PsicoMais'),
('Gustavo Lima', 'Fisioterapia', 'gustavo.lima@fisioterapia.com', '11933221100', 'FisioTop'),
('Helena Costa', 'Pedagogia', 'helena.costa@pedagogia.com', '11922110099', 'EducaMais'),
('Igor Nascimento', 'Fonoaudiologia', 'igor.nascimento@fono.com', '11911009988', 'Fono Integrada'),
('Juliana Torres', 'Terapia Ocupacional', 'juliana.torres@terapia.com', '11900998877', 'Terapia Avançada');

-- Populando a tabela Aluno (tabela base)
INSERT INTO Aluno (nome, data_nascimento, unidade, curso, turno, tipo_necessidade, necessita_tecnologia_assistiva, necessita_acompanhamento, ano_matricula, data_da_matricula, data_fim_do_curso, tipo_do_curso, nome_do_responsavel, email_do_responsavel, telefone_do_responsavel, atendimento_unidade_anterior, casos_na_familia, observacao_casos_familia) VALUES
('Gabriel Santos', '2006-05-15', 'ETEC São Paulo', 'Informática', 'Manhã', 'Deficiência Visual', 'Leitor de Tela', TRUE, 2024, '2024-02-01', '2026-12-01', 'Técnico', 'Mariana Santos', 'mariana.santos@gmail.com', '11987654321', 'Sim', 'Não', NULL),
('Fernanda Oliveira', '2005-09-10', 'FATEC Campinas', 'Gestão Empresarial', 'Noite', 'Deficiência Auditiva', 'Prancha de Comunicação', FALSE, 2023, '2023-07-15', '2026-06-15', 'Superior', 'José Oliveira', 'jose.oliveira@gmail.com', '11965432178', 'Não', 'Sim', 'Irmão também possui deficiência auditiva.'),
('Lucas Ferreira', '2007-03-22', 'ETEC Sorocaba', 'Mecatrônica', 'Tarde', 'Transtorno do Espectro Autista', 'Tablet Adaptado', TRUE, 2024, '2024-01-20', '2027-12-20', 'Técnico', 'Patrícia Ferreira', 'patricia.ferreira@gmail.com', '11998765432', 'Não', 'Não', NULL),
('Amanda Souza', '2006-12-02', 'FATEC Jundiaí', 'Análise de Sistemas', 'Integral', 'Deficiência Física', 'Teclado Ampliado', TRUE, 2023, '2023-06-10', '2026-06-10', 'Superior', 'Carlos Souza', 'carlos.souza@gmail.com', '11977889900', 'Sim', 'Não', NULL),
('Ricardo Lima', '2005-08-25', 'ETEC Guarulhos', 'Logística', 'Manhã', 'Déficit de Atenção', 'Software de Concentração', FALSE, 2023, '2023-02-10', '2025-12-10', 'Técnico', 'Sônia Lima', 'sonia.lima@gmail.com', '11966554433', 'Não', 'Sim', 'Tio também possui déficit de atenção.'),
('Juliana Martins', '2008-07-18', 'ETEC Barueri', 'Enfermagem', 'Noite', 'Deficiência Auditiva', 'Aparelho Auditivo', TRUE, 2024, '2024-03-15', '2027-12-15', 'Técnico', 'Fernando Martins', 'fernando.martins@gmail.com', '11933221144', 'Sim', 'Não', NULL),
('Pedro Henrique', '2006-04-12', 'FATEC São Paulo', 'Administração', 'Manhã', 'Deficiência Física', 'Cadeira de Rodas Motorizada', TRUE, 2023, '2023-08-05', '2026-07-05', 'Superior', 'Laura Henrique', 'laura.henrique@gmail.com', '11955443322', 'Não', 'Não', NULL),
('Beatriz Carvalho', '2007-01-30', 'ETEC Santos', 'Eletrotécnica', 'Tarde', 'Baixa Visão', 'Ampliador de Tela', TRUE, 2024, '2024-02-20', '2027-11-20', 'Técnico', 'Renato Carvalho', 'renato.carvalho@gmail.com', '11922334455', 'Sim', 'Sim', 'Avó também possui baixa visão.'),
('Leonardo Souza', '2005-11-05', 'FATEC Ribeirão Preto', 'Marketing', 'Noite', 'Dislexia', 'Software de Leitura', FALSE, 2023, '2023-05-18', '2026-05-18', 'Superior', 'Márcia Souza', 'marcia.souza@gmail.com', '11977885544', 'Não', 'Sim', 'Irmão possui dislexia.'),
('Camila Torres', '2006-06-29', 'ETEC Campinas', 'Design Gráfico', 'Integral', 'Transtorno do Espectro Autista', 'Comunicação Alternativa', TRUE, 2024, '2024-01-30', '2027-12-30', 'Técnico', 'Roberto Torres', 'roberto.torres@gmail.com', '11988997766', 'Sim', 'Não', NULL);

-- Populando as tabelas com dependências (após as tabelas base serem preenchidas)

-- Populando a tabela Autenticacao (depende de Funcionario)
INSERT INTO Autenticacao (id_funcionario, nivel_acesso) VALUES
(1, 3), (2, 2), (3, 2), (4, 2), (5, 3), (6, 3), (7, 1), (8, 2), (9, 2), (10, 1);

-- Populando a tabela Log_de_Acoes (depende de Funcionario)
INSERT INTO Log_de_Acoes (id_funcionario, descricao) VALUES
(1, 'Realizou cadastro de novo aluno.'),
(2, 'Atualizou informações de acessibilidade de um aluno.'),
(3, 'Gerou relatório de atendimentos.'),
(4, 'Registrou novo atendimento.'),
(5, 'Modificou status de acompanhamento.'),
(6, 'Fez revisão de cadastro de necessidades especiais.'),
(7, 'Inseriu nova tecnologia assistiva no sistema.'),
(8, 'Remanejou auxiliar para outro aluno.'),
(9, 'Ajustou configuração de acessibilidade para um funcionário.'),
(10, 'Excluiu registro duplicado de aluno.');

-- Populando a tabela Atendimento (depende de Funcionario e Aluno)
INSERT INTO Atendimento (status_atendimento, id_funcionario, id_aluno) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(1, 4, 4),
(2, 5, 5),
(3, 6, 6),
(1, 7, 7),
(2, 8, 8),
(3, 9, 9),
(1, 10, 10);

-- Populando a tabela de relação Necessidade_Especial_e_Aluno (depende de Aluno e Necessidade_Especial)
INSERT INTO Necessidade_Especial_e_Aluno (id_aluno, id_necessidade) VALUES
(1, 1),
(2, 2),
(3, 4),
(4, 3),
(5, 6),
(6, 2),
(7, 3),
(8, 7),
(9, 5),
(10, 4);

-- Populando a tabela de relação Tecnologia_e_Aluno (depende de Aluno e Tecnologia_Assistiva)
INSERT INTO Tecnologia_e_Aluno (id_aluno, id_tecnologia) VALUES
(1, 1),
(2, 2),
(3, 6),
(4, 3),
(5, 5),
(6, 10),
(7, 4),
(8, 7),
(9, 8),
(10, 9);

-- Populando a tabela de relação Auxiliar_e_Aluno (depende de Aluno e Auxiliar_de_Acompanhamento)
INSERT INTO Auxiliar_e_Aluno (id_aluno, id_auxiliar) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);
