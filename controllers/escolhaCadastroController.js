
exports.showView = (req, res, next) => {
    res.render('pages/EscolhaCadastro',{
        title: "Escolha Cadastro",
        scriptEspecial: ""
    });    
};
