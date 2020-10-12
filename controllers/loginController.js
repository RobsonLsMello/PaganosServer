let DAOUsuario = require("../model/DAOUsuario");
exports.showView = (req, res, next) => {
    res.render('pages/login',{
        title: "Login",
        scriptEspecial: ""
        
    });    
};

exports.login = (req, res, next) => {
    console.log(req.body);
    let login = {
        nm_login: req.body.nm_login,
        cd_senha: req.body.cd_senha          
    }
    console.log(login);

    let daoUsuario = new DAOUsuario();
    daoUsuario.login(login, res);
};