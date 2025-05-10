document.addEventListener('DOMContentLoaded', () => {
    const autoresTable = document.querySelector('#autoresTable tbody');
    const inputAutor = document.getElementById('autor');
    const btnCadastrar = document.querySelector('.button-cadast');
    const buscarInput = document.getElementById('buscarAutor');

    const modal = document.getElementById('modalAutor');
    const btnFechar = document.getElementById('btnFechar');
    const btnSalvar = document.getElementById('btnSalvar');
    const btnRemover = document.getElementById('Remover');

    const confirmModal = document.getElementById('confirmModal');
    const btnConfirmarSim = document.getElementById('btnConfirmarSim');
    const btnConfirmarNao = document.getElementById('btnConfirmarNao');

    const editAutor = document.getElementById('editAutor');
    const editStatus = document.getElementById('editstatus');

    let autores = JSON.parse(localStorage.getItem('autores')) || [];
    let autorSelecionadoIndex = null;

    function renderTabela() {
        autoresTable.innerHTML = '';
        autores.forEach((autor, index) => {
            const tr = document.createElement('tr');
            const classeStatus = autor.status === "ATIVO" ? "status-ativo" : "status-inativo";
            tr.innerHTML = `
                <td>${autor.nome}</td>
                <td class="${classeStatus}">${autor.status}</td>
                <td class="data-horario">${autor.data}</td>
            `;
            tr.addEventListener('click', () => abrirModal(index));
            autoresTable.appendChild(tr);
        });
    }

    function cadastrarAutor() {
        const nome = inputAutor.value.trim();
        if (!nome) return mostrarToast("Digite um nome de autor!", "erro");

        const novoAutor = {
            nome,
            status: 'ATIVO',
            data: new Date().toLocaleString()
        };

        autores.push(novoAutor);
        localStorage.setItem('autores', JSON.stringify(autores));
        inputAutor.value = '';
        renderTabela();
        mostrarToast("Autor cadastrado com sucesso!", "sucesso");
    }

    function abrirModal(index) {
        const autor = autores[index];
        autorSelecionadoIndex = index;
        editAutor.value = autor.nome;
        editStatus.value = autor.status;

        modal.style.display = 'block';
    }

    function fecharModal() {
        modal.style.display = 'none';
        autorSelecionadoIndex = null;
    }

    function salvarEdicao() {
        if (autorSelecionadoIndex === null) return;

        autores[autorSelecionadoIndex].nome = editAutor.value;
        autores[autorSelecionadoIndex].status = editStatus.value;

        localStorage.setItem('autores', JSON.stringify(autores));
        renderTabela();
        fecharModal();
        mostrarToast("Autor atualizado com sucesso!", "sucesso");
    }

    function confirmarRemocao() {
        confirmModal.style.display = 'block';
    }

    function cancelarRemocao() {
        confirmModal.style.display = 'none';
    }

    function removerAutorConfirmado() {
        if (autorSelecionadoIndex === null) return;

        autores.splice(autorSelecionadoIndex, 1);
        localStorage.setItem('autores', JSON.stringify(autores));
        renderTabela();
        fecharModal();
        confirmModal.style.display = 'none';
        mostrarToast("Autor removido com sucesso!", "erro");
    }

    function buscarAutor() {
        const termo = buscarInput.value.toLowerCase();
        const linhas = autoresTable.querySelectorAll('tr');

        linhas.forEach((linha, index) => {
            const nome = autores[index].nome.toLowerCase();
            linha.style.display = nome.includes(termo) ? '' : 'none';
        });
    }

    // Função para mostrar o Toast
    function mostrarToast(mensagem, tipo = "sucesso") {
        const toast = document.getElementById("toast");

        // Remove classes anteriores
        toast.classList.remove("toast-sucesso", "toast-erro");

        // Aplica a classe com base no tipo
        if (tipo === "sucesso") {
            toast.classList.add("toast-sucesso");
        } else if (tipo === "erro") {
            toast.classList.add("toast-erro");
        }

        toast.textContent = mensagem;
        toast.classList.remove("hidden");
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => {
                toast.classList.add("hidden");
            }, 400);
        }, 2500);
    }

    // Eventos
    btnCadastrar.addEventListener('click', cadastrarAutor);
    btnFechar.addEventListener('click', fecharModal);
    btnSalvar.addEventListener('click', salvarEdicao);
    btnRemover.addEventListener('click', confirmarRemocao); // Novo: exibe o modal de confirmação
    btnConfirmarNao.addEventListener('click', cancelarRemocao); // Fecha o modal
    btnConfirmarSim.addEventListener('click', removerAutorConfirmado); // Confirma e remove
    buscarInput.addEventListener('input', buscarAutor);

    renderTabela();
});
