window.addEventListener("load", ()=>{
    document.querySelector(".cadastro").setAttribute("style", 'display:none');
})

document.getElementById("cadastrar").addEventListener("click", ()=>{
    document.querySelector(".login").setAttribute("style", 'display:none');
    document.querySelector(".cadastro").removeAttribute("style", 'display:none');
})

document.getElementById("entrar").addEventListener("click", ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"nm_login":document.getElementById("email_login").value,"cd_senha":document.getElementById("password").value});

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("/login", requestOptions)
    .then(response => response.text())
    .then(result => {
        let dados = JSON.parse(result).Dados[0];
        console.log(dados);
        if(dados.usuario != undefined || dados.usuario !=0){
            localStorage.setItem("usuario", dados.usuario);
            localStorage.setItem("negocio", dados.negocio);
            location.href = '/Perfil';
        }
    })
    .catch(error => console.log('error', error));
})