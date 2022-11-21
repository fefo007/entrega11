const {optionsMaria}=require('../options/mariaDB')
// const {optionsLite3}=require('../options/sqlite3')
// const ClienteSqlMsj = require('./sqlMsj')
const ClienteSqlProd = require('./sqlProd')
const ClienteMongoMsj= require('./mongoMsj')
const mensagesMongoDb = new ClienteMongoMsj('mensages',{author:{type:String,required:true},timeStamp:{trype:Number},text:{type:String,required:true}})
// const mensagesDb=new ClienteSqlMsj(optionsLite3)
const productosDb=new ClienteSqlProd(optionsMaria)

async function saveMsjInDB(mensajes){
    try{
        await mensagesMongoDb.insertarArticulos(mensajes)
        console.log(mensajes)
    }
    catch(err){
        console.log(err)
    }}
async function retriveMsj(){
    try{
        let msj=await mensagesMongoDb.listarArticulos()
        console.log(msj)
    }
    catch(err){
        console.log(err)
    }}

async function saveProdInDB(productos){
    try{
        await productosDb.insertarArticulos(productos)
        console.log(productos)
        let prod=await productosDb.listarArticulos()
        console.log(prod)
    }
    catch(err){
        console.log(err)
    }}
async function retriveProd(){
    try{
        let prod=await productosDb.listarArticulos()
        console.log(prod)
    }
    catch(err){
        console.log(err)
    }
}

module.exports= {saveMsjInDB,retriveMsj,saveProdInDB,retriveProd}