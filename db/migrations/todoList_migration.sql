\c todo_list_dev ;
CREATE TABLE IF NOT EXISTS todoList (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255)  NOT NULL,
  detail TEXT  NOT NULL,
  todoDate Date NOT NULL,
  todoTime time  NOT NULL,
  state VARCHAR(1) NOT NULL,
  category_id INTEGER REFERENCES categories(id) NULL,
  user_id INTEGER REFERENCES users(id) NULL
);
