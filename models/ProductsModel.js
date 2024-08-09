const {  DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class ProductsModel extends Model {
  
    
  
}

ProductsModel .init(
  {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue:0,
        allowNull: true,
    },
    name:{
        type:DataTypes.STRING(255),
         allowNull: false,
    },
    slug:{
        type:DataTypes.STRING(255),
         allowNull: false,
    },
    use_in_menu:{
        type:DataTypes.BOOLEAN,
        defaultValue:0,
        allowNull: true,

    },
    stock:{
       type:DataTypes.INTEGER,
       defaultValue:0,
       allowNull: true, 
    },
    description:{
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    price_with_discount:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    
  },
  {
    timestamps:true,
   tableName: 'products',
    sequelize: connection,
    
    
  },
);

module.exports = ProductsModel ;