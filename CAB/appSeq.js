const { Sequelize, DataTypes, Op } = require('sequelize')

const sequelize = new Sequelize("cab", "root", "root", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    })

const tbl_passenger = sequelize.define('tbl_passenger', {
    p_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    mobile: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});


tbl_passenger.sync({ alter: true });
// var user = await User.create({name: 'hothri', email: 'hothri@mail.com', age: 22})
//or
tbl_passenger.create({ name: 'vihan', user_name: 'vihan', email: 'vihan@mail.com', password: 'Vihan@123', mobile: 7676433434, address: 'vihan bhavan', dob: 1998 - 05 - 09 })
    .then((tbl_passenger) => {
        console.log("data saved successfully", tbl_passenger.toJSON());
    })
    .catch(err => {
        console.log(err)
    })

    tbl_passenger.findAll({
}).then((tbl_passenger)=>{
    console.log(tbl_passenger);
    tbl_passenger.forEach((tbl_passenger)=>{
        console.log(tbl_passenger.dataValues.p_id,tbl_passenger.dataValues.name)
    })
})
// or
// User.findByPk(1).then(user=>{
//     console.log(user.dataValues.id, user.dataValues.name)
// })

