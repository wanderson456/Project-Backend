const {  DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');
const ProductsModel = require('../models/ProductsModel');
const CategoryModel = require('../models/CategoryModel');
class Product_CategoryModel extends Model {
  
    
  
}

Product_CategoryModel.init(
  {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
     },
    product_id:{
        type: DataTypes.INTEGER,
        references: {
          model: ProductsModel,
          key: 'id',
        },
        allowNull: false,
    },
    category_id:{
        type: DataTypes.INTEGER,
        references: {
          model: CategoryModel,
          key: 'id',
        },
        allowNull: false,
    },
  },
  {
    timestamps:false,
   tableName: 'product_category',
    sequelize: connection,
    
    
  },
);

module.exports = Product_CategoryModel;