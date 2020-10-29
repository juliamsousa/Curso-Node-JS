-- quando trabalhamos com postgres trabalhamos com tabelas
-- caso a tabela já exista ela é removida
DROP TABLE IF EXISTS TB_HEROIS;

-- criacao da tabela
CREATE TABLE TB_HEROIS (
    -- id gerado automaticamente, é chave primaria e nao nulo
    -- sempre que um dado é inserido o id já é gerado automaticamente
     ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY    NOT NULL,
     NOME  TEXT    NOT NULL,
     PODER TEXT    NOT NULL
);

-- create
-- insere itens na tabela
INSERT INTO TB_HEROIS
    (NOME, PODER)
VALUES
    ('Flash', 'Velocidade'),
    ('Batman', 'Dinheiro'),
    ('Aquaman', 'Marinho');

-- read
-- lê todos os itens da tabela
SELECT *
FROM TB_HEROIS;

-- update
-- atualiza o nome e o pdoer do dado que possui id 1
UPDATE TB_HEROIS 
SET NOME = 'Goku', PODER= 'Deus'
WHERE ID = 1;

--delete
-- apaga o heroi com id 2
DELETE FROM TB_HEROIS WHERE ID = 2;