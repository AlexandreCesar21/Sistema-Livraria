let linhaSelecionada = null;

// Função para cadastrar
document.querySelector(".button-cadast").addEventListener("click", function () {
    const tabela = document.querySelector("#livrosTable tbody");

    const titulo = getValue("input[placeholder='Titulo']");
    const valor = getValue("input[placeholder='Valor do livro']");
    const autor = getValue("input[placeholder='Nome do autor']");
    const editora = getValue("input[placeholder='Nome da editora']");
    const quantidade = getValue("input[placeholder='Quantidade do livro']");
    const tipoCapa = getValue("#tipoCapa");
    const formato = getValue("#formato");
    const categoria = getValue("#categoria");
    const status = getValue("#status");

    if (!titulo || !valor || !autor || !editora || !quantidade || !tipoCapa || !formato || !categoria || !status) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
        <td>${titulo}</td>
        <td>${valor}</td>
        <td>${autor}</td>
        <td>${editora}</td>
        <td>${quantidade}</td>
        <td>${tipoCapa}</td>
        <td>${formato}</td>
        <td>${categoria}</td>
        <td>${status}</td>
    `;

    corStatus(novaLinha.cells[8], status);

    novaLinha.addEventListener("click", function () {
        linhaSelecionada = this;
        preencherFormularioComLinha(this);
    });

    limparFormulario();
    linhaSelecionada = null;
});

// Função para atualizar (form principal)
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

        corStatus(linhaSelecionada.cells[8], linhaSelecionada.cells[8].innerText);

        linhaSelecionada = null;
        limparFormulario();
    } else {
        alert("Selecione um livro da tabela para atualizar.");
    }
});

// Função auxiliar para pegar valores
function getValue(selector) {
    return document.querySelector(selector).value;
}

function preencherFormularioComLinha(linha) {
    limparFormulario();

    document.querySelector("input[placeholder='Titulo']").value = linha.cells[0].innerText;
    document.querySelector("input[placeholder='Valor do livro']").value = linha.cells[1].innerText;
    document.querySelector("input[placeholder='Nome do autor']").value = linha.cells[2].innerText;
    document.querySelector("input[placeholder='Nome da editora']").value = linha.cells[3].innerText;
    document.querySelector("input[placeholder='Quantidade do livro']").value = linha.cells[4].innerText;
    document.querySelector("#tipoCapa").value = linha.cells[5].innerText;
    document.querySelector("#formato").value = linha.cells[6].innerText;
    document.querySelector("#categoria").value = linha.cells[7].innerText;
    document.querySelector("#status").value = linha.cells[8].innerText;

    document.querySelector(".form-cadastro").style.display = "none";
    modal.style.display = "flex";
}

function limparFormulario() {
    document.querySelectorAll("input[type='text']").forEach(input => input.value = "");
    document.querySelectorAll("select").forEach(select => select.value = "");
}


// Modal de ISBN
const modalIsbn = document.getElementById("modalIsbn")
const isbnFechar = document.getElementById("btnisbnFechar")
const cadastIsbn = document.getElementById("btnCadastre")


document.querySelector("#button-isbn").addEventListener("click", function (e) {
    const isbn =  e.target.closest("button")

    modalIsbn.style.display = "flex";
})

// Botão FECHAR ISBN
isbnFechar.addEventListener("click", () => {
    modalIsbn.style.display = "none";
    limparFormulario();
    
});


// Botão Cadastrar ISBN




// Modal de edição
const modal = document.getElementById("modalLivro");
const closeBtn = document.querySelector(".close-button");
const fecharModal = document.getElementById("btnFechar");
const btnSalvar = document.getElementById("btnSalvar");

document.querySelector("#livrosTable tbody").addEventListener("click", function (e) {
    const linha = e.target.closest("tr");
    if (!linha) return;

    linhaSelecionada = linha;
    limparFormulario();

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

// Botão SALVAR do modal
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

        corStatus(linhaSelecionada.cells[8], linhaSelecionada.cells[8].innerText);

        modal.style.display = "none";
        linhaSelecionada = null;
        document.querySelector(".form-cadastro").style.display = "block";
        limparFormulario();
    }
});

// Botão FECHAR ou X
fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
    limparFormulario();
    document.querySelector(".form-cadastro").style.display = "block";
});
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    limparFormulario();
    document.querySelector(".form-cadastro").style.display = "block";
});

// Botão Remover
document.getElementById("Remover").addEventListener("click", () => {
    if (linhaSelecionada) {
        linhaSelecionada.remove();
        linhaSelecionada = null;
        modal.style.display = "none";
    }
});

let livrosSalvos = [];

// Salvar dados no localStorage
function salvarLivrosLocalStorage() {
    livrosSalvos = [];
    document.querySelectorAll("#livrosTable tbody tr").forEach((linha) => {
        const colunas = linha.querySelectorAll("td");
        const livro = {
            titulo: colunas[0].textContent,
            valor: colunas[1].textContent,
            autor: colunas[2].textContent,
            editora: colunas[3].textContent,
            quantidade: colunas[4].textContent,
            tipoCapa: colunas[5].textContent,
            formato: colunas[6].textContent,
            categoria: colunas[7].textContent,
            status: colunas[8].textContent
        };
        livrosSalvos.push(livro);
    });
    localStorage.setItem("livros", JSON.stringify(livrosSalvos));
}

// Carregar dados do localStorage
function carregarLivrosLocalStorage() {
    const dados = localStorage.getItem("livros");
    if (dados) {
        livrosSalvos = JSON.parse(dados);
        const tabela = document.querySelector("#livrosTable tbody");
        tabela.innerHTML = "";
        livrosSalvos.forEach((livro) => {
            const novaLinha = tabela.insertRow();
            novaLinha.innerHTML = `
                <td>${livro.titulo}</td>
                <td>${livro.valor}</td>
                <td>${livro.autor}</td>
                <td>${livro.editora}</td>
                <td>${livro.quantidade}</td>
                <td>${livro.tipoCapa}</td>
                <td>${livro.formato}</td>
                <td>${livro.categoria}</td>
                <td>${livro.status}</td>
            `;
            corStatus(novaLinha.cells[8], livro.status);
            novaLinha.addEventListener("click", function () {
                linhaSelecionada = this;
                preencherFormularioComLinha(this);
            });
        });
    }
}

window.addEventListener("beforeunload", salvarLivrosLocalStorage);
window.addEventListener("load", carregarLivrosLocalStorage);

// Busca
document.getElementById("buscarLivro").addEventListener("input", function () {
    const termoBusca = this.value.toLowerCase();
    const linhas = document.querySelectorAll("#livrosTable tbody tr");

    linhas.forEach((linha) => {
        const textoLinha = linha.innerText.toLowerCase();
        linha.style.display = textoLinha.includes(termoBusca) ? "" : "none";
    });
});

// === FUNÇÃO corStatus ===
function corStatus(td, statusValue) {
    switch (statusValue.toLowerCase()) {
        case 'disponível':
            td.style.backgroundColor = '#8de02c';
            break;
        case 'emprestado':
            td.style.backgroundColor = '#87cefa';
            break;
        case 'esgotado':
            td.style.backgroundColor = '#f8d7da';
            break;
        case 'danificado':
            td.style.backgroundColor = '#d32e2e';
            break;
        case 'reservado':
            td.style.backgroundColor = '#ffd700';
            break;
        case 'removido':
            td.style.backgroundColor = '#e2e3e5';
            break;
        default:
            td.style.backgroundColor = '#ffffff';
    }
    td.style.color = 'black';
    td.style.fontWeight = '900';
}
