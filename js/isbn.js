// Selecionando os elementos do modal e os botões
const modalIsbn = document.getElementById("modalIsbn");
const isbnfechar = document.getElementById("btnisbnFechar");
const cadastIsbn = document.getElementById("btnCadastre");
const buttonIsbn = document.getElementById("button-isbn");

// Abre o modal de ISBN
document.querySelector("#button-isbn").addEventListener("click", () => {
  modalIsbn.style.display = "flex";  // Abre o modal
});

// Fecha o modal quando o botão de fechar for clicado
isbnfechar.addEventListener("click", () => {
  modalIsbn.style.display = "none";  // Fecha o modal
  limparFormularioIsbn();  // Limpa o formulário
});

// Função para cadastrar o livro via modal ISBN
cadastIsbn.addEventListener("click", () => {
  const titulo = document.getElementById("isbnTitulo").value;
  const subtitulo = document.getElementById("isbnSubtitulo").value;
  const autor = document.getElementById("isbnAutor").value;
  const editora = document.getElementById("isbnEditora").value;
  const valor = document.getElementById("isbnValor").value;
  const quantidade = document.getElementById("isbnQuantidade").value;
  const isbn = document.getElementById("isbnIsbn").value;
  const categoria = document.getElementById("isbnCategoria").value;
  const tipoCapa = document.getElementById("isbnTipoCapa").value;

  // Verifica se os campos obrigatórios foram preenchidos
  if (!titulo || !autor || !editora || !categoria || !tipoCapa) {
    alert("Preencha os campos obrigatórios!");
    return;
  }

  // Cria o objeto livro
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

  // Adiciona o livro na tabela
  adicionarLivroNaTabela(livro);

  // Salva o livro no localStorage
  salvarLivro(livro);

  // Fecha o modal e limpa o formulário
  modalIsbn.style.display = "none";
  limparFormularioIsbn();
  
  // Exibe o toast de sucesso
  mostrarToast("Livro cadastrado com sucesso via ISBN!", "sucesso");
});

// Função para limpar os campos do modal
function limparFormularioIsbn() {
  document.getElementById("isbnTitulo").value = "";
  document.getElementById("isbnSubtitulo").value = "";
  document.getElementById("isbnAutor").value = "";
  document.getElementById("isbnEditora").value = "";
  document.getElementById("isbnValor").value = "";
  document.getElementById("isbnQuantidade").value = "";
  document.getElementById("isbnIsbn").value = "";
  document.getElementById("isbnCategoria").value = "";
  document.getElementById("isbnTipoCapa").value = "";
}

// Função para adicionar o livro na tabela
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

  document.querySelector("#livrosTable tbody").appendChild(linha);
}

// Função para salvar o livro no localStorage
function salvarLivro(livro) {
  let livros = JSON.parse(localStorage.getItem("livros")) || [];
  livros.push(livro);
  localStorage.setItem("livros", JSON.stringify(livros));
}

// Função para mostrar o toast
function mostrarToast(mensagem, tipo) {
  const toast = document.getElementById("toast");
  toast.textContent = mensagem;
  toast.classList.remove("hidden");

  if (tipo === "sucesso") {
    toast.classList.add("sucesso");
  } else if (tipo === "erro") {
    toast.classList.add("erro");
  }

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}
