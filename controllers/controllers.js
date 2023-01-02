const validator = require('validator');
const pool = require('../sql/db');
const queries = require('../sql/queries');

function simplifyRequest(array, ...fieldsToArray) {
    return array.reduce( (previous, next) => {
        const index = previous.findIndex(element => element.id_personne === next.id_personne)
        if (index === -1) {
            const element = {}
            for (const property in next) {
                if ( fieldsToArray.includes(property) ) element[property] = [next[property]]
                else element[property] = next[property]
            }
            previous.push(element)
        }
        else {
            for (const property in next) {
                if ( fieldsToArray.includes(property) ) previous[index][property].push(next[property])
            }
        }
        return previous
    }, [])
}

// 1
exports.listerLaureats = (req, res) => {
    pool.query(queries.listerLaureats, (error, results) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        return res.status(200).send(results.rows);
    })
};

// 2
exports.laureateId = (req, res) => {
    const id = req.params.id;
    pool.query(queries.laureatId, [id], (error, result) => {
        if (error) {
            return res.status(400).send({ success: 0, data: error });
        }
        const array = simplifyRequest(result.rows, 'annee', 'libelle_categorie', 'motivation')
        return res.status(200).send(array);
    })
};

// 3
exports.getNbLaureatesManyPrizes = (req, res) => {
    pool.query(queries.laureatAvecPlusieursRecompenses, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: 0, data: error });
        }
        return res.status(200).send({
            success: 1,
            data: results.rows,
        });
    });
};

// 4
exports.getCategories = (req,res) => {
    pool.query(queries.categorie, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: 0, data: error });
        }
        return res.status(200).send({
            success: 1,
            data: results.rows,
        });
    });
};

// 5
exports.getCategoryWithMostLaureates = (req, res) => {
    pool.query(queries.categoriePlusDeLaureats, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: 0, data: error });
        }
        return res.status(200).send({
            success: 1,
            data: results.rows,
        });
    });
};

// 6
exports.getYearsLaureates = (req, res) => {
    pool.query(queries.nbLaureatsParAnnee, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: 0, data: error });
        }
        return res.status(200).send({
            success: 1,
            data: results.rows,
        });
    });
};

exports.getYearsAscDesc = (req, res) => {
    let sort = req.query.sort;
    if (sort === 'asc_laureates') {
        pool.query(queries.laureatesAsc, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: 0, data: error });
            }
            return res.status(200).send({
                success: 1,
                data: results.rows,
            });
        });
    }
    else if (sort === 'desc_laureates') {
        pool.query(queries.laureatesDesc, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: 0, data: error });
            }
            return res.status(200).send({
                success: 1,
                data: results.rows,
            });
        });
    }  
    else {
        return res.status(400).send({ success: 0, data: 'Bad request' });
    }
};

exports.deleteLaureateById = (req, res) => {
    const id = req.params.id;
    // first delete prix and then delete personne
    pool.query(queries.deletePrix, [id], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: 0, data: error });
        }
        pool.query(queries.deleteLaureat, [id], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: 0, data: error });
            }
            return res.status(200).send({
                success: 1,
                data: "Laureate deleted",
            });
        });
    });
};

exports.updateMotivationLaureateById = (req, res) => {
    const id = req.params.id;
    const motivation = req.body.motivation;
    const categorie = req.body.categorie;
    const annee = req.body.annee;
    if (validator.isEmpty(motivation) || validator.isEmpty(categorie) || validator.isEmpty(annee)) {
        return res.status(400).send({ success: 0, data: 'Bad request' });
    }
    pool.query(queries.updateMotivation, [motivation, id, annee, categorie], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ success: 0, data: error });
        }
        return res.status(200).send({
            success: 1,
            data: "Motivation updated",
        });
    });
}