
const db = require('../db-handler')

function getAll(callback) {
    var sql = "SELECT * FROM customers"
    db.executeQuery(sql, [], callback)
}

function getOne(id, callback) {
    var sql = "SELECT * FROM customers where id=?";
    db.executeQuery(sql, [id], callback)
}

function createOne(data, callback) {
    var sql = "INSERT INTO customers (name, email, age, country, dob) VALUES (?, ?, ?, ?, ?)";

    var values = [
        data.name,
        data.email,
        data.age,
        data.country,
        data.dob
    ];
    db.executeQuery(sql, values, callback)
}

function deleteOne(id, callback) {
    var sql = "DELETE FROM customers WHERE id=?";
    db.executeQuery(sql, [id], callback)
}
// function updateOne(data, callback) {
//     var sql = "UPDATE customers SET name='?' WHERE id=?";
//     var values = [
//         data.name
//     ];
//     db.executeQuery(sql, values, callback)
// }

// module.exports.getAll = getAll
// module.exports.getOne = getOne
// module.exports.createOne = createOne
// module.exports.deleteOne = deleteOne
// module.exports.updateOne = updateOne
function updateOne(data,callback){
    var sql="update customers set name=?,email=?,age=?,country=?,dob=? where id=?"
    var values=[
        data.name,
        data.email,
        data.age,
        data.country,
        data.dob,
        data.id
    ];
    db.executeQuery(sql,values,callback)
}
module.exports.getAll = getAll
module.exports.getOne = getOne
module.exports.createOne = createOne
module.exports.deleteOne = deleteOne
module.exports.updateOne = updateOne
