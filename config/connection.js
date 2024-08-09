const {Sequelize,DataTypes} = require("sequelize");

const connection = new Sequelize({
    dialect:'mysql',
    database :"blog",
    port:3306,
    host :"localhost",
    username : "root",
    password :"root"
});


module.exports= connection;