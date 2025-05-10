document.addEventListener('DOMContentLoaded', () => {
    const usuarioTable = document.querySelector('#usuarioTable tbody');
    const inputUsuario = document.getElementById('usuario');
    const inputSenha = document.getElementById('senha');
    const btnCadastrar = document.querySelector('.button-cadast');
    const buscarInput = document.getElementById('buscarUsuario');

    const modalUsuario = document.getElementById('modalUsuario');
    const btnFechar = document.getElementById('btnFechar');
    const btnSalvar = document.getElementById('btnSalvar');
    const btnRemover = document.getElementById('btnRemover');

    const confirmModal = document.getElementById('confirmModal');
    const btnConfirmarSim = document.getElementById('btnConfirmarSim');
    const btnConfirmarNao = document.getElementById('btnConfirmarNao');

    const editUsuarioInput = document.getElementById('editUsuario');
    const editSenhaInput = document.getElementById('editSenha');
    const editStatusInput = document.getElementById('editStatus');

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuarioSelecionadoIndex = null;

    function renderTabela() {
        usuarioTable.innerHTML = '';
        usuarios.forEach((usuario, index) => {
            const tr = document.createElement('tr');
            const classeStatus = usuario.status === "ATIVO" ? "status-ativo" : "status-inativo";
            tr.innerHTML = `
                <td>${usuario.usuario}</td>
                <td class="${classeStatus}">${usuario.status}</td>
                <td class="data-horario">${usuario.dataCadastro}</td>
            `;
            tr.addEventListener('click', () => abrirModal(index));
            usuarioTable.appendChild(tr);
        });
    }

    function cadastrarUsuario() {
        const nome = inputUsuario.value.trim();
        const senha = inputSenha.value.trim();
        if (!nome || !senha) return mostrarToast("Digite o nome e a senha do usuário!", "erro");

        const novaDataCadastro = new Date();
        const dataCadastroFormatada = `${novaDataCadastro.toLocaleDateString()} ${novaDataCadastro.getHours().toString().padStart(2, '0')}:${novaDataCadastro.getMinutes().toString().padStart(2, '0')}:${novaDataCadastro.getSeconds().toString().padStart(2, '0')}`;

        const novoUsuario = {
            usuario: nome,
            senha: senha,
            status: 'ATIVO',
            dataCadastro: dataCadastroFormatada
        };

        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        inputUsuario.value = '';
        inputSenha.value = '';
        renderTabela();
        mostrarToast("Usuário cadastrado com sucesso!", "sucesso");
    }

    function abrirModal(index) {
        const usuario = usuarios[index];
        usuarioSelecionadoIndex = index;
        editUsuarioInput.value = usuario.usuario;
        editSenhaInput.value = usuario.senha;
        editStatusInput.value = usuario.status;

        modalUsuario.style.display = 'block';
    }

    function fecharModal() {
        modalUsuario.style.display = 'none';
        usuarioSelecionadoIndex = null;
    }

    function salvarEdicao() {
        if (usuarioSelecionadoIndex === null) return;

        usuarios[usuarioSelecionadoIndex].usuario = editUsuarioInput.value;
        usuarios[usuarioSelecionadoIndex].senha = editSenhaInput.value;
        usuarios[usuarioSelecionadoIndex].status = editStatusInput.value;

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        renderTabela();
        fecharModal();
        mostrarToast("Usuário atualizado com sucesso!", "sucesso");
    }

    function confirmarRemocao() {
        confirmModal.style.display = 'block';
    }

    function cancelarRemocao() {
        confirmModal.style.display = 'none';
    }

    function removerUsuarioConfirmado() {
        if (usuarioSelecionadoIndex === null) return;

        usuarios.splice(usuarioSelecionadoIndex, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        renderTabela();
        fecharModal();
        confirmModal.style.display = 'none';
        mostrarToast("Usuário removido com sucesso!", "erro");
    }

    function buscarUsuario() {
        const termo = buscarInput.value.toLowerCase();
        const linhas = usuarioTable.querySelectorAll('tr');

        linhas.forEach((linha, index) => {
            const nome = usuarios[index].usuario.toLowerCase();
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
    btnCadastrar.addEventListener('click', cadastrarUsuario);
    btnFechar.addEventListener('click', fecharModal);
    btnSalvar.addEventListener('click', salvarEdicao);
    btnRemover.addEventListener('click', confirmarRemocao);
    btnConfirmarNao.addEventListener('click', cancelarRemocao);
    btnConfirmarSim.addEventListener('click', removerUsuarioConfirmado);
    buscarInput.addEventListener('input', buscarUsuario);

    renderTabela();
});
