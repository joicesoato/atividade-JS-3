
// SELETORES DO DOM


const botoesComprar = document.querySelectorAll(".btn-comprar");

const listaCarrinho = document.querySelector("#lista-carrinho");

const totalElemento = document.querySelector("#total");


// CARRINHO


// Recupera dados salvos no localStorage
const carrinhoSalvo = localStorage.getItem("carrinho");

// Converte JSON para array
let carrinho = carrinhoSalvo
    ? JSON.parse(carrinhoSalvo)
    : [];


// ADICIONAR PIZZA


botoesComprar.forEach((botao) => {

    botao.addEventListener("click", () => {

        // Captura dados do botão
        const nomePizza = botao.dataset.nome;

        const precoPizza = Number(botao.dataset.preco);

        // Cria objeto da pizza
        const pizza = {

            id: Date.now(),

            nome: nomePizza,

            preco: precoPizza
        };

        // Adiciona no array
        carrinho.push(pizza);

        // Salva localStorage
        salvarCarrinho();

        // Atualiza tela
        atualizarCarrinho();

    });

});


// ATUALIZAR CARRINHO


function atualizarCarrinho() {

    // Limpa lista
    listaCarrinho.innerHTML = "";

    // Variável total
    let total = 0;

    // Percorre carrinho
    carrinho.forEach((pizza) => {

        // Soma total
        total += pizza.preco;

        // Cria item
        const item = document.createElement("li");

        item.innerHTML = `

            <div class="item-info">

                <span class="nome-pizza">
                    ${pizza.nome}
                </span>

                <span class="preco-pizza">
                    R$ ${pizza.preco},00
                </span>

            </div>

            <button class="btn-remover">
                Remover
            </button>

        `;

        // Seleciona botão remover
        const botaoRemover = item.querySelector(".btn-remover");

        // Evento remover
        botaoRemover.addEventListener("click", () => {

            removerPizza(pizza.id);

        });

        // Adiciona item na tela
        listaCarrinho.appendChild(item);

    });

    // Atualiza total
    totalElemento.textContent = total;

}


// REMOVER PIZZA


function removerPizza(idPizza) {

    // Remove item clicado
    carrinho = carrinho.filter((pizza) => {

        return pizza.id !== idPizza;

    });

    // Salva alterações
    salvarCarrinho();

    // Atualiza tela
    atualizarCarrinho();

}


// SALVAR NO LOCALSTORAGE


function salvarCarrinho() {

    // Converte array para JSON
    const carrinhoJSON = JSON.stringify(carrinho);

    // Salva localStorage
    localStorage.setItem("carrinho", carrinhoJSON);

}


// MODAL - SELETORES


const btnFinalizar = document.querySelector("#btn-finalizar");

const modalOverlay = document.querySelector("#modal-overlay");

const btnFechar = document.querySelector("#btn-fechar");

const btnConfirmar = document.querySelector("#btn-confirmar");

const modalPedidos = document.querySelector("#modal-pedidos");

const modalQuantidade = document.querySelector("#modal-quantidade");

const modalTotal = document.querySelector("#modal-total");


// ABRIR MODAL


btnFinalizar.addEventListener("click", () => {

    // Limpa modal
    modalPedidos.innerHTML = "";

    // Variável total
    let total = 0;

    // Percorre carrinho
    carrinho.forEach((pizza) => {

        // Soma valores
        total += pizza.preco;

        // Cria item
        const item = document.createElement("div");

        // Classe CSS
        item.classList.add("item-modal");

        // Conteúdo
        item.innerHTML = `

            <span>${pizza.nome}</span>

            <span>R$ ${pizza.preco},00</span>

        `;

        // Adiciona no modal
        modalPedidos.appendChild(item);

    });

    // Quantidade
    modalQuantidade.textContent = carrinho.length;

    // Total
    modalTotal.textContent = total;

    // Exibe modal
    modalOverlay.style.display = "flex";

});


// FECHAR MODAL


btnFechar.addEventListener("click", () => {

    modalOverlay.style.display = "none";

});


// CONFIRMAR PEDIDO


btnConfirmar.addEventListener("click", () => {

    alert("Pedido confirmado com sucesso 🍕");

    // Limpa carrinho
    carrinho = [];

    // Remove localStorage
    localStorage.removeItem("carrinho");

    // Atualiza tela
    atualizarCarrinho();

    // Fecha modal
    modalOverlay.style.display = "none";

});


// INICIALIZAÇÃ

// Reconstrói carrinho ao carregar página
atualizarCarrinho();