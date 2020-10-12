var ApiCNPJ = async (CNPJ, razaoSocialId, fantasiaId, cepId, cidadeId, ufId, logradouroId) =>{
    var requestOptions = {
        method: 'GET',
        headers: {
            "authorization": "c3dab023-1f07-4ba4-a737-82b20e11964d-b1721a0e-2f6f-467e-9e6c-1abd9e361a08"
        },
        redirect: 'follow'
    };
    const res = await fetch(`https://api.cnpja.com.br/companies/${CNPJ}`, requestOptions);
    const data = await res.json();
    console.log(data);
    document.getElementById(razaoSocialId).value = data.name; 
    document.getElementById(fantasiaId).value = data.alias; 
    document.getElementById(cepId).value = data.address.zip; 
    document.getElementById(cidadeId).value = data.address.city; 
    document.getElementById(ufId).value = data.address.state; 
    document.getElementById(logradouroId).value = data.address.street; 

}

var ApiCategoria = (id) =>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`/explorar/categorias`, requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result);
        let categorias = JSON.parse(result).Dados;
        categorias.forEach(categoria => {
            var node = document.createElement("option");
            node.value = categoria.codigoCategoria;
            node.innerText = categoria.nomeCategoria;
            document.querySelector(`#${id}`).appendChild(node)
        });
    })
    .catch(error => console.log('error', error));
}

