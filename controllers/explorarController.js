
let DAOCampanha = require("../model/DAOCampanha");
let DAOCategoria = require("../model/DAOCategoria");

exports.showView = (req, res, next) => {
    res.render('pages/Explorar',{
        title: "Explorar",
        scriptEspecial: "/js/explorarController.js"
    });    
};


exports.mostrarCategorias = (req, res, next) => {

    let daoCategoria = new DAOCategoria()
    daoCategoria.mostrarCategorias(res);
};

exports.filtrarCampanhas = (req, res, next) => {
    let filtro = {
        cd_categoria: req.params.cd_categoria,
        vl_lance: req.params.vl_lance,
        ds_localizacao: req.params.ds_localizacao
    }
    console.log(filtro);
    let daoCampanha = new DAOCampanha()
    daoCampanha.filtrarCampanhas(filtro,res);
};

