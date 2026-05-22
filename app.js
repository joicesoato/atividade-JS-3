
// SELETORES DO DOM
const botoesComprar = document.querySelectorAll(".btn-comprar");
const listaCarrinho = document.querySelector("#lista-carrinho");
const totalElemento = document.querySelector("#total");

// VARIÁVEL DO CARRINHO
let carrinho = [];

// ADICIONAR PIZZA NO CARRINHO
botoesComprar.forEach((botao) => {

    botao.addEventListener("click", () => {

        // Captura os dados do botão
        const nomePizza = botao.dataset.nome;
        const precoPizza = Number(botao.dataset.preco);

        // Cria objeto da pizza
        const pizza = {
            id: Date.now(),
            nome: nomePizza,
            preco: precoPizza
        };

        // Adiciona no carrinho
        carrinho.push(pizza);

        // Atualiza tela
        atualizarCarrinho();
    });

});

// ATUALIZAR CARRINHO
function atualizarCarrinho() {

    // Limpa lista antes de recriar
    listaCarrinho.innerHTML = "";

    let total = 0;

    // Percorre itens do carrinho
    carrinho.forEach((pizza) => {

        total += pizza.preco;

        // Cria item da lista
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
        const botaoRemover = item.querySelector("button");

        // Evento de remover
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

    // Remove apenas item clicado
    carrinho = carrinho.filter((pizza) => {
        return pizza.id !== idPizza;
    });

    // Atualiza DOM automaticamente
    atualizarCarrinho();

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

    // Limpa conteúdo anterior
    modalPedidos.innerHTML = "";

    // Variável total
    let total = 0;

    // Percorre o carrinho
    carrinho.forEach((pizza) => {

        // Soma total
        total += pizza.preco;

        // Cria item visual
        const item = document.createElement("div");

        item.classList.add("item-modal");

        item.innerHTML = `
            <span>${pizza.nome}</span>

            <span>R$ ${pizza.preco},00</span>
        `;

        // Adiciona no modal
        modalPedidos.appendChild(item);

    });

    // Quantidade total
    modalQuantidade.textContent = carrinho.length;

    // Soma final
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

    alert("Pedido confirmado com sucesso!");

    // Limpa carrinho
    carrinho = [];

    // Atualiza carrinho visual
    atualizarCarrinho();

    // Fecha modal
    modalOverlay.style.display = "none";

});