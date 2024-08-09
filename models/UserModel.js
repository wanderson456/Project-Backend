const {  DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class UserModel extends Model {
  
    
  
}

UserModel.init(
  {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },
    firstname:{
        type:DataTypes.STRING(255),
         allowNull: false,
    },
    surname:{
        type:DataTypes.STRING(255),
         allowNull: false,
    },
    email:{
        type:DataTypes.STRING(255),
        allowNull: false,

    },
    password:{
        type:DataTypes.STRING(255),
         allowNull: false,
    }
  },
  {
    timestamps:true,
   tableName: 'users',
    sequelize: connection,
    
    
  },
);

module.exports = UserModel;