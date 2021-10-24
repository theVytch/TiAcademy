window.onload = function( ){

    const btn = document.querySelector("#btn");
    const cxCep = document.querySelector(".Cep");

    const infoCep = async function(cep){
        var url =`https://viacep.com.br/ws/${cep}/json/`; 
        var consultaCep = await fetch(url);
        var infoCep    = await consultaCep.json();
        
        for(var campos in infoCep){
            console.log(infoCep);
            if(document.querySelector("#"+campos)){
            document.querySelector("#"+campos).value = infoCep[campos]
            }
        }
    }

    btn.addEventListener("click", ()=>{
        let cep = cxCep.value;
        infoCep(cep);
    })
} 
