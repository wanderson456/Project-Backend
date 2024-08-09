const express = require('express');
const app = express()
const UserRotas = require('./routes/UserRotas');
const CategoryRotas = require('./routes/CategoryRotas');
const ProductsRotas = require('./routes/ProductsRotas');
const host = 'localhost'
const port = 3000;
app.use(express.json())
app.get('/', (request,response)=>{
    return response.send(" testando server ")
})

app.use( UserRotas)
app.use( CategoryRotas)
app.use( ProductsRotas)
app.listen(3000,'localhost',()=>{
    console.log(`servidor executando em http://${host}:${port}`)

});