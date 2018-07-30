var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  //port: '/var/run/mysqld/mysqld.sock',
  // insecureauth: true,
  database: 'chorecat'
});

connection.connect(function(err) {
  if (err) { throw err } else { console.log('connected to MySQL') }
});

const addChore = (chore) =>
  new Promise((resolve, reject) => {
    connection.query(`INSERT INTO chores SET ?`, {chore_name: chore}, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    });
  })

const deleteChore = (chore_id) =>
  new Promise((resolve, reject) => {
    connection.query(`DELETE FROM chores WHERE ?`, {id: chore_id}, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    })
  })

const editChore = (chore_id, newChore) =>
  new Promise((resolve, reject) => {
    connection.query(`UPDATE chores SET ? WHERE ?`, [{chore_name: newChore}, {id: chore_id}], (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    })
  })

const addUser = (user, password) =>
  new Promise((resolve, reject) => {
    connection.query(`INSERT INTO users SET ?`, {user_name: user, password: password}, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    })
  })

const deleteUser = (user_id) =>
  new Promise((resolve, reject) => {
    connection.query(`DELETE FROM users WHERE ?`, {id: user_id}, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    })
  })

const editUser = (user_id, newUser) =>
  new Promise((resolve, reject) => {
    connection.query(`UPDATE users SET ? WHERE ?`, [{user_name: newUser}, {id: user_id}], (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    })
  })

const completeChore = (user_id, chore_id, day) =>
  new Promise((resolve, reject) => {
    connection.query(`INSERT INTO completedChores (user_id, chore_id, day) VALUES ((SELECT ID from users WHERE ?), (SELECT ID from chores WHERE ?), ?)`, [{id: user_id}, {id: chore_id}, day], (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    })
  })

const findAll = (table) =>
  new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} `, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    })
  })

const getAllCompletedChores = () =>
  new Promise((resolve, reject) => {
    connection.query(`SELECT users.user_name, chores.chore_name, completedChores.day FROM users INNER JOIN completedChores ON users.id = completedChores.user_id INNER JOIN chores ON completedChores.chore_id = chores.id`, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    })
  })

const clearAllChores = () =>
  new Promise((resolve, reject) => {
    connection.query(`DELETE from completedChores`, (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    })
  })

const findUser = (params, data) =>
  new Promise((resolve, reject) => {
    connection.query(`SELECT ?? FROM users WHERE ?`, [params, data], (err, results) => {
      if (err) { reject(err) } else { resolve(results) }
    })
  })





module.exports.addChore = addChore;
module.exports.editChore = editChore;
module.exports.deleteChore = deleteChore;
module.exports.addUser = addUser;
module.exports.editUser = editUser;
module.exports.deleteUser = deleteUser;
module.exports.completeChore = completeChore;
module.exports.getAllCompletedChores = getAllCompletedChores;
module.exports.clearAllChores = clearAllChores;
module.exports.findAll = findAll;
module.exports.findUser = findUser;
//Consider deleting a user and how that might affect list table
//Have to consider how adding a chore, editing a chore, deleting a chore affects tables
//Have to consider how adding a user, editing a user, deleting a user affects tables
