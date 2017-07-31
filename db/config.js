const options = {
  query: (e) => {
    console.log(e.query);
  }
};

const pgp = require('pg-promise')(options);
//database conection
//returns a pg-promise instance
function setDatabase() {
  if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    return pgp({
      database: 'todo_list_dev',
      port: 5432,
      host: 'localhost',
    });
  } else if (process.env.NODE_ENV === 'production') {
    return pgp(process.env.DATABASE_URL);
  }
}

const db = setDatabase();
//exports the database Conection
module.exports = db;
