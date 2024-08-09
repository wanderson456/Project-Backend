const connection = require('../config/connection');
require ('../models/UserModel')

connection.sync({force: true});