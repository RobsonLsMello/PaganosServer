const DAO = require("./DAO");

module.exports = class UsuarioDAO{
    constructor(){
        this.dao = new DAO();
    }
    
    realizarInvestimento(params,res){
        
        this.dao.conn.query(
            'call in_criar_investimento(?,?,?,?)',[params.vl_investimento,
            params.cd_campanha,params.cd_investidor,params.cd_transacao],
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result})
            });  
    }

    mostrarInvestimentos(params,res){
        console.log(params);
        this.dao.conn.query(
            'call sl_mostrar_dados_investimentos(?,?,?)',[params.cd_usuario,
            params.dt_max,params.dt_min],
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result})
            });  
    }

    
    mostrarInvestidores(params,res){
        
        this.dao.conn.query(
            'call sl_mostrar_investidores(?)',[params.cd_campanha],
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result})
            });  
    }

    
}