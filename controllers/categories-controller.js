const Category = require('../models/categories');

const categoryController = {};

categoryController.index = function(req, res) {
  Category.findAll()
    .then(function(categories){
      res.render('categories/category-index', {
        currentPage: 'index',
        message: 'ok',
        data: categories,
      });
    }).catch(function(err){
      console.log(err);
      res.status(500).json(err);
    })
};

categoryController.show = function(req, res){
  Category.findById(req.params.id)
    .then(function(category){
      res.render('categories/category-single', {
        currentPage: 'show',
        message: 'ok',
        data: category,
      });
    }).catch(function(err){
      console.log(err);
      res.status(500).json(err);
    });
};

categoryController.create = function(req, res){
  Category.create({
    description: req.body.description,
  }).then(function() {
    res.redirect('/categories');
  }).catch(function(err){
    console.log(err);
    res.status(500).json(err);
  });
};

categoryController.update = function(req, res){
  Category.update({
    description: req.body.description,
  }, req.params.id).then(function(category){
    res.redirect(`/categories/${req.params.id}`);
  }).catch(function(err){
    console.log(err);
    res.status(500).json(err);
  });
};

categoryController.edit = function(req, res) {
  Category.findById(req.params.id)
    .then(function(category){
      res.render('categories/category-edit', {
        currentPage: 'edit',
        data: category,
      });
    }).catch(function(err){
      console.log(err);
      res.status(500).json(err);
    });
};

categoryController.delete = function(req, res) {
  Category.destroy(req.params.id)
    .then(function(){
      res.redirect('/categories');
    }).catch(function(err){
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = categoryController;
