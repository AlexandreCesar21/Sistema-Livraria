let linhaSelecionada = null;

document.querySelector(".button-cadast").addEventListener("click", function () {
    const tabela = document.querySelector("#usuarioTable tbody");

    const usuario = getValue("input[placeholder='usuario']");
    const senha = getValue("input[placeholder='Senha']");


    if (!usuario || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    const novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
        <td>${usuario}</td>
        <td>${senha}</td>
    `;

    novaLinha.addEventListener("click", function () {
        linhaSelecionada = this;
        preencherFormularioComlinha(this);
    });

    limparFormulario();
    linhaSelecionada = null;

})

function getValue(selector) {
    return document.querySelector(selector).value;
}

function preencherFormularioComlinha(linha) {
    limparFormulario();

    document.querySelector("input[placeholder='usuario']").value = linha.cells[0].innerText;
    document.querySelector("input[placeholder='Senha']").value = linha.cells[1].innerText;
}

function limparFormulario() {
    document.querySelector("input[placeholder='usuario']").value = "";
    document.querySelector("input[placeholder='Senha']").value = "";
}

let usuarioSalvos = [];
function salvarUsuario() {
    usuarioSalvos = []
    document.querySelectorAll("#usuarioTable tbody tr").forEach(function (linha) {  
        const colunas = linha.querySelectorAll("td");

        const usuario = {
            usuario: colunas[0].innerText,
            senha: colunas[1].innerText
        }
        usuarioSalvos.push(usuario);
    })
    localStorage.setItem("usuarioSalvos", JSON.stringify(usuarioSalvos));
}

function carregarUsuario() {
    const dados = localStorage.getItem("usuarios");
    if (dados) {
        const usuarios = JSON.parse(dados);
        const tabela = document.querySelector("#usuarioTable tbody");
        tabela.innerHTML = ""; // Limpa a tabela antes de carregar os dados
        usuarios.forEach(function (usuario) {
            const novaLinha = tabela.insertRow();
            novaLinha.innerHTML = `
                <td>${usuario.usuario}</td>
                <td>${usuario.senha}</td>
            `;
            novaLinha.addEventListener("click", function () {
                linhaSelecionada = this;
                preencherFormularioComlinha(this);
            });
        });
    }
}




window.addEventListener("beforeunload", salvarUsuario)
window.addEventListener("load", carregarUsuario)



document.getElementById("buscarUsuario").addEventListener("input", function () {
    const termoBusca = this.value.toLowerCase();
    const linhas = document.querySelectorAll("#usuarioTable tbody tr");

    linhas.forEach((linha) => {
        const texLinha = linha.innerText.toLowerCase();
        linha.style.display = texLinha.includes(termoBusca) ? "" : "none";
    }
    );
}
);


/*  MODAL  */
const modal = document.getElementById("modalUsario")
const fecharModal = document.querySelector("#btnFechar")
const btnSalvar = document.querySelector("#btnSalvar")


document.querySelector("#usuarioTable").addEventListener("click", function (event) {
    const linha = event.target.closest("tr")
    if (!linha) return

    linhaSelecionada = linha
    limparFormulario();

    document.getElementById("editUsuario").value = linha.cells[0].innerText
    document.getElementById("editSenha").value = linha.cells[1].innerText

    modal.style.display = "block";
})

btnSalvar.addEventListener("click", function () {
    if(linhaSelecionada){
        linhaSelecionada.cells[0].innerText = document.getElementById("editUsuario").value
        linhaSelecionada.cells[1].innerText = document.getElementById("editSenha").value

        modal.style.display = "none";
        linhaSelecionada = null
        limparFormulario()
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
