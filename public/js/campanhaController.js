let selecionarCampanha = () => { 
    let params = transformarParametrosUrlJson();
    var dados = {
        "cd_campanha":params.c,
    };

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`/campanha/procurar/${dados.cd_campanha}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        let campanha = JSON.parse(result).Dados[0];
        console.log(campanha);
        document.querySelector("#localizacao > a").innerText = campanha.localizacao;
        document.querySelector("#localizacao > a").setAttribute("href", `/explorar?l=${campanha.localizacao}`);
        document.querySelector("#categoria > a").innerText = campanha.nomeCategoria;
        document.querySelector("#categoria > a").setAttribute("href", `/explorar?c=${campanha.codigoCategoria}`);
        document.querySelector("#fotoCampanha").src = `/img/campanhas${campanha.fotoCampanha}`;
        Array.from(document.getElementsByClassName("nomeCampanha")).forEach(elemento =>{
            elemento.innerText = campanha.nomeCampanha;
        })
        document.querySelector("#meta").innerText = (campanha.meta).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        document.querySelector("#porcentagem").innerText = campanha.Porcentagem+" %";
        document.querySelector("#barProgresso").setAttribute("max", campanha.meta);
        document.querySelector("#barProgresso").setAttribute("value", campanha.investimento);
        document.querySelector("#apoiar").addEventListener("click", ()=>{
            location.href = `/pagamento?c=${campanha.codigoCampanha}&lm=${campanha.lanceMinimo}`;
        });
        Array.from(document.getElementsByClassName("nDeApoiadores")).forEach(elemento =>{
            elemento.innerText = campanha.investidores;
        })
        document.querySelector("#headline").innerText = campanha.headLine;
        document.querySelector("#sobre").innerText = campanha.descricaoCampanha;
        document.querySelector("#fotoLogo").src = `/img/logo/${campanha.logo}`;
        document.querySelector("#razaoSocial").innerText = campanha.razaoSocial;
        document.querySelector("#comments").setAttribute('data-href', `https://paganos.com.br?c=${params.c}`);
    });
}
let selecionarInvestimentos = () =>{
    let params = transformarParametrosUrlJson();
    var dados = {
        "cd_campanha":params.c,
    };

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`/campanha/investidores/${dados.cd_campanha}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        document.querySelector(".container_apoiadores").innerHTML = "";
        let investidores = JSON.parse(result).Dados[0];
        console.log(investidores);
        investidores.forEach(investidor =>{
            let imagem = document.createElement("img");
            imagem.src = `/img/perfil/${investidor.fotoPerfil}`;
            let apoiador = document.createElement("h4");
            apoiador.classList.add("nomeApoiador");
            apoiador.innerText = investidor.nomeUsuario;
            let localizacao = document.createElement("p");
            localizacao.classList.add("cidadeApoiador");
            let projetos = document.createElement("p");
            projetos.innerText = `${investidor.projetosInvestidos} Projetos Apoiados`;
            let card = document.createElement("div");
            card.classList.add("apoiador_card");
            card.appendChild(imagem);
            card.appendChild(apoiador);
            card.appendChild(localizacao);
            card.appendChild(projetos);
            document.querySelector(".container_apoiadores").append(card);
        })
    });
}

let selecionarRedesSociais = () =>{
    let params = transformarParametrosUrlJson();
    var dados = {
        "cd_campanha":params.c,
    };

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`/campanha/redes-sociais/${dados.cd_campanha}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        document.querySelector("#redesSociais").innerHTML = "";
        let redes = JSON.parse(result).Dados;
        console.log(redes);
        redes.forEach(rede =>{
            let redeNode = document.createElement("a");
            redeNode.setAttribute("href", rede.contato);
            redeNode.innerText = rede.contato;
            document.querySelector("#redesSociais").appendChild(redeNode);
        })
    });
}
selecionarCampanha();
selecionarInvestimentos();
selecionarRedesSociais();