let linhaSelecionada = null;

// Função para cadastrar
document.querySelector(".button-cadast").addEventListener("click", function () {
    // Apenas realiza o cadastro se não há linha selecionada para edição
    if (!linhaSelecionada) {
        const tabela = document.querySelector("#livrosTable tbody");

        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
            <td>${getValue("input[placeholder='Titulo']")}</td>
            <td>${getValue("input[placeholder='Valor do livro']")}</td>
            <td>${getValue("input[placeholder='Nome do autor']")}</td>
            <td>${getValue("input[placeholder='Nome da editora']")}</td>
            <td>${getValue("input[placeholder='Quantidade do livro']")}</td>
            <td>${getValue("#tipoCapa")}</td>
            <td>${getValue("#formato")}</td>
            <td>${getValue("#categoria")}</td>
            <td>${getValue("#status")}</td>
        `;

        novaLinha.addEventListener("click", function () {
            linhaSelecionada = this;
            preencherFormularioComLinha(this);
        });

        limparFormulario();
    } else {
        alert("Para cadastrar um novo livro, desmarque a linha de edição.");
    }
});

// Função para atualizar
document.querySelector(".Atualizar").addEventListener("click", function () {
    if (linhaSelecionada) {
        linhaSelecionada.cells[0].innerText = getValue("input[placeholder='Titulo']");
        linhaSelecionada.cells[1].innerText = getValue("input[placeholder='Valor do livro']");
        linhaSelecionada.cells[2].innerText = getValue("input[placeholder='Nome do autor']");
        linhaSelecionada.cells[3].innerText = getValue("input[placeholder='Nome da editora']");
        linhaSelecionada.cells[4].innerText = getValue("input[placeholder='Quantidade do livro']");
        linhaSelecionada.cells[5].innerText = getValue("#tipoCapa");
        linhaSelecionada.cells[6].innerText = getValue("#formato");
        linhaSelecionada.cells[7].innerText = getValue("#categoria");
        linhaSelecionada.cells[8].innerText = getValue("#status");

        // Limpar a seleção após atualizar
        linhaSelecionada = null;
        limparFormulario();
    } else {
        alert("Selecione um livro da tabela para atualizar.");
    }
});

// Funções auxiliares
function getValue(selector) {
    return document.querySelector(selector).value;
}

function preencherFormularioComLinha(linha) {
    // Limpar o formulário de cadastro para garantir que não apareçam dados antigos
    limparFormulario();
    
    // Preencher os campos do formulário de cadastro com os dados da linha clicada
    document.querySelector("input[placeholder='Titulo']").value = linha.cells[0].innerText;
    document.querySelector("input[placeholder='Valor do livro']").value = linha.cells[1].innerText;
    document.querySelector("input[placeholder='Nome do autor']").value = linha.cells[2].innerText;
    document.querySelector("input[placeholder='Nome da editora']").value = linha.cells[3].innerText;
    document.querySelector("input[placeholder='Quantidade do livro']").value = linha.cells[4].innerText;
    document.querySelector("#tipoCapa").value = linha.cells[5].innerText;
    document.querySelector("#formato").value = linha.cells[6].innerText;
    document.querySelector("#categoria").value = linha.cells[7].innerText;
    document.querySelector("#status").value = linha.cells[8].innerText;

    // Esconder o formulário de cadastro ao clicar na linha para edição
    document.querySelector(".form-cadastro").style.display = "none";
    // Mostrar o modal de edição
    modal.style.display = "flex";
}

function limparFormulario() {
    document.querySelectorAll("input[type='text']").forEach(input => input.value = "");
    document.querySelectorAll("select").forEach(select => select.value = "");
}

// Modal para editar
const modal = document.getElementById("modalLivro");
const closeBtn = document.querySelector(".close-button");
const fecharModal = document.getElementById("btnFechar");
const btnSalvar = document.getElementById("btnSalvar");

// Quando clica em uma linha da tabela
document.querySelector("#livrosTable tbody").addEventListener("click", function (e) {
    const linha = e.target.closest("tr");
    if (!linha) return;

    linhaSelecionada = linha;

    // Preencher os campos do modal com os dados da linha
    document.getElementById("editTitulo").value = linha.cells[0].innerText;
    document.getElementById("editValor").value = linha.cells[1].innerText;
    document.getElementById("editAutor").value = linha.cells[2].innerText;
    document.getElementById("editEditora").value = linha.cells[3].innerText;
    document.getElementById("editQuantidade").value = linha.cells[4].innerText;
    document.getElementById("editTipoCapa").value = linha.cells[5].innerText;
    document.getElementById("editFormato").value = linha.cells[6].innerText;
    document.getElementById("editCategoria").value = linha.cells[7].innerText;
    document.getElementById("editStatus").value = linha.cells[8].innerText;

    modal.style.display = "flex";
});

// Botão SALVAR no modal
btnSalvar.addEventListener("click", () => {
    if (linhaSelecionada) {
        linhaSelecionada.cells[0].innerText = document.getElementById("editTitulo").value;
        linhaSelecionada.cells[1].innerText = document.getElementById("editValor").value;
        linhaSelecionada.cells[2].innerText = document.getElementById("editAutor").value;
        linhaSelecionada.cells[3].innerText = document.getElementById("editEditora").value;
        linhaSelecionada.cells[4].innerText = document.getElementById("editQuantidade").value;
        linhaSelecionada.cells[5].innerText = document.getElementById("editTipoCapa").value;
        linhaSelecionada.cells[6].innerText = document.getElementById("editFormato").value;
        linhaSelecionada.cells[7].innerText = document.getElementById("editCategoria").value;
        linhaSelecionada.cells[8].innerText = document.getElementById("editStatus").value;

        modal.style.display = "none";
        linhaSelecionada = null; // Limpar a seleção
        // Mostrar novamente o formulário de cadastro
        document.querySelector(".form-cadastro").style.display = "block";
        // Limpar formulário de cadastro
        limparFormulario();
    }
});

// Botão FECHAR ou X no modal
fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
    // Limpar o formulário de cadastro ao fechar o modal
    limparFormulario();
    // Mostrar novamente o formulário de cadastro
    document.querySelector(".form-cadastro").style.display = "block";
});
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    // Limpar o formulário de cadastro ao fechar o modal
    limparFormulario();
    // Mostrar novamente o formulário de cadastro
    document.querySelector(".form-cadastro").style.display = "block";
});
