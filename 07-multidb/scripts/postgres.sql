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
INSERT INTO TB_HEROIS
    (NOME, PODER)
VALUES
    ('Flash', 'Velocidade'),
    ('Batman', 'Dinheiro'),
    ('Aquaman', 'Marinho');
-- read
SELECT *
FROM TB_HEROIS;
-- update
UPDATE TB_HEROIS 
SET NOME = 'Goku', PODER= 'Deus'
WHERE ID = 1;
--delete
DELETE FROM TB_HEROIS WHERE ID = 2;