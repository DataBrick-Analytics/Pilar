

const dataAgora = new Date();
const formatado = dataAgora.toLocaleString("pt-BR");

document.getElementById("ultimaAtualizacao").textContent = `Atualizado em: ${formatado}`;
document.getElementById("ultimaAtualizacao2").textContent = `Atualizado em: ${formatado}`;

function logout(){
    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "./index.html"
}