const {  DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');
const ProductsModel = require('../models/ProductsModel');
const CategoryModel = require('../models/CategoryModel');

class ProductCategoryModel extends Model {

  
}

ProductCategoryModel.init(
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
        },onDelete:"CASCADE",
        allowNull: false,
    },
    category_id:{
        type: DataTypes.INTEGER,
        references: {
          model: CategoryModel,
          key: 'id',
        },onDelete:"CASCADE",
        allowNull: false,
    },
  },
  {
    timestamps:false,
   tableName: 'product_category',
    sequelize: connection,
    
    
  },
);

module.exports = ProductCategoryModel;