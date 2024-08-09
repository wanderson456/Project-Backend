const connection = require('../config/connection');
require ('../models/UserModel')
require ('../models/CategoryModel')

connection.sync({force: true});