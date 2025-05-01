let linhaSelecionada = null;

document.querySelector(".button-cadast").addEventListener("click", function () {
    const tabela = document.querySelector("#autoresTable tbody");

    const autor = getValue("input[placeholder='Autor']");


    if (!autor ) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
        <td>${autor}</td>
        
    `;

    corStatus(novaLinha.cells[2], status);

    novaLinha.addEventListener("click" , function () {
        linhaSelecionada = this;
        preencherFormularioComlinha(this);
    });

    limparFomrulario();
    linhaSelecionada = null;
});


function getValue(selector) {
    return document.querySelector(selector).value;
}


function preencherFormularioComlinha(linha) {
    limparFomrulario();

    document.querySelector("input[placeholder='Autor']").value = linha.cells[0].innerText;
}

function limparFomrulario() {
    document.querySelector("input[placeholder='Autor']").value = "";
}


let atoresSalvos = [];

function salvarAtores() {
    atoresSalvos = []
    document.querySelectorAll("#autoresTable tbody tr").forEach(function (linha) {
        const colunas = linha.querySelectorAll("td");
        
        const autor = {
            nome: colunas[0].innerText,
            status: colunas[1].innerText
        }
        atoresSalvos.push(autor);
    });
    localStorage.setItem("atores", JSON.stringify(atoresSalvos));
}


function carregarAtores(){
    const dados = localStorage.getItem("atores");
    if(dados) {
        const atores = JSON.parse(dados);
        const tabela = document.querySelector("#autoresTable tbody");
        tabela.innerHTML = ""; // Limpa a tabela antes de carregar os dados
        
        atores.forEach(function (ator) {
            const novaLinha = tabela.insertRow();
            novaLinha.innerHTML = `
            <td>${ator.nome}</td>
            <td>${ator.status}</td>
            `;
            corStatus(novaLinha.cells[0], ator.status);
            novaLinha.addEventListener("click", function () {
                linhaSelecionada = this;
                preencherFormularioComlinha(this);
            });
        });
    }
}

window.addEventListener("beforeunload", salvarAtores);
window.addEventListener("load", carregarAtores);

document.getElementById("buscarAutor").addEventListener("input", function () {
    const termoBusca = this.value.toLowerCase();
    const linhas = document.querySelectorAll("#autoresTable tbody tr");

    linhas.forEach((linha) => {
        const textLinha = linha.innerText.toLowerCase();
        linha.style.display = textLinha.includes(termoBusca) ? "" : "none";
    })
}) 




function corStatus(td, statusValue) {
    switch (statusValue.toLowerCase()) {
        case 'inativo':
            td.style.backgroundColor = '#d32e2e';
            break;
        case 'ativo':
            td.style.backgroundColor = '#8de02c';
            break;
    }
    td.style.color = 'black';
    td.style.fontWeight = '900';
}





const modal = document.getElementById("modalAutor")
const fecharModal = document.getElementById("btnFechar")
const btnSalvar = document.getElementById("btnSalvar")


document.querySelector("#autoresTable").addEventListener("click", function (event) {
    const linha = event.target.closest("tr");
    if (!linha) return;

    linhaSelecionada = linha;
    limparFomrulario();

    document.getElementById("editAutor").value = linha.cells[0].innerText;
    document.getElementById("editstatus").value = linha.cells[1].innerText;

    modal.style.display = "block";
})


btnSalvar.addEventListener("click", () => {
    if(linhaSelecionada) {
        linhaSelecionada.cells[0].innerText = document.getElementById("editAutor").value;
        linhaSelecionada.cells[1].innerText = document.getElementById("editcodigo").value;
        linhaSelecionada.cells[2].innerText = document.getElementById("editstatus").value;

        corStatus(linhaSelecionada.cells[2], document.getElementById("editstatus").value);
        modal.style.display = "none";
        linhaSelecionada = null;    
        limparFomrulario();
    
    }
})

fecharModal.addEventListener("click", () => {
    modal.style.display = "none";
    limparFomrulario();
})

document.getElementById("Remover").addEventListener("click", () => {
    if (linhaSelecionada) {
        linhaSelecionada.remove();
        linhaSelecionada = null;
        limparFomrulario();
        modal.style.display = "none";

    }
})





