const DAO = require("./DAO");

module.exports = class UsuarioDAO{
    constructor(){
        this.dao = new DAO();
    }

    cadRedeSocial(params,res){
        
        this.dao.conn.query(
            'call in_cadastrar_redeSocial(?,?,?)',[params.cd_usuario,
            params.nm_rede_social,
            params.cd_tipo_rede_social],        
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result[0]})
            });  
    }

    mostrarRedesSociais(params, res){
        this.dao.conn.query(
            'call sl_mostrar_redesSociais(?)', [params.cd_campanha],
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result[0]})
            });  

    }
}