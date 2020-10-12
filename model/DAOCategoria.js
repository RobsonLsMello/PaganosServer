const DAO = require("./DAO");

module.exports = class mostrarCategorias{
    constructor(){
        this.dao = new DAO();
    }

    mostrarCategorias(res){
        
        this.dao.conn.query(
            'call sl_mostrar_categorias()',
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result[0]})
            });  

    }
}