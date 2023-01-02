const fs = require('fs');
const data = require('./prize.json');
const pool = require('./sql/db');

const categories = [];
const years = [];
const laureatess = [];


for(const prize of data) {
    let categoryName = prize.category;
    if(categories.find(category => category == categoryName) == undefined) {
        categories.push(categoryName);
        pool.query('INSERT INTO categorie (libelle_categorie) VALUES ($1)', [categoryName], (error, results) => {
            if(error) {
                throw error;
            }
        });
    }
}

for(const prize of data){
    if(prize.laureates == undefined) {
        continue;
    }
    for(const laureates of prize.laureates){
        let id_laureat = laureates.id;
        let firstname = laureates.firstname;
        let surname = laureates.surname;
        if(laureatess.find(id => id == id_laureat) == undefined) {
            laureatess.push(id_laureat);
            pool.query('INSERT INTO laureat (id_laureat, firstname, surname) VALUES ($1, $2, $3)', [id_laureat, firstname, surname], (error, results) => {
                if(error) {
                    throw error;
                }
            });
        }
    }
}

for (const prize of data) {
    if(prize.laureates == undefined) {
        continue;
    }
    for(const laureates of prize.laureates){
        let id_laureat = laureates.id;
        let year = prize.year;
        let motivation = laureates.motivation;
        let categoryName = prize.category;

        pool.query('SELECT id_categorie FROM categorie WHERE libelle_categorie = $1', [categoryName], (error, results) => {
            if(error) {
                throw error;
            }
            let id_categorie = results.rows[0].id_categorie;
            pool.query('INSERT INTO prix (id_laureat, id_categorie, annee, motivation) VALUES ($1, $2, $3, $4)', [id_laureat, id_categorie, year, motivation], (error, results) => {
                if(error) {
                    throw error;
                }
            });
        });
    }
}