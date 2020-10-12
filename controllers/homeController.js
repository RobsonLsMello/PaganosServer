let DAOCampanha = require("../model/DAOCampanha");
exports.showView = (req, res, next) => {
    res.render('pages/index',{
        title: "Home",
        scriptEspecial: "/js/homeController.js"
    });    
};

exports.campanhasTopInvestimento = (req, res, next) => {
    let categoria = {
        cd_categoria: req.params.cd_categoria,       
    }

    let daoCampanha= new DAOCampanha();
    daoCampanha.topInvestimentoCampanhas(categoria, res);
};


exports.procurarPorTermo = (req, res, next) => {
    let termo = {
        ds_termo: req.params.ds_termo,       
    }

    let daoCampanha= new DAOCampanha();
    daoCampanha.filtrarCampanhasPorTermo(termo, res);
};