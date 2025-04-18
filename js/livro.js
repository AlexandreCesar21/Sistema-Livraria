document.querySelector('.button-cadast').addEventListener('click', function() {
    // Pegando os valores do formulário
    const titulo = document.querySelector('input[placeholder="Titulo"]').value;
    const valor = document.querySelector('input[placeholder="Valor do livro"]').value;
    const autor = document.querySelector('input[placeholder="Nome do autor"]').value;
    const editora = document.querySelector('input[placeholder="Nome da editora"]').value;
    const quantidade = document.querySelector('input[placeholder="Quantidade do livro"]').value;
    const status = document.querySelector('#status').value;
    const categoria = document.querySelector('#categoria').value;
    const tipoCapa = document.querySelector('#tipoCapa').value;
    const formato = document.querySelector('#formato').value;

    // Criando uma nova linha da tabela
    const newRow = document.createElement('tr');

    // Criando as células da nova linha
    newRow.innerHTML = `
        <td class="titulo">${titulo}</td>
        <td class="valor">${valor}</td>
        <td class="Autor">${autor}</td>
        <td class="Editora">${editora}</td>
        <td class="quantidade">${quantidade}</td>
        <td class="tipo-capa">${tipoCapa}</td>
        <td class="formato">${formato}</td>
        <td class="categoria">${categoria}</td>
        <td class="status">${status}</td>
    `;

    // Adicionando a nova linha no tbody da tabela
    document.querySelector('#livrosTable tbody').appendChild(newRow);

    // Limpando os campos do formulário
    document.querySelector('form').reset();
});
