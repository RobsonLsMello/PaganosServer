let DAOUsuario = require("../model/DAOUsuario");


exports.get = (req, res, next) => {
    res.render('pages/cadastroUsuario',{
        title: "Cadastro Usuario",
        scriptEspecial: ""
    });    
};


exports.cadUsuario = (req, res, next) => {
    let usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        cpf: req.body.cpf,
        negocio: req.body.negocio
       
    }
    let daoUsuario = new DAOUsuario();
    daoUsuario.criarUsuario(usuario, res);
};