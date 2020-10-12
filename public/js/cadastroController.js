var negocio = 0;
var usuario = 0;
window.addEventListener('load', ()=>{
    let jsonUsuario = transformarParametrosUrlJson();
    negocio = jsonUsuario.n == 'empreendedor' && jsonUsuario.n != undefined ? 1 : 0;
    if(negocio == 0)
        document.getElementById("avancar").value = 'Cadastrar';
})

let listenCnpj = (cnpj) =>{
    let cnpjData = cnpj.srcElement.value;
    ApiCNPJ(cnpjData, "RazSocial_usuario", "nmfantasia_usuario", "CEP_usuario", "Cidade_usuario", "UF_usuario", "")
}
document.getElementById("CNPJ_usuario").addEventListener("keyup", e => listenCnpj(e));

document.getElementById("avancar").addEventListener("click", ()=>{
    let dados = {
        nm_usuario: document.getElementById("nome_usuario").value,
        nm_email: document.getElementById("email_usuario").value,
        cd_senha: document.getElementById("senha_usuario").value,
        cd_cpf: document.getElementById("CPF_usuario").value,
        ic_negocio: negocio
    }
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(dados);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/cadastro/usuario", requestOptions)
    .then(response => response.text())
    .then(result => {
        usuario = JSON.parse(result).Dados[0][0].usuario;
        if(usuario != 0){
            localStorage.setItem("usuario", usuario);
            if(negocio != 0){
                document.querySelector(".cadastraemprendpg1").setAttribute("style", 'display:none');
                document.querySelector(".cadastraemprendpg2").removeAttribute("style", 'display:none');
            }else{
                window.location.href = "/";
            }            
        }
    })
    .catch(error => console.log('error', error));    
})

document.getElementById("cadastrar").addEventListener("click", ()=>{
    let dados = {
        ds_razao_social: document.getElementById("RazSocial_usuario").value,
        ds_fantasia: document.getElementById("nmfantasia_usuario").value,
        cd_cnpj: document.getElementById("CNPJ_usuario").value,
        cd_pix: document.getElementById("PIX_usuario").value,
        cd_cep: document.getElementById("CEP_usuario").value,
        ds_logradouro: '',
        nm_cidade: document.getElementById("Cidade_usuario").value,
        sg_uf: document.getElementById("UF_usuario").value,
        im_logo: '',
        cd_usuario: usuario,
    }
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(dados);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("/cadastro/negocio", requestOptions)
    .then(response => response.text())
    .then(result => {
        negocio = JSON.parse(result).Dados[0][0].negocio;
        if(negocio != 0){
            localStorage.setItem("negocio", negocio);
            if(negocio != 0){
                window.location.href = "/";
            }         
        }
    })
    .catch(error => console.log('error', error));
})