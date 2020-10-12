const DAO = require("./DAO");

module.exports = class NegocioDAO{
    constructor(){
        this.dao = new DAO();
    }

    criarNegocio(params,res){
        
        this.dao.conn.query(
            'call in_cadastrar_negocio(?,?,?,?,?,?,?,?,?,?)',[params.ds_razao_social,
            params.ds_fantasia,params.cd_cnpj,params.cd_pix,params.cd_cep,
            params.ds_logradouro,params.nm_cidade,params.sg_uf,params.im_logo, params.cd_usuario],
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result})
            });  

    }
}