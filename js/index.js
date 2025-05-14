// Adiciona a classe 'hovered' ao item da lista selecionado
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => item.classList.remove("hovered"));
  this.classList.add("hovered");

  // Verifica se o link tem atributo data-section e exibe a respectiva seção
  const sectionId = this.querySelector("a")?.getAttribute("data-section");
  if (sectionId) {
    showSection(sectionId);
  } else {
    hideAllSections();
  }
}

// Exibe somente a seção desejada
function showSection(sectionId) {
  hideAllSections(); // Oculta todas antes
  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = "block";
  }
}

// Oculta todas as seções configuradas para troca
function hideAllSections() {
  const sections = document.querySelectorAll(".details");
  sections.forEach((section) => {
    if (section.id !== "") {
      section.style.display = "none";
    }
  });
}

// Adiciona o evento de mouseover
list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Toggle do menu lateral
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector("main");


toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};




function abrirModal() {
  document.getElementById("modalRelatorios").style.display = "block";
}

function fecharModal() {
  document.getElementById("modalRelatorios").style.display = "none";
}

function gerarRelatorio(numero) {
  alert("Gerando Relatório " + numero);
  // Aqui você pode chamar uma função que gera ou redireciona para o relatório correspondente
  fecharModal();
}
