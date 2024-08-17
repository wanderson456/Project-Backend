const express = require('express');

const PublicRoutes = require('./routes/PublicRoutes');
const PrivateRoutes = require('./routes/PrivateRoutes');
const UserRotas = require('./routes/UserRotas');
const app = express()

app.use(express.json())

app.get('/', (request,response)=>{
    return response.send(" express")
})
app


const host = 'localhost'
const port = 3000;
app.use(UserRotas)
app.use(PublicRoutes);
app.use(PrivateRoutes)


app.listen(3000,'localhost',()=>{
    console.log(`servidor executando em http://${host}:${port}`)

});