const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

const usersController = {};

usersController.index = function(req, res) {
  console.log('userController');
  User.findUserTodoList(req.user.id)
    .then(function(todolist){
      res.render('todolist/todolist-index', {
        currentPage: 'index',
        message: 'ok',
        data: todolist,
      });
    }).catch(function(err){
      console.log(err);
      res.status(500).json({err: err});
    });
}

usersController.create = function(req, res){
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({
    username: req.body.username,
    email: req.body.email,
    password_digest: hash,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }).then(function(user){
    req.login(user, function(err){
      if (err) return next(err);
      res.redirect('/user');
    });
  }).catch(function(err){
    console.log(err);
    res.status(500).json({error: err});
  });
}

module.exports = usersController;
