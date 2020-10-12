let DAOCampanha = require("../model/DAOCampanha");
let DAONegocio = require("../model/DAONegocio");
let DAORedeSocial = require("../model/DAORedeSocial");
let DaoInvestimento = require("../model/DAOInvestimento");
let DAORecompensa = require("../model/DAORecompensa");
let DAOUsuario = require("../model/DAOUsuario");
exports.showView = (req, res, next) => {
    res.render('pages/Perfil',{
        title: "Perfil",
        scriptEspecial: "/js/perfilController.js"
    });    
};

exports.cadCampanha = (req, res, next) => {
    let campanha = {
        nm_campanha: req.body.nm_campanha,
        ds_headline: req.body.ds_headline,
        vl_lance_minimo: req.body.vl_lance_minimo,
        ds_campanha: req.body.ds_campanha,
        im_foto: req.body.im_foto,
        cd_negocio: req.body.cd_negocio,
        cd_categoria: req.body.cd_categoria,
        vl_meta:  req.body.vl_meta,
        dt_inicio_campanha: req.body.dt_inicio_campanha,
        dt_final_campanha: req.body.dt_final_campanha
    }
  
    let daoCampanha = new DAOCampanha();
    daoCampanha.cadastraCampanha(campanha,res);
};


exports.cadRedeSocial = (req, res, next) => {
    let redeSocial = {

        cd_usuario: req.body.cd_usuario,
        nm_rede_social: req.body.nm_rede_social,
        cd_tipo_rede_social: req.body.cd_tipo_rede_social

    }
    console.log(redeSocial)
  
    let daoRedeSocial = new DAORedeSocial();
    daoRedeSocial.cadRedeSocial(redeSocial,res);
};


exports.pesquisarCampanhas = (req, res, next) => {
    let filtro = {
        cd_negocio: req.params.cd_negocio,
        dt_max: req.params.dt_max,
        dt_min: req.params.dt_min
    }
    let daoCampanha = new DAOCampanha()
    daoCampanha.pesquisarCampanha(filtro,res)
};

exports.mostrarInvestimentos = (req, res, next) => {
    
    let filtro = {

        cd_usuario: req.params.cd_usuario,
        dt_max: req.params.dt_max,
        dt_min: req.params.dt_min

    }

  
    let daoInvestimento = new DaoInvestimento()
    daoInvestimento.mostrarInvestimentos(filtro,res)
};

exports.mostrarNegocios = (req, res, next) => {
    let codigoNegocio = {
        cd_negocio: req.params.cd_negocio,
    }
  
    let daoNegocio = new DAONegocio()
    daoNegocio.mostrarNegocios(codigoNegocio,res)
};

exports.mostrarUsuario = (req, res, next) => {
    let filtro = {
        cd_usuario: req.params.cd_usuario,
    }  
    let daoUsuario = new DAOUsuario()
    daoUsuario.usuario(filtro,res)
};


exports.mostrarTipoRecompensas = (req, res, next) => {
    let daoRecompensa = new DAORecompensa()
    daoRecompensa.mostrarTipoRecompensas(res)
};