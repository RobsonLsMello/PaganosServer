const DAOInvestimento = require('../model/DAOInvestimento')
const DAORedesSocais = require('../model/DAORedeSocial')
const DAOCampanha = require('../model/DAOCampanha')
const DAORecompensa = require("../model/DAORecompensa");
exports.showView = (req, res, next) => {
    res.render('pages/campanha',{
        title: "Campanha",
        scriptEspecial: "/js/campanhaController.js"
    });    
};

exports.filtrarInvestidores = (req, res, next) => {
    let filtro = {
        cd_campanha: req.params.cd_campanha
    }


    let daoInvestimento = new DAOInvestimento();
    daoInvestimento.mostrarInvestidores(filtro,res)
};

exports.mostrarRedesSociais = (req, res, next) => {
    let filtro = {
        cd_campanha: req.params.id
    }
    console.log(filtro);
    let daoRedesSociais = new DAORedesSocais();
    daoRedesSociais.mostrarRedesSociais(filtro,res)
};


exports.mostrarCampanha = (req, res, next) => {
    let filtro = {
        cd_campanha: req.params.id
    }
    console.log(req.params);
    let daoCampanha = new DAOCampanha();
    daoCampanha.mostrarCampanha(filtro, res)
};

exports.mostrarRecompensas = (req, res, next) => {
    let filtro = {
        cd_campanha: req.params.id
    }
    console.log(req.params);
    let daoRecompensa = new DAORecompensa();
    daoRecompensa.mostrarRecompensas(filtro, res)
};