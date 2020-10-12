
let DAO = require("./DAO");

module.exports = class DAOCampanha{
    constructor(){
        this.dao = new DAO();
    }

    
    pesquisarCampanha(params,res){
        console.log(params);
        this.dao.conn.query(
            'call sl_mostrar_dados_campanhas(?,?,?)',[params.cd_negocio,params.dt_max, params.dt_min],
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result})
            });  

    }

    cadastraCampanha(params,res){

        this.dao.conn.query(
            'call in_cadastrar_campanha(?,?,?,?,?,?,?,?, ?, ?)',[
                params.nm_campanha,
                params.ds_headline, 
                params.vl_lance_minimo,
                params.ds_campanha, 
                params.im_foto, 
                params.cd_negocio, 
                params.cd_categoria, 
                params.vl_meta,
                params.dt_inicio_campanha,
                params.dt_final_campanha
            ],           
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result[0]})
            });  

    }

    topInvestimentoCampanhas(params,res){

        this.dao.conn.query(
            'call sl_campanhas_topinvestimento(?)',[params.cd_categoria],           
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result[0]})
            }); 

    }

    filtrarCampanhas(params,res){

        this.dao.conn.query(
            'call sl_filtrar_campanhas(?,?,?)',[params.cd_categoria,params.vl_lance, params.ds_localizacao],           
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result[0]})
            }); 

    }

    mostrarCampanha(params,res){

        this.dao.conn.query(
            'call sl_mostrar_campanha(?)',[params.cd_campanha],           
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result[0]})
            }); 

    }

    filtrarCampanhasPorTermo(params,res){

        this.dao.conn.query(
            'call sl_procurar_campanhaPorTermo(?)',[params.ds_termo],           
            (error, result, fields) =>{
                this.dao.conn.end();
                if (error) {return res.status(500).send({error:error,response: null})}       
                res.status(200).send({Dados: result[0]})
            }); 

    }


}