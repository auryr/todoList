const db = require('../db/config');

const User = {};

User.findByUserName = userName => {
  return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
  `, [userName]);
};

User.create = user => {
  return db.one(`
    INSERT INTO users
    (username, email, password_digest, firstname, lastname)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `, [user.username, user.email, user.password_digest, user.firstname, user.lastname]);
};

User.findUserTodoList = id => {
  return db.manyOrNone(`
    SELECT t.*, to_char(t.tododate,'mm/dd/yyyy') as tododatestr,
    to_char(t.todotime,'HH12:MI:SS') as todotimestr,c.description as category FROM todoList t
    inner join categories c on t.category_id=c.id
    WHERE user_id = $1
  `, [id]);
};

module.exports = User;
