const connection = require('../config/connection');
require ('../models/UserModel')
require ('../models/CategoryModel')
require ('../models/ProductsModel')

connection.sync({force: true});