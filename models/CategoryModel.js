const {  DataTypes, Model } = require('sequelize');
const connection = require('../config/connection');

class CategoryModel extends Model {
  static associate({ ProductImagesModel, ProductOptionsModel, ProductCategoryModel }) {
    CategoryModel.belongsToMany(ProductModel, {
      through: ProductCategoryModel,
      as: 'products',
      foreignKey: 'category_id',
      otherKey: 'product_id'
  });
    
  
}
}

CategoryModel.init(
  {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true },
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
        allowNull: false,

    },
    
  },
  {
    timestamps:true,
   tableName: 'category',
    sequelize: connection,
    
    
  },
);

module.exports = CategoryModel;