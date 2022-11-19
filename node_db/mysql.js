const http = require('http')
const qs = require('querystring')
const mysql = require('mysql2')
const read = require('readline-sync')
////////////////////////////////////////////////////////////////////////////
const connDetails = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'experion'
}
////////////////////////////////////////////////////////////////////////////
let connection = mysql.createConnection(connDetails);

let email = read.question('enter the email:')

// email = mysql.escape(email)
// const query = `SELECT * FROM customers WHERE email=${email}`;
const query = `SELECT * FROM customers WHERE email=? OR id > ?`;
console.log(query);

connection.connect();

connection.query(query, ['user2@mail.com',10],(err, result) => {
    console.table(result)
})
///////////////////////////////////////////////////////////////////////////
connection.end();