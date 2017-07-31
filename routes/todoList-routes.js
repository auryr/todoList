const express = require('express');
const todoListRoutes = express.Router();
const authHelpers = require('../services/auth/auth-helpers');
const todoListController = require('../controllers/todoList-controller');


todoListRoutes.get('/', authHelpers.loginRequired,todoListController.index);
todoListRoutes.post('/',authHelpers.loginRequired,todoListController.create);

todoListRoutes.get('/add',authHelpers.loginRequired, (req, res) => {
  res.render('todoList/todoList-add', {
    currentPage: 'add',
  });
});

todoListRoutes.get('/:id', todoListController.show);
todoListRoutes.get('/:id/edit', authHelpers.loginRequired, todoListController.edit);
todoListRoutes.put('/:id', authHelpers.loginRequired, todoListController.update);
todoListRoutes.delete('/:id',authHelpers.loginRequired, todoListController.delete);

module.exports = todoListRoutes;
