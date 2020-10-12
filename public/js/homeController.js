var topInvestimentos = (id, parentElement) =>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch(`top-investimentos/${id}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        document.querySelector(parentElement).innerHTML = '';
        console.log(result);
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
            document.querySelector(parentElement).appendChild(result);
            campanhashtml.push();
        })
    })
    .catch(error => console.log('error', error));
}

var preencherTops = () =>{
    topInvestimentos(0, '#container-1');
    topInvestimentos(1, '#container-2');
    topInvestimentos(2, '#container-3');
}

preencherTops();