const modalIsbn = document.getElementById("modalIsbn")
const isbnfechar = document.getElementById("btnisbnFechar")
const cadastIsbn = document.getElementById("btnCadastre")


document.querySelector("#button-isbn").addEventListener("click", function (e) {
    const isbn = e.target.closest("button")

    modalIsbn.style.display = "flex"
})

isbnfechar.addEventListener("click", () => {
    modalIsbn.style.display = "none"
    limparFormulario()
})