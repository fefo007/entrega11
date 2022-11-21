
const knex= require('knex')

async function crearTablaProductos(tableNameProd,config){
    try{
        const existTable = await knex(config).schema.hasTable(tableNameProd)
        if(existTable){
            console.log({error:'ya existe una tabla con ese nombre'})
        }
        else{
            await knex(config).schema.createTable(tableNameProd, table => {
                table.increments('id').primary();
                table.string('nombre', 50).notNullable();
                table.string('url', 10).notNullable();
                table.float('precio')})
            }
        }
    catch(error){
        console.log(error)
    }
}

async function crearTablaMensages(tableNameMsg,config){
    try{
        const existTable= await knex(config).schema.hasTable(tableNameMsg)
        if(existTable){
            console.log({error:'ya existe una tabla con ese nombre'})
        }
        else{
            await knex(config).schema.createTable(tableNameMsg,table =>{
                table.increments('id').primary();
                table.string('author', 50).notNullable();
                table.float('date')
                table.string('text', 10).notNullable();})
        }
        }
    catch(error){
        console.log(error)
    }
}

module.exports={crearTablaProductos,crearTablaMensages}