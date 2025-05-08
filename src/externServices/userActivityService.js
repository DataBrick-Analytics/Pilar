const http = require('http');

function saveUserActivity(activityData) {
    
    const data = JSON.stringify(activityData);
    const options = {
        hostname: 'localhost',
        port: 4585,
        path: '/save-activity',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
        const req = http.request(options);
        req.on('error', (error) => {

            if (error.code === 'ECONNREFUSED') {
                console.error('Erro: O servidor de atividades não está em execução. Verifique se o serviço está ativo.');
            }else  if(error.code === 'ECONNRESET') {
                console.error('Erro: A conexão foi redefinida. Tente novamente mais tarde.');
            } else {
                console.error('Erro ao enviar a requisição:', error.message);
            }
        });

        req.write(data);
        req.end();
    
}

module.exports = { saveUserActivity };