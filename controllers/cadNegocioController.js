
let DAONegocio = require("../model/DAONegocio");

exports.get = (req, res, next) => {
    res.render('pages/cadNegocio',{
        title: "Cadastro Negocio",
        scriptEspecial: ""
    });    
};


exports.cadNegocio = (req, res, next) => {
    let negocio = {
        rsocial: req.body.rsocial,
        fantasia: req.body.fantasia,
        cnpj: req.body.cnpj,
        pix: req.body.pix,
        cep: req.body.cep,
        logradouro: req.body.logradouro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        logo: req.body.logo,
        usuario: req.body.usuario
       
    }
    let daoNegocio = new DAONegocio();
    daoNegocio.criarNegocio(negocio, res);
};