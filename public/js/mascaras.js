let listenCnpj = (cnpj) =>{
    let cnpjData = cnpj.srcElement.value;
    ApiCNPJ(cnpjData, "RazSocial_usuario", "nmfantasia_usuario", "CEP_usuario", "Cidade_usuario", "UF_usuario", "")
}

document.getElementById("CNPJ_usuario").addEventListener("change", e => listenCnpj(e));