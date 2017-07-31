const db = require('../db/config');

const Category = {};

Category.findAll = function() {
  return db.query('SELECT * FROM categories');
}

Category.findById = function(id){
  return db.one(`SELECT * FROM categories WHERE id = $1 `, [id]);
}

Category.create = function(Category) {
  return db.one(`INSERT INTO categories VALUES (default, $1) RETURNING * `
    , [Category.description]);
}

Category.update = function(Category, id){
  return db.one(` UPDATE categories SET description = $1 WHERE id = $2
    RETURNING *`, [Category.description, id]);
}

Category.destroy = function(id){
  return db.none(` DELETE FROM Categories WHERE id = $1 `, [id]);
}

module.exports = Category;
