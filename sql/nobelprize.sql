DROP TABLE IF EXISTS prix;
DROP TABLE IF EXISTS categorie;
DROP TABLE IF EXISTS laureat;

SET client_encoding = 'UTF8';

CREATE TABLE laureat(
   id_laureat SERIAL,
   firstname TEXT,
   surname TEXT,
   PRIMARY KEY(id_laureat)
);

CREATE TABLE categorie(
   id_categorie SERIAL,
   ie VARCHAR(50),
   PRIMARY KEY(id_categorie)
);

CREATE TABLE prix(
   id_laureat INT,
   annee VARCHAR(4),
   id_categorie INT,
   motivation TEXT,
   overallMotivation TEXT,
   PRIMARY KEY(id_laureat, annee, id_categorie),
   FOREIGN KEY(id_laureat) REFERENCES laureat(id_laureat),
   FOREIGN KEY(id_categorie) REFERENCES categorie(id_categorie)
);