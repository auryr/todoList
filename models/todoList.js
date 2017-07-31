const db = require("../db/config");
const TodoList = {};

TodoList.findAll = function(user_id) {
  return db.query(`SELECT t.*, to_char(t.tododate,'mm/dd/yyyy') as tododatestr,
    to_char(t.todotime,'HH12:MI:SS') as todotimestr,c.description as category FROM todoList t
    inner join categories c on t.category_id=c.id WHERE user_id= $1 ORDER BY tododate`,[user_id]);
}

TodoList.findById = function(id){
 return db.query(`SELECT t.*, to_char(t.tododate,'yyyy-MM-dd') as tododatestr,
    to_char(t.todotime,'HH12:MI:SS') as todotimestr,c.description as category FROM todoList t
    inner join categories c on t.category_id=c.id WHERE t.id = $1; SELECT * FROM categories;`, [id]);
}

TodoList.create = function(TodoList) {
 return db.one(`INSERT INTO todoList(description ,detail, todoDate, todoTime,state,category_id,user_id)
  VALUES ( $1, $2, $3, $4, $5, $6, $7)
  RETURNING * `, [TodoList.description ,TodoList.detail,TodoList.todoDate, TodoList.todoTime,"P",TodoList.category_id,TodoList.user_id] );
}//

TodoList.update = function(TodoList, id){
 return db.one(` UPDATE todoList SET description = $1, detail = $2, todoDate = $3,
  todoTime = $4, state = $5, category_id=$6, user_id=$7 WHERE id = $8
  RETURNING *`, [TodoList.description ,TodoList.detail ,TodoList.todoDate, TodoList.todoTime,"P",TodoList.category_id, TodoList.user_id,id]);
}

TodoList.destroy = function(id){
  return db.none(` DELETE FROM todoList WHERE id = $1 `, [id]);
}

TodoList.loadCategories = function() {
  return db.query('SELECT * FROM categories');
}

module.exports = TodoList;
