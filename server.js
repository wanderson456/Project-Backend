const express = require('express');
const app = express()
const host = 'localhost'
const port = 3000;
app.use(express.json())
app.get('/', (request,response)=>{
    return response.send(" testando server ")
})
app.listen(3000,'localhost',()=>{
    console.log(`servidor executando em http://${host}:${port}`)

});