const express = require('express');

const jwt = require('jsonwebtoken')
const UserRouter = require('../routes/UserRotas')
const CategoryRouter = require('../routes/CategoryRotas')
const ProductsRouter = require('../routes/ProductsRotas')

require('dotenv').config()
const PrivateRouters = express.Router();



PrivateRouters.use((request,response,next)=>{
    
    //verificando autorizaçao 
    let logged = false;
    const token = request.headers.token;
    try {
        jwt.verify(token,process.env.APP_KEY_TOKEN);
        logged = true;
        
    } catch (JsonWebtokenerror) {
        logged = false;
        
    }
    if(logged === false){
        return response.status(403).send('Não autorizado')
    }
   
    next();
 

});

PrivateRouters.use(UserRouter)
PrivateRouters.use(CategoryRouter)
PrivateRouters.use(ProductsRouter)



module.exports= PrivateRouters;