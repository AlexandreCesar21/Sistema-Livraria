let linhaSelecionada = null;

document.querySelector(".button-cadast").addEventListener("click", function () {
    const tabela = document.querySelector("#editoraTable tbody");

    const editora = getValue("input[placeholder='Editora']");
    const codigo = getValue("input[placeholder='Codigo']");
    const status = getValue("#status");

    if(!editora || !codigo || !status) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    const novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
        <td>${editora}</td>
        <td>${codigo}</td>
        <td>${status}</td>
    `;


    corStatus(novaLinha.cells[2], status);

    novaLinha.addEventListener("click", function () {
        linhaSelecionada = this;
        preencherFormularioComDados(this);
    });

    limparFormulario();
    linhaSelecionada = null;
})


function getValue(selector) {
    return document.querySelector(selector).value;
}

function preencherFormularioComDados(linha) {
    limparFormulario();

    document.querySelector("input[placeholder='Editora']").value = linha.cells[0].innerText;
    document.querySelector("input[placeholder='Codigo']").value = linha.cells[1].innerText;
    document.querySelector("#status").value = linha.cells[2].innerText;
}

function limparFormulario() {
    document.querySelector("input[placeholder='Editora']").value = "";
    document.querySelector("input[placeholder='Codigo']").value = "";
    document.querySelector("#status").value = "";
}


let editoraSalvas = [];

function salvarEditora() {
    editoraSalvas = []
    document.querySelectorAll("#editoraTable tbody tr").forEach(function (linha) {  
        const colunas = linha.querySelectorAll("td");

        const editora = {
            nome: colunas[0].innerText,
            codigo: colunas[1].innerText,
            status: colunas[2].innerText
        }
        editoraSalvas.push(editora);
})
    localStorage.setItem("editoras", JSON.stringify(editoraSalvas));
}

function carregarEditoras() {
    const dados = localStorage.getItem("editoras");
    if (dados) {
        const editoras = JSON.parse(dados);
        const tabela = document.querySelector("#editoraTable tbody");
        tabela.innerHTML = ""; // Limpa a tabela antes de carregar os dados

        editoras.forEach(function (editora) {
            const novaLinha = tabela.insertRow();
            novaLinha.innerHTML = `
                <td>${editora.nome}</td>
                <td>${editora.codigo}</td>
                <td>${editora.status}</td>
            `;
            corStatus(novaLinha.cells[2], editora.status);

            novaLinha.addEventListener("click", function () {
                linhaSelecionada = this;
                preencherFormularioComDados(this);
            });
        });
    }
}

window.addEventListener("beforeunload", salvarEditora);
window.addEventListener("load", carregarEditoras);

document.getElementById("buscarEditora").addEventListener("input", function () {
    const termoBusca = this.value.toLowerCase();
    const linhas = document.querySelectorAll("#editoraTable tbody tr");

    linhas.forEach((linha) => {
        const textLinha = linha.innerText.toLowerCase();
        linha.style.display = textLinha.includes(termoBusca) ? "" : "none";
    })
})



function corStatus(td, statusValue) {
    switch (statusValue.toLowerCase()) {
        case 'inativo':
            td.style.backgroundColor = "#d32e2e";
            break;
        case 'ativo':
            td.style.backgroundColor = "#8de02c";
            break;
    }
    td.style.color = "black";
    td.style.fontWeight = "900";
}






const modal = document.querySelector("#modalEditora");
const fecharModal = document.querySelector("#btnFechar");
const btnSalvar = document.querySelector("#btnSalvar");

document.querySelector("#editoraTable").addEventListener("click", function (event) {
    const linha = event.target.closest("tr");
    if (!linha) return;

    linhaSelecionada = linha;
    limparFormulario();

    document.getElementById("editEditora").value = linha.cells[0].innerText;
    document.getElementById("editCodigo").value = linha.cells[1].innerText;
    document.getElementById("editStatus").value = linha.cells[2].innerText;

    modal.style.display = "block";
})

btnSalvar.addEventListener("click", function () {
    if(linhaSelecionada){
        linhaSelecionada.cells[0].innerText = document.getElementById("editEditora").value;
        linhaSelecionada.cells[1].innerText = document.getElementById("editCodigo").value;
        linhaSelecionada.cells[2].innerText = document.getElementById("editStatus").value;

        corStatus(linhaSelecionada.cells[2], document.getElementById("editStatus").value);
        modal.style.display = "none";
        linhaSelecionada = null;
        limparFormulario();
    }
})

fecharModal.addEventListener("click", function () {
    modal.style.display = "none";
    limparFormulario();
})

document.getElementById("Remover").addEventListener("click", function () {
    if (linhaSelecionada) {
        linhaSelecionada.remove();
        linhaSelecionada = null;
        limparFormulario();
        modal.style.display = "none";

    }
})



