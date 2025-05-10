document.addEventListener('DOMContentLoaded', () => {
    const editoraTable = document.querySelector('#editoraTable tbody');
    const inputEditora = document.getElementById('editora');
    const btnCadastrar = document.querySelector('.button-cadast');
    const buscarInput = document.getElementById('buscarEditora');

    const modalEditora = document.getElementById('modalEditora');
    const btnFechar = document.getElementById('btnFechar');
    const btnSalvar = document.getElementById('btnSalvar');
    const btnRemover = document.getElementById('Remover');

    const confirmModal = document.getElementById('confirmModal');
    const btnConfirmarSim = document.getElementById('btnConfirmarSim');
    const btnConfirmarNao = document.getElementById('btnConfirmarNao');

    const editEditoraInput = document.getElementById('editEditora');
    const editStatusInput = document.getElementById('editStatus');

    let editoras = JSON.parse(localStorage.getItem('editoras')) || [];
    let editoraSelecionadaIndex = null;

    function renderTabela() {
        editoraTable.innerHTML = '';
        editoras.forEach((editora, index) => {
            const tr = document.createElement('tr');
            const classeStatus = editora.status === "ATIVO" ? "status-ativo" : "status-inativo";
            tr.innerHTML = `
                <td>${editora.nome}</td>
                <td class="${classeStatus}">${editora.status}</td>
                <td class="data-horario">${editora.data}</td>
            `;
            tr.addEventListener('click', () => abrirModal(index));
            editoraTable.appendChild(tr);
        });
    }

    function cadastrarEditora() {
        const nome = inputEditora.value.trim();
        if (!nome) return mostrarToast("Digite o nome da editora!", "erro");

        const novaEditora = {
            nome,
            status: 'ATIVO',
            data: new Date().toLocaleString()
        };

        editoras.push(novaEditora);
        localStorage.setItem('editoras', JSON.stringify(editoras));
        inputEditora.value = '';
        renderTabela();
        mostrarToast("Editora cadastrada com sucesso!", "sucesso");
    }

    function abrirModal(index) {
        const editora = editoras[index];
        editoraSelecionadaIndex = index;
        editEditoraInput.value = editora.nome;
        editStatusInput.value = editora.status;

        modalEditora.style.display = 'block';
    }

    function fecharModal() {
        modalEditora.style.display = 'none';
        editoraSelecionadaIndex = null;
    }

    function salvarEdicao() {
        if (editoraSelecionadaIndex === null) return;

        editoras[editoraSelecionadaIndex].nome = editEditoraInput.value;
        editoras[editoraSelecionadaIndex].status = editStatusInput.value;

        localStorage.setItem('editoras', JSON.stringify(editoras));
        renderTabela();
        fecharModal();
        mostrarToast("Editora atualizada com sucesso!", "sucesso");
    }

    function confirmarRemocao() {
        confirmModal.style.display = 'block';
    }

    function cancelarRemocao() {
        confirmModal.style.display = 'none';
    }

    function removerEditoraConfirmado() {
        if (editoraSelecionadaIndex === null) return;

        editoras.splice(editoraSelecionadaIndex, 1);
        localStorage.setItem('editoras', JSON.stringify(editoras));
        renderTabela();
        fecharModal();
        confirmModal.style.display = 'none';
        mostrarToast("Editora removida com sucesso!", "erro");
    }

    function buscarEditora() {
        const termo = buscarInput.value.toLowerCase();
        const linhas = editoraTable.querySelectorAll('tr');

        linhas.forEach((linha, index) => {
            const nome = editoras[index].nome.toLowerCase();
            linha.style.display = nome.includes(termo) ? '' : 'none';
        });
    }

    function mostrarToast(mensagem, tipo = "sucesso") {
        const toast = document.getElementById("toast");

        toast.classList.remove("toast-sucesso", "toast-erro");
        if (tipo === "sucesso") toast.classList.add("toast-sucesso");
        else if (tipo === "erro") toast.classList.add("toast-erro");

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
    btnCadastrar.addEventListener('click', cadastrarEditora);
    btnFechar.addEventListener('click', fecharModal);
    btnSalvar.addEventListener('click', salvarEdicao);
    btnRemover.addEventListener('click', confirmarRemocao);
    btnConfirmarNao.addEventListener('click', cancelarRemocao);
    btnConfirmarSim.addEventListener('click', removerEditoraConfirmado);
    buscarInput.addEventListener('input', buscarEditora);

    renderTabela();
});
