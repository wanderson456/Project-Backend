const connection = require('../config/connection');
require ('../models/UserModel')
require ('../models/CategoryModel')
require ('../models/ProductsModel')
require ('../models/ProductImagesModel')
require ('../models/ProductOptionsModel')

connection.sync({force: true});