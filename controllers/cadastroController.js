let DAOUsuario = require("../model/DAOUsuario");
let DAONegocio = require("../model/DAONegocio");


exports.showView = (req, res, next) => {
    res.render('pages/cadastro',{
        title: "Cadastro",
        scriptEspecial: ""
    });    
};


exports.cadUsuario = (req, res, next) => {
    let usuario = {
        nm_usuario: req.body.nm_usuario,
        nm_email: req.body.nm_email,
        cd_senha: req.body.cd_senha,
        cd_cpf: req.body.cd_cpf,
        ic_negocio: req.body.ic_negocio
       
    }
    let daoUsuario = new DAOUsuario();
    daoUsuario.criarUsuario(usuario, res);
};



exports.cadNegocio = (req, res, next) => {
    let negocio = {
        ds_razao_social: req.body.ds_razao_social,
        ds_fantasia: req.body.ds_fantasia,
        cd_cnpj: req.body.cd_cnpj,
        cd_pix: req.body.cd_pix,
        cd_cep: req.body.cd_cep,
        ds_logradouro: req.body.ds_logradouro,
        nm_cidade: req.body.nm_cidade,
        sg_uf: req.body.sg_uf,
        im_logo: req.body.im_logo,
        cd_usuario: req.body.cd_usuario
       
    }
    let daoNegocio = new DAONegocio();
    daoNegocio.criarNegocio(negocio, res);
};