const dataAgora = new Date();
const formatado = dataAgora.toLocaleString("pt-BR");

document.getElementById("ultimaAtualizacao").textContent = `Atualizado em: ${formatado}`;
document.getElementById("ultimaAtualizacao2").textContent = `Atualizado em: ${formatado}`;

function logout(){
    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "./index.html"
}

document.addEventListener('DOMContentLoaded', function() {
    // Set user name from session storage
    const userElement = document.getElementById('user');
    if (userElement) {
        userElement.innerHTML = sessionStorage.NOME_EMPRESA;
    }

    // Logout function
    window.logout = function() {
        // Clear storage
        sessionStorage.clear();
        localStorage.clear();
        
        // Redirect to login
        window.location.href = './login.html';
    }

    // Dropdown functionality
    const dropdownBtn = document.querySelector('.dropdown-btn');
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }
});