let linhaSelecionada = null;

document.querySelector(".button-cadast").addEventListener("click", function () {
    const tabela = document.querySelector("#autoresTable tbody");

    const autor = getValue("input[placeholder='Autor']");
    const codigo = getValue("input[placeholder='Codigo']");
    const status = getValue("#status");


    if (!autor || !codigo || !status) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novaLinha = tabela.insertRow();
    novaLinha.innerHTML = `
        <td>${autor}</td>
        <td>${codigo}</td>
        <td>${status}</td>
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


function corStatus(td, statusValue) {
    switch (statusValue.toLowerCase()) {
        case 'inativo':
            td.style.backgroundColor = '#8de02c';
            break;
        case 'ativo':
            td.style.backgroundColor = '#87cefa';
            break;
    }
    td.style.color = 'black';
    td.style.fontWeight = '900';
}