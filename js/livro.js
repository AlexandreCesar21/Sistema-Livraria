document.addEventListener("DOMContentLoaded", () => {
    const cadastrarBtn = document.querySelector(".button-cadast");
    const tabelaLivros = document.querySelector("#livrosTable tbody");
    const buscarInput = document.getElementById("buscarLivro");
  
    carregarLivros();
    configurarCliqueTabela(); // ✅ chamada única aqui
  
    cadastrarBtn.addEventListener("click", () => {
      const titulo = document.querySelector('input[placeholder="Titulo"]').value;
      const subtitulo = document.querySelector('input[placeholder="Subtitulo"]').value;
      const autor = document.querySelector('input[placeholder="Nome do autor"]').value;
      const editora = document.querySelector('input[placeholder="Nome da editora"]').value;
      const valor = document.querySelector('input[placeholder="Valor do livro"]').value;
      const quantidade = document.querySelector('input[placeholder="Quantidade do livro"]').value;
      const isbn = document.querySelector('input[placeholder="ISBN"]').value;
      const categoria = document.getElementById("categoria").value;
      const tipoCapa = document.getElementById("tipoCapa").value;
  
      if (!titulo || !autor || !editora || !categoria || !tipoCapa) {
        const modalErro = document.getElementById("modalErroCampos");
        const fecharErro = document.querySelector(".close-erro");
      
        modalErro.style.display = "flex";
      
        fecharErro.onclick = () => {
          modalErro.style.display = "none";
        };
      
        window.onclick = (event) => {
          if (event.target === modalErro) {
            modalErro.style.display = "none";
          }
        };
      
        return;
      }
  
      const livro = {
        titulo,
        subtitulo,
        autor,
        editora,
        tipoCapa,
        categoria,
        isbn,
        valor,
        quantidade,
        status: "ATIVO",
        dataCadastro: new Date().toLocaleString()
      };
  
      adicionarLivroNaTabela(livro);
      salvarLivro(livro);
      document.getElementById("formCadastro").reset();
    });
  
    function adicionarLivroNaTabela(livro) {
      const linha = document.createElement("tr");
      const classeStatus = livro.status === "ATIVO" ? "status-ativo" : "status-inativo";
  
      linha.innerHTML = `
        <td>${livro.titulo}</td>
        <td>${livro.subtitulo}</td>
        <td>${livro.autor}</td>
        <td>${livro.editora}</td>
        <td>${livro.tipoCapa}</td>
        <td>${livro.categoria}</td>
        <td>${livro.isbn}</td>
        <td>${livro.valor}</td>
        <td>${livro.quantidade}</td>
        <td class="${classeStatus}">${livro.status}</td>
        <td class="data-horario">${livro.dataCadastro}</td>
      `;
      tabelaLivros.appendChild(linha);
    }
  
    function salvarLivro(livro) {
      const livros = JSON.parse(localStorage.getItem("livros")) || [];
      livros.push(livro);
      localStorage.setItem("livros", JSON.stringify(livros));
    }
  
    function carregarLivros() {
      const livros = JSON.parse(localStorage.getItem("livros")) || [];
      livros.forEach(livro => adicionarLivroNaTabela(livro));
    }
  
    // Busca
    buscarInput.addEventListener("input", () => {
      const termo = buscarInput.value.toLowerCase();
      const linhas = tabelaLivros.querySelectorAll("tr");
  
      linhas.forEach(linha => {
        const textoLinha = linha.textContent.toLowerCase();
        linha.style.display = textoLinha.includes(termo) ? "" : "none";
      });
    });
  });
  
  function configurarCliqueTabela() {
    const tabela = document.querySelector("#livrosTable tbody");
    const modal = document.getElementById("modalLivro");
    const closeBtn = document.querySelector(".close-button");
    const fecharModal = document.getElementById("btnFechar");
    const btnRemover = document.getElementById("Remover");
    const btnSalvar = document.getElementById("btnSalvar");
    let linhaSelecionada = null;
  
    tabela.addEventListener("click", function (e) {
      const linha = e.target.closest("tr");
      if (!linha) return;
  
      linhaSelecionada = linha;
  
      document.getElementById("editTitulo").value = linha.cells[0].innerText;
      document.getElementById("editSubtitulo").value = linha.cells[1].innerText;
      document.getElementById("editAutor").value = linha.cells[2].innerText;
      document.getElementById("editEditora").value = linha.cells[3].innerText;
      document.getElementById("editTipoCapa").value = linha.cells[4].innerText;
      document.getElementById("editCategoria").value = linha.cells[5].innerText;
      document.getElementById("editIsbn").value = linha.cells[6].innerText;
      document.getElementById("editValor").value = linha.cells[7].innerText;
      document.getElementById("editQuantidade").value = linha.cells[8].innerText;
      document.getElementById("editStatus").value = linha.cells[9].innerText;
  
      modal.style.display = "flex";
    });
  
    function limparFormulario() {
      document.querySelectorAll("#modalLivro input, #modalLivro select").forEach(el => {
        el.value = "";
      });
    }
  
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      limparFormulario();
      linhaSelecionada = null;
    });
  
    fecharModal.addEventListener("click", () => {
      modal.style.display = "none";
      limparFormulario();
      linhaSelecionada = null;
    });
  
    btnRemover.addEventListener("click", () => {
        if (!linhaSelecionada) return;
      
        const confirmModal = document.getElementById("confirmModal");
        const btnSim = document.getElementById("btnConfirmarSim");
        const btnNao = document.getElementById("btnConfirmarNao");
      
        confirmModal.style.display = "flex";
      
        const confirmarRemocao = () => {
          const isbnParaRemover = linhaSelecionada.cells[6].innerText;
          let livros = JSON.parse(localStorage.getItem("livros")) || [];
          livros = livros.filter(livro => livro.isbn !== isbnParaRemover);
          localStorage.setItem("livros", JSON.stringify(livros));
      
          linhaSelecionada.remove();
          linhaSelecionada = null;
          modal.style.display = "none";
          confirmModal.style.display = "none";
          limparFormulario();
      
          mostrarToast("Livro removido com sucesso!", "erro");
      
          // Remove os eventos após uso
          btnSim.removeEventListener("click", confirmarRemocao);
          btnNao.removeEventListener("click", cancelarRemocao);
        };
      
        const cancelarRemocao = () => {
          confirmModal.style.display = "none";
          btnSim.removeEventListener("click", confirmarRemocao);
          btnNao.removeEventListener("click", cancelarRemocao);
        };
      
        btnSim.addEventListener("click", confirmarRemocao);
        btnNao.addEventListener("click", cancelarRemocao);
      });
  
    btnSalvar.addEventListener("click", () => {
      if (!linhaSelecionada) return;
  
      const titulo = document.getElementById("editTitulo").value;
      const subtitulo = document.getElementById("editSubtitulo").value;
      const autor = document.getElementById("editAutor").value;
      const editora = document.getElementById("editEditora").value;
      const tipoCapa = document.getElementById("editTipoCapa").value;
      const categoria = document.getElementById("editCategoria").value;
      const isbn = document.getElementById("editIsbn").value;
      const valor = document.getElementById("editValor").value;
      const quantidade = document.getElementById("editQuantidade").value;
      const status = document.getElementById("editStatus").value;
  
      // Atualiza os dados na linha da tabela
      linhaSelecionada.cells[0].innerText = titulo;
      linhaSelecionada.cells[1].innerText = subtitulo;
      linhaSelecionada.cells[2].innerText = autor;
      linhaSelecionada.cells[3].innerText = editora;
      linhaSelecionada.cells[4].innerText = tipoCapa;
      linhaSelecionada.cells[5].innerText = categoria;
      linhaSelecionada.cells[6].innerText = isbn;
      linhaSelecionada.cells[7].innerText = valor;
      linhaSelecionada.cells[8].innerText = quantidade;
      linhaSelecionada.cells[9].innerText = status;
      linhaSelecionada.cells[9].className = status === "ATIVO" ? "status-ativo" : "status-inativo";
  
      // Atualiza no localStorage
      let livros = JSON.parse(localStorage.getItem("livros")) || [];
      const isbnOriginal = linhaSelecionada.cells[6].innerText;
      const index = livros.findIndex(livro => livro.isbn === isbnOriginal);
  
      if (index !== -1) {
        livros[index] = {
          ...livros[index],
          titulo,
          subtitulo,
          autor,
          editora,
          tipoCapa,
          categoria,
          isbn,
          valor,
          quantidade,
          status
        };
        localStorage.setItem("livros", JSON.stringify(livros));
      }
  
      modal.style.display = "none";
      limparFormulario();
      linhaSelecionada = null;
  
      mostrarToast("Livro atualizado com sucesso!", "sucesso");
    });


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
      
      
  }
  

  