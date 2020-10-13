let DAOInvestimento = require('../model/DAOInvestimento')

exports.showView = (req,res,next) =>{
    res.render('pages/pagamento',{
        title: "Pagamento",
        scriptEspecial: ""
    });    
}

exports.realizarPagamento = (req, res, next) => {
    let pagamento = {
        vl_investimento: req.body.vl_investimento,
        cd_campanha: req.body.cd_campanha,
        cd_investidor: req.body.cd_investidor,
        cd_transacao: req.body.cd_transacao,      
    }
    let daoInvestimento = new DAOInvestimento();
    daoInvestimento.realizarPagamento(pagamento,res);
}