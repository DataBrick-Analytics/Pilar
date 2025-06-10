fetch("/data/getRegiaoRecomendada")
    .then(res => res.json())
    .then(data => {
        data.forEach((regiao, index) => {
            const regiaoId = document.getElementById(`regiao${index + 1}`);
            const zonaId = document.getElementById(`zona${index + 1}`);
            if (regiaoId && zonaId) {
                regiaoId.textContent = regiao.nome_distrito; 
                zonaId.textContent = regiao.zona; 
            }
        });
    })
    .catch(error => {
        console.error("Erro ao carregar regiões recomendadas:", error);
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