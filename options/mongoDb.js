
const optionMongoDb={
    cnxStr:'mongodb://localhost/ecommerce',
    options:{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        serverSelectionTimeoutMS:5000,
    }
}

module.exports=optionMongoDb