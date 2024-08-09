const connection = require('../config/connection');
require ('../models/UserModel')
require ('../models/CategoryModel')
require ('../models/ProductsModel')
require ('../models/ProductImagesModel')
require ('../models/ProductOptionsModel')
require ('../models/Product_CategoryModel')

connection.sync({force: true});