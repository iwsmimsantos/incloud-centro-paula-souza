USE inclusao;

-- Tabela Funcionário
CREATE TABLE Funcionario (
    id_funcionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    departamento VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    possui_deficiencia BOOLEAN NOT NULL,
    configuracoes_acessibilidade TEXT
);

-- Tabela Autenticação
CREATE TABLE Autenticacao (
    id_autenticacao INT PRIMARY KEY AUTO_INCREMENT,
    id_funcionario INT NOT NULL,
    nivel_acesso INT NOT NULL,
    FOREIGN KEY (id_funcionario) REFERENCES Funcionario(id_funcionario)
);

-- Tabela Log de Ações
CREATE TABLE Log_de_Acoes (
    id_log INT PRIMARY KEY AUTO_INCREMENT,
    id_funcionario INT,
    data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,
    FOREIGN KEY (id_funcionario) REFERENCES Funcionario(id_funcionario)
);

-- Tabela Aluno
CREATE TABLE Aluno (
    id_aluno INT PRIMARY KEY AUTO_INCREMENT,
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
    observacao_casos_familia TEXT
);

-- Tabela Atendimento
CREATE TABLE Atendimento (
    id_atendimento INT PRIMARY KEY AUTO_INCREMENT,
    status_atendimento INT,
    id_funcionario INT,
    id_aluno INT,
    FOREIGN KEY (id_funcionario) REFERENCES Funcionario(id_funcionario),
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno)
);

-- Tabela Necessidade Especial
CREATE TABLE Necessidade_Especial (
    id_necessidade INT PRIMARY KEY AUTO_INCREMENT,
    descricao TEXT NOT NULL
);

-- Tabela Auxiliar de Acompanhamento
CREATE TABLE Auxiliar_de_Acompanhamento (
    id_auxiliar INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    especializacoes TEXT,
    email VARCHAR(255),
    telefone VARCHAR(20),
    empresa VARCHAR(255)
);

-- Tabela Tecnologia Assistiva
CREATE TABLE Tecnologia_Assistiva (
    id_tecnologia INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    descricao TEXT,
    tipo VARCHAR(255)
);

-- Tabela de relação entre Necessidade Especial e Aluno
CREATE TABLE Necessidade_Especial_e_Aluno (
    id_necessidade_aluno INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT,
    id_necessidade INT,
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno),
    FOREIGN KEY (id_necessidade) REFERENCES Necessidade_Especial(id_necessidade)
);

-- Tabela de relação entre Tecnologia e Aluno
CREATE TABLE Tecnologia_e_Aluno (
    id_tecnologia_aluno INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT,
    id_tecnologia INT,
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno),
    FOREIGN KEY (id_tecnologia) REFERENCES Tecnologia_Assistiva(id_tecnologia)
);

-- Tabela de relação entre Auxiliar e Aluno
CREATE TABLE Auxiliar_e_Aluno (
    id_auxiliar_aluno INT PRIMARY KEY AUTO_INCREMENT,
    id_aluno INT,
    id_auxiliar INT,
    FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno),
    FOREIGN KEY (id_auxiliar) REFERENCES Auxiliar_de_Acompanhamento(id_auxiliar)
);


