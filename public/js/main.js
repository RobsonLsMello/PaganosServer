// //Campo Destinado ao Slider e ao Framework
// new Glider(document.querySelector('.glider'), {
//     slidesToShow: 1,
//     dots: '#dots',
//     draggable: true,
//     arrows: {
//       prev: '.glider-prev',
//       next: '.glider-next'
//     }
//   });

var transformarParametrosUrlJson = () =>{
    let jsonString = '';
    window.location.search.replace("?", "").split('&').forEach(param =>{
        let atr = param.split("=");
        jsonString += `"${atr[0]}":"${atr[1]}",`;
    })
    jsonString = jsonString.substring(0, jsonString.length -1)
    return JSON.parse(`{${jsonString}}`);
}

var verificarLogin = () =>{
    if(localStorage.getItem("usuario") != undefined){
        document.querySelector("#login-perfil").innerText = 'Perfil';
        document.querySelector("#login-perfil").href = '/Perfil';
    }
    else{
        document.querySelector("#login-perfil").innerText = 'Login/Cadastro';
        document.querySelector("#login-perfil").href = '/login';
    }
}


function abrirModal(){
    let caixaModal = document.getElementById('ModalEditar')
    caixaModal.style.display= 'block'
}
function fechaModal(){
    let caixaModal = document.getElementById('ModalEditar')
    caixaModal.style.display= 'none'
}
verificarLogin();