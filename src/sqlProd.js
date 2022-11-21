const knexLib=require('knex') 

class ClienteSql {
    constructor(config) {
        this.knex = knexLib(config)
    }
    insertarArticulos(items) {
        return this.knex('products1').insert(items)
    }   
    listarArticulos() {
        return this.knex('products1').select('*')
    }   
    close() {
        this.knex.destroy();
    }
}

module.exports= ClienteSql