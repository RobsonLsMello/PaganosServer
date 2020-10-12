ApiCategoria('categorias_explore');

var textselectOn = true;

document.getElementById("localizacao_explore").addEventListener("keyup", ()=>{
    procurarEndereco(document.getElementById("localizacao_explore").value);
})



let mudarSelectText = () =>{
    document.querySelector("#localizacoes").setAttribute("style", `left:${document.querySelector("#localizacao_explore").offsetLeft}px; top: ${document.querySelector("#localizacao_explore").offsetTop + 20}px ;position:absolute; display: ${ textselectOn ? 'none' : 'initial'}`);
}



window.addEventListener("resize", ()=>{
    mudarSelectText();
})

document.querySelector("#localizacao_explore").addEventListener("click", input =>{
    mudarSelectText();
    textselectOn = !textselectOn;
})

document.getElementById("localizacao_explore").addEventListener("change", ()=>{
    filtrarCampanhas();
})

document.getElementById("categorias_explore").addEventListener("change", ()=>{
    filtrarCampanhas();
})

document.getElementById("investimento_explore").addEventListener("change", ()=>{
    filtrarCampanhas();
})

let filtrarCampanhas = () => { 
    var dados = {
        "cd_categoria":document.getElementById("categorias_explore").value,
        "vl_lance":document.getElementById("investimento_explore").value,
        "ds_localizacao":document.getElementById("localizacao_explore").value        
    };

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`/explorar/filtrar-campanhas/${dados.cd_categoria  == ''? '%20' : dados.cd_categoria}/${dados.vl_lance}/${dados.ds_localizacao == ''? '%20' : dados.ds_localizacao}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        document.querySelector("main").innerHTML = '';
        let campanhas = JSON.parse(result).Dados;
        let campanhashtml = [];
        campanhas.forEach((campanha, indice) =>{
            let result = document.createElement("div");
            result.setAttribute("style", ` background-image: url('img/campanhas${campanha.foto}');"`); //value="${campanha.codigoCampanha}"
            result.addEventListener("click", ()=>{
                location.href = `/campanha?c=${campanha.codigoCampanha}`;
            })
            result.innerHTML = `<p>${campanha.headLine}</p>`;
            result.classList.add("result");
            campanhashtml.push(result);
        })
        console.log(campanhashtml);
        for(let i = 0; i<campanhashtml.length; i += 4){
            let exibicao = document.createElement("div");
            exibicao.classList.add("exibicao");
            let exibicaoContainer = document.createElement("div");
            exibicaoContainer.classList.add("exibicao-container");
            for(let j = 0; j < 4; j++){
                if(campanhashtml[j+i] != undefined)
                exibicaoContainer.appendChild(campanhashtml[j+i]);
            }
            exibicao.appendChild(exibicaoContainer);
            document.querySelector("main").appendChild(exibicao);
        }
        
    })
    .catch(error => console.log('error', error));
}

document.addEventListener("load", ()=>{
    ApiCategoria('categorias_explore');
    
})
filtrarCampanhas();