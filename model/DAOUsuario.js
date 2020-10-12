const DAO = require("./DAO");

module.exports = class UsuarioDAO{
    constructor(){
        this.dao = new DAO();
    }

    criarUsuario(params,res){
        
        this.dao.conn.query(
            'call in_cadastrar_usuario(?,?,?,?,?)',[params.nm_usuario,
            params.nm_email,params.cd_senha,params.cd_cpf,params.ic_negocio],
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result})
            });  

    }

    login(params,res){
        
        this.dao.conn.query(
            'call sp_login_usuario(?,?)',[params.nm_login,params.cd_senha],
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result[0]})
            });  

    }
    
    usuario(params,res){
        
        this.dao.conn.query(
            'call sl_mostrar_usuario(?)',[params.cd_usuario],
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result[0]})
            });  

    }

}