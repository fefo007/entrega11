const mongoose =require ("mongoose");
const {optionMongoDb} = require('../options/mongoDb')

mongoose.connect(optionMongoDb)

class ClienteMongoMsj {
    constructor(collectionName,schema){
        this.collection=mongoose.model(collectionName,schema)
    }
    async save(msj){
        try{
            const itemSave= await this.collection.create(msj)
            return {...itemSave,id:itemSave._id}}
        catch (error){
            console.log('error de escritura')
        }
    }
    async getAll(){
        try {
            const files = []
            let file = await this.collection.find({},{__v:0})
            file.forEach(doc=>{
                files.push({id: doc.id,...doc.data()})
            })
            return files
        }
        catch(err){
            console.log('no se pudo cargar el archivo')
        }
    }
}

module.exports=ClienteMongoMsj