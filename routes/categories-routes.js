const express = require('express');
const categoryRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

const categoriesController = require('../controllers/categories-controller');


categoryRoutes.get('/', authHelpers.loginRequired,categoriesController.index);
categoryRoutes.post('/',authHelpers.loginRequired,categoriesController.create);

categoryRoutes.get('/add',authHelpers.loginRequired, (req, res) => {
  res.render('categories/category-add', {
    currentPage: 'add',
  });
});

categoryRoutes.get('/:id', authHelpers.loginRequired,categoriesController.show);
categoryRoutes.get('/:id/edit', authHelpers.loginRequired, categoriesController.edit);
categoryRoutes.put('/:id',  authHelpers.loginRequired, categoriesController.update);
categoryRoutes.delete('/:id', authHelpers.loginRequired,categoriesController.delete);

module.exports = categoryRoutes;

