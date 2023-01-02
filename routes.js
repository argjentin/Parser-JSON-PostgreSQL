const controllers = require('../controllers/controllers');
const express = require('express');
const router = express.Router();

router.get('/all', controllers.listerLaureats);

router.get('/:id', controllers.laureateId);

router.get('/prizes/manyprizes/', controllers.getNbLaureatesManyPrizes);

router.get('/prizes/categories', controllers.getCategories);

router.get('/prizes/mostlaureatecategorie/', controllers.getCategoryWithMostLaureates);

router.get('/prizes/yearslaureates/', controllers.getYearsLaureates);

router.get('/prizes/years/', controllers.getYearsAscDesc);

router.delete('/:id', controllers.deleteLaureateById);

router.put('/:id', controllers.updateMotivationLaureateById);
module.exports = router;
