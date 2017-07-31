const TodoList = require('../models/todoList');
const Categories = require('../models/categories');
const todoListController = {};

todoListController.index = function(req, res) {
  TodoList.findAll(process.env.CURRENT_USER)
    .then(function(todoList) {
      console.log(todoList);
      res.render('todoList/todoList-index', {
        currentPage: 'index',
        message: 'Data found',
        data: todoList,
      } );
    }).catch(function(err){
      console.log(err);
      res.status(500).json(err);
    })
};

todoListController.show =function(req, res){
  TodoList.findById(req.params.id)
  .then(function(todoList){
    res.render("todoList/todoList-single",{
      currentPage:"show",
      message:"ok",
      data:todoList,
    });
  }).catch(function(err){
    console.log(err);
    res.status(500);json(err);
  });

};


todoListController.create = function(req, res){
  TodoList.create({
    description: req.body.description,
    detail: req.body.detail,
    todoDate: req.body.todoDate,
    todoTime: req.body.todoTime,
    state: req.body.state,
    category_id: 1,
    user_id:  process.env.CURRENT_USER,
  }).then(function(){
    res.redirect('/todoList');
  }).catch(function(err){
    console.log(err);
    res.status(500).json(err);
  });
};


todoListController.edit = function(req,res){
  TodoList.findById(req.params.id)
    .then(function(todoList){
    console.log(todoList);
    res.render("todoList/todoList-edit",{
      currentPage:"edit",
      message:"ok",
      data:todoList,
      data2:todoList,
      });
    }).catch(function(err){
      console.log("blah");
      res.status(500).json(err);
    })
};


todoListController.update = function(req, res){
  TodoList.update({
    description: req.body.description,
    detail: req.body.detail,
    todoDate: req.body.todoDate,
    todoTime: req.body.todoTime,
    state: req.body.state,
    category_id: 1,
    user_id: process.env.CURRENT_USER,
  }, req.params.id).then(function(todoList){
    res.redirect(`/todoList/${req.params.id}`);
  }).catch(function(err){
    console.log(err);
    res.status(500).json(err);
  });
};


todoListController.loadCategories = function(req,res){
  TodoList.loadCategories()
    .then(function(categories){
    res.render("todoList/todoList-add",{
      currentPage:"add",
      message:"ok",
      data:todoList,
      });
    }).catch(function(err){
      console.log("blah");
      res.status(500).json(err);
    })
};

todoListController.delete = function(req, res) {
  TodoList.destroy(req.params.id)
    .then(function(){
      res.redirect('/todoList');
    }).catch(function(err){
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = todoListController;
