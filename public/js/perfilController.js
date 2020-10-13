let verificarEntrada = () =>{
    let params = transformarParametrosUrlJson();
    if(localStorage.getItem("negocio") != null){
        //fazer algo para a pessoa cadastrar seu negócio   
    }
    if(localStorage.getItem("usuario") == null && params.n == 'campanha'){
        location.href = '/login'
    }
    else{
        //aparecer pop up
    }
}

verificarEntrada();

var mostrarDadosCampanhas = () =>{
    var dados = {
        "cd_negocio":localStorage.getItem("negocio"),
    };

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`/perfil/pesquisar-campanhas/${dados.cd_negocio}/2050-01-01/1900-01-01`, requestOptions)
    .then(response => response.text())
    .then(result => {
        document.querySelector("#tcampanhas tbody").innerHTML = "";
        let campanhas = JSON.parse(result).Dados[0];
        console.log(campanhas);
        campanhas.forEach(campanha =>{
            let td1 = document.createElement("td");
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.addEventListener("click", ()=>{
                location.href = `/campanha?c=${campanha.codigoCampanha}`;
            })
            img.src = `/img/campanhas${campanha.foto}`;
            let p = document.createElement("p");
            p.innerText = campanha.nomeCampanha;
            div.appendChild(img);
            div.appendChild(p);
            td1.appendChild(div);

            let td2 = document.createElement("td");
            td2.innerText = campanha.investidores;

            let td3 = document.createElement("td");
            td3.innerText = (campanha.totalInvestimento).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

            let td4 = document.createElement("td");
            td4.innerText = campanha.mediaInvestimento.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

            let td5 = document.createElement("td");
            let spam = document.createElement("spam");
            spam.classList.add("status");
            spam.classList.add(campanha.ativo ? "concluido" : "terminado");
            td5.appendChild(spam);

            let tr = document.createElement("tr");
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            
            document.querySelector("#tcampanhas tbody").appendChild(tr);
        })
    });
}


let status = ['terminado', 'concluido', 'andamento'];
var mostrarDadosInvestimentos = () =>{
    let params = transformarParametrosUrlJson();
    var dados = {
        "cd_usuario":localStorage.getItem("usuario"),
    };

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`/perfil/investimentos/${dados.cd_usuario}/2050-01-01/1900-01-01`, requestOptions)
    .then(response => response.text())
    .then(result => {
        document.querySelector("#tInvestimento tbody").innerHTML = "";
        let campanhas = JSON.parse(result).Dados[0];
        console.log(campanhas);
        campanhas.forEach(campanha =>{
            let td1 = document.createElement("td");
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.addEventListener("click", ()=>{
                location.href = `/campanha?c=${campanha.codigoCampanha}`;
            })
            img.src = `/img/campanhas${campanha.foto}`;
            let p = document.createElement("p");
            p.innerText = campanha.nomeCampanha;
            div.appendChild(img);
            div.appendChild(p);
            td1.appendChild(div);

            let td2 = document.createElement("td");
            let spam = document.createElement("spam");
            spam.classList.add("status");
            spam.classList.add(status[campanha.ativo]);
            let div2 = document.createElement("div");
            let p1 = document.createElement("p");
            p1.innerText =  campanha.contribuicao.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
            let p2 = document.createElement("p");
            p2.innerText = `Processado em: ${campanha.dataContribuicao}`
            let p3 = document.createElement("p");
            p3.innerText = '(forma de pagamento - Cartão ou Boleto)';
            div2.appendChild(p1);
            div2.appendChild(p2);
            div2.appendChild(p3);
            td2.appendChild(spam);
            td2.appendChild(div2);


            let td3 = document.createElement("td");
            td3.innerHTML = `
                <p>Empréstimo financeiro</p>
                <p>0,5% durante <span>2 meses</span></p>
                <p>Data para receber:</p>
                <p>26/04/2021</p>
            `;            

            let tr = document.createElement("tr");
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
           
            document.querySelector("#tInvestimento tbody").appendChild(tr);
        })
    });
}

var mostrarUsuario = () =>{
    var dados = {
        "cd_usuario":localStorage.getItem("usuario")
    };

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`/perfil/usuario/${dados.cd_usuario}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        let usuario = JSON.parse(result).Dados[0];
        document.querySelector("#nome").innerText = usuario.nome;
        document.querySelector("#mudarnome").value = usuario.nome;
        document.querySelector("#mudaremail").value = usuario.email;
        document.querySelector("#saldo_usario").value = usuario.saldo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
        document.querySelector("#fotoPerfil").src = `/img/perfil/${usuario.foto}`;
        console.log(usuario);
    });
}

mostrarRecompensas = (parentElement) =>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(`/perfil/tipo-recompensas`, requestOptions)
    .then(response => response.text())
    .then(result => {
        let recompensas = JSON.parse(result).Dados;
        document.querySelector(parentElement).innerHTML = usuario.nome;
        recompensas.forEach(recompensa =>{
            let label = document.createElement("label");
            label.innerText = recompensa.nome;
            let input = document.createElement("input");
            input.type = 'checkbox';
            input.value = recompensa.codigo;
            label.appendChild(label);
            document.querySelector(parentElement).appendChild(label);
        })
    });
}

cadastrarCampanha = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(
        {
            "nm_campanha": document.querySelector("#nome_campanha").value,
            "ds_headline": document.querySelector("#frase_campanha").value,
            "vl_lance_minimo": document.querySelector("#lanceminimo_campanha").value,
            "ds_campanha": document.querySelector("#sobre_campanha").value,
            "im_foto": "/default.png",
            "cd_negocio": localStorage.getItem('negocio'),
            "cd_categoria": document.querySelector("#categorias_explore").value,
            "vl_meta":  document.querySelector("#metafinal_campanha").value,
            "dt_inicio_campanha": document.querySelector("#datainicio_campanha").value,
            "dt_final_campanha": document.querySelector("#datatermino_campanha").value
        }
        );

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    fetch(`/perfil/cadastro-campanha`, requestOptions)
    .then(response => response.text())
    .then(result => {
        let retorno = JSON.parse(result).Dados[0];
        console.log(retorno);
        if(retorno.campanha != 0){
            location.href = `/campanha?c=${retorno.campanha}`;
        }
    });
}

document.querySelector("#sair_perfil").addEventListener("change", ()=>{
    localStorage.clear();
    location.href = "/";
});

document.querySelector(".btnpadrao").addEventListener("click", ()=>{
    cadastrarCampanha();
})
mostrarUsuario();
mostrarDadosCampanhas();
mostrarDadosInvestimentos();
//mostrarRecompensas('');
ApiCategoria('categorias_explore');