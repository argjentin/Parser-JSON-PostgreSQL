// 1 Lister tous les lauréats (id, prénom, nom).
const listerLaureats = "select id_laureat, firstname, surname from laureat;"


// 2  Étant donné un identifiant, affichez les informations du lauréat avec cet identifiant (prénom, nom, les prix remportés).
const laureatId = "select laureat.id_laureat, laureat.firstname, laureat.surname, prix.annee, prix.motivation, libelle_categorie from laureat inner join prix on laureat.id_laureat = prix.id_laureat inner join categorie on prix.id_categorie = categorie.id_categorie where laureat.id_laureat = $1;"


// 3 Combien ont remporté plus d'un prix Nobel ?
const laureatAvecPlusieursRecompenses = "select laureat.firstname, laureat.surname, count(prix.id_laureat) as number_of_prizes  from laureat  inner join prix on laureat.id_laureat = prix.id_laureat group by laureat.id_laureat having count(prix.id_laureat) > 1;"


// 4 Lister toutes les catégories des prix nobel
const categorie = "select libelle_categorie from categorie;"


// 5 : Déterminez quelle catégorie a produit le plus grand nombre de lauréats du prix Nobel.
const categoriePlusDeLaureats = "select libelle_categorie, count(prix.id_laureat) as number_of_laureats from categorie inner join prix on categorie.id_categorie = prix.id_categorie group by libelle_categorie order by number_of_laureats desc limit 1;"


// 6 Pour chaque année, indiquez combien de lauréats avaient remporté un prix nobel.
const nbLaureatsParAnnee = "select annee, count(*) from prix group by annee order by annee;"


// 8 Afficher toutes les années de prix nobel triées par nombre de lauréats ascendant/descendant.
const laureatesDesc = "select annee, count(*) as nblaureates from prix group by annee order by count(*) desc;"
const laureatesAsc = "select annee, count(*) as nblaureates from prix group by annee order by count(*) asc;"


// 9 Supprimer un lauréat avec un identifiant donné maus avant supprimer tous les prix nobel remportés par ce lauréat. 
const deleteLaureat = "delete from laureat where id_laureat = $1;"
const deletePrix = "delete from prix where id_laureat = $1;"


// Mettre à jour la motivation d'un lauréat avec un identifiant donné dans une année donnée et une catégorie donnée.
const updateMotivation = "update prix set motivation = $1 where id_laureat = $2 and annee = $3 and id_categorie = $4;"

module.exports = {
    listerLaureats, laureatId, laureatAvecPlusieursRecompenses, categorie, categoriePlusDeLaureats, nbLaureatsParAnnee, deleteLaureat, laureatesDesc, laureatesAsc, deletePrix, updateMotivation
};