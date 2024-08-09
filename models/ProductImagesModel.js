const {  DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');
const ProductsModel = require('../models/ProductsModel');

class ProductImagesModel extends Model {
  
    
  
}

ProductImagesModel.init(
  {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },

    product_id:{
        type:DataTypes.INTEGER,
        references: { 
            model: ProductsModel,
              key: 'id' },
          
      },
    enabled:{
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      allowNull: true,
    }, 

    path:{
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    
  },
  {
  timestamps:false,
   tableName: 'productimages',
    sequelize: connection,
    
    
  },
);

module.exports = ProductImagesModel;