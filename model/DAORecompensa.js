const DAO = require("./DAO");

module.exports = class RecompensaDAO{
    constructor(){
        this.dao = new DAO();
    }

    mostrarRecompensas(params,res){
        
        this.dao.conn.query(
            'call sl_mostrar_recompensas(?)',[params.cd_campanha],        
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result[0]})
            });  
    }

    mostrarTipoRecompensas(res){
        this.dao.conn.query(
            'call sl_mostrar_tipo_recompensas()',
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result[0]})
            });  

    }
}