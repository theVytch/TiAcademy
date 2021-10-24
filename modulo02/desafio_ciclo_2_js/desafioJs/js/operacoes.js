window.onload=function(){
	(()=>{
    let mostrarProdutosCliente = document.querySelector("#content-produtos > #produtos");

    for(let idx in produtos){
        mostrarProdutosCliente.innerHTML += `<li class="itemProduto" data-preco=${produtos[idx].precoProd}>${produtos[idx].prodDesc}`        
    }
})(produtos)

const itemProduto= document.querySelectorAll("#produtos > li.itemProduto");
const cestaCliente =document.querySelector("ul#cestaCliente");
const totalCompra = document.querySelector("#totalCompra");
const guardaItem=[];

var totalPedido =0;

itemProduto.forEach((item)=>{
    item.addEventListener("click",()=>{

        li = document.createElement("li");
        li.setAttribute("data-preco", item.dataset.preco);
        
        if(guardaItem.indexOf(item.textContent) == -1){
            
            guardaItem.push(item.textContent);
            
            cestaCliente.appendChild(li).textContent = item.textContent = item.textContent;

            totalPedido += Number(item.dataset.preco);

            totalCompra.value = totalPedido.toLocaleString("pt-BR",
            {style:"currency", currency: "BRL"})

        }else{
            alert(`Este item ${item.textContent} já está na sua cesta!`);
        }
    });
});

const cesta = document.querySelectorAll("#cestaCliente");
    cesta.forEach((item) => {
        item.addEventListener('click', (rmItem) => {
            var rmIdx = guardaItem.indexOf(rmItem.target.textContent);
            if (rmIdx > -1) {
                totalPedido -= Number(rmItem.target.dataset.preco);
                cestaCliente.removeChild(cestaCliente.childNodes[rmIdx]);
                guardaItem.splice(rmIdx, 1);
                totalCompra.value = totalPedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        });
    });
}