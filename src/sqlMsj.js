const knexLib=require('knex') 

class ClienteSql {
    constructor(config) {
        this.knex = knexLib(config)
    }
    insertarArticulos(items) {
        return this.knex('messages1').insert(items)
    }   
    listarArticulos() {
        return this.knex('messages1').select('*')
    }   
    close() {
        this.knex.destroy();
    }
}

module.exports= ClienteSql