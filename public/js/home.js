const userID = localStorage.getItem('USER_ID');

async function loadCards() {
    document.getElementById(`intro`).innerText = `OLÁ, ` + localStorage.getItem('NOME_USUARIO').toUpperCase();

    try {
        const res = await fetch(`/pegarValoresDistritosEscolhas/${userID}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        console.log("Resposta da API - pegarValoresDistritosEscolhas:", data);

        const distritos = data.resultado;

        for (let i = 0; i < distritos.length; i++) {
            document.getElementById(`regiao${i + 1}`).innerText = distritos[i].nome_distrito.trim();
            document.getElementById(`zona${i + 1}`).innerText = distritos[i].zona;
            document.getElementById(`card${i + 1}`).onclick = function() {
                localStorage.setItem('REGIAO_ID', distritos[i].fk_distrito);
                window.location.href = 'dashboard.html';
            };
        }
    } catch (error) {
        console.error("Erro ao pegar valores dos distritos:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadCards();
});

    document.getElementById('button-forms').addEventListener('click', function() {
    window.location.href = 'formulario.html'; 
  });

  document.getElementById('button-allerts').addEventListener('click', function() {
    window.location.href = 'TelaAlertas.html'; 
  });

   document.getElementById('propiedades-button').addEventListener('click', function() {
    window.location.href = 'filtros.html'; 
  });