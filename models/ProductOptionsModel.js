const { DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');
const ProductsModel = require('../models/ProductsModel');

class ProductOptionsModel extends Model {}

ProductOptionsModel.init(
  {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      references: { 
        model: ProductsModel,
        key: 'id' 
      }
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,  
    },
    
    shape: {
      type: DataTypes.ENUM('square', 'circle'),
      allowNull: true,  
      defaultValue: 'square',  
    },
    
    radius: {
      type: DataTypes.INTEGER,
      allowNull: true,  
      defaultValue: 0,  
    },
    
    type: {
      type: DataTypes.ENUM('text', 'color'),
      allowNull: true,  
      defaultValue: 'text',  
    },
    
    values: {
      type: DataTypes.STRING(255),
      allowNull: false,  
    },
    
  },
  {
    timestamps: false,
    tableName: 'productoptions',
    sequelize: connection,
  },
);

module.exports = ProductOptionsModel;
