const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const {Server:HttpServer}=require('http');
const {Server:IOServer}=require('socket.io');
const httpServer=new HttpServer(app);
const io=new IOServer(httpServer);
// const {crearTablaProductos,crearTablaMensages}= require('./src/tableCreate')
const {saveMsjInDB,retriveMsj,saveProdInDB,retriveProd}=require('./src/DBfunctions')
const {Router}= require('express')
const routerTest =new Router()
const {testProducts} = require('./src/mock/faker')
const {normalize,schema}= require('normalizr')
// CREACION DE TABLAS
// crearTablaProductos('products1',optionsMaria)
// crearTablaMensages('messages1',optionsLite3)

let messages = [];
let products = [];


app.use(express.static('public'));
app.engine("handlebars",engine())
app.set("view engine","handlebars")
app.set("views","./views")

routerTest.use(express.json())
routerTest.use(express.urlencoded({ extended: true }))

routerTest.get('/api/productos-test',async (req,res)=>{
    let testList=testProducts()
    res.render("table",{ testList })})



io.on('connection',socket=> {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);
    socket.emit('products',products);
    socket.on('new-message',data=> {
        messages.push(data); 
        saveMsjInDB(messages)
        // NROMALIZAR
        let dataForNorm={id:'msj',msj:messages}
        const author = new schema.Entity('author')
        const date = new schema.Entity('date')
        const post = new schema.Entity('post')
        const normalizrStructure = new schema.Entity('normalizrStructure',{
        author:author, 
        text:post,
        date:date,
        })
        const normalizrData = normalize(dataForNorm,normalizrStructure)
        io.sockets.emit('messages', normalizrData); 
    });
    socket.on('new-product',data2=> {
        products.push(data2);
        saveProdInDB(products)
        io.sockets.emit('products', products);
    })    
});


const PORT = process.env.PORT || 8080;

const server = httpServer.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${server.address().port}`);
})
server.on('error', error => console.log(`Error en servidor ${error}`))
