const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const ejsLint = require('ejs-lint');
const expressLayouts = require('express-ejs-layouts');

const rotaPagamento = require('./routes/pagamentoRoute')
const rotaPerfil = require('./routes/perfilRoute');
const rotaExplorar = require('./routes/explorarRoute');
const rotaCadastro = require('./routes/cadastroRoute');
const rotaEscolhaCadastroRoute = require('./routes/escolhaCadastroRoute');
const rotaHome = require('./routes/homeRoute');
const rotaLogin = require('./routes/loginRoute');
const rotaCampanha = require('./routes/campanhaRoute')

app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/pagamento',rotaPagamento);
app.use('/perfil',rotaPerfil);
app.use('/explorar',rotaExplorar);
app.use('/cadastro', rotaCadastro);
app.use('/escolhaCadastro', rotaEscolhaCadastroRoute);
app.use('/', rotaHome);
app.use('/login', rotaLogin);
app.use('/campanha', rotaCampanha);

app.set('view engine', 'ejs');
app.set('layout', 'views/layout');
app.set("layout extractScripts", true); 
app.use(expressLayouts);
app.use(express.static('public'))


app.use((req,res,next) =>{
    const erro = new Error('Não Encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});
module.exports = app;