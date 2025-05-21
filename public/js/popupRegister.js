function generateUserCards() {
    const container = document.querySelector('.users-container');
    const users = Array(8).fill({ name: 'Usuario x - email' });

    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
            <span>${user.name}</span>
            <button onclick="removeUser(this)" aria-label="Remove user">✕</button>
        `;
        container.appendChild(card);
    });
}

function openModal() {
    document.getElementById('userModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}

function cadastrarUsuario() {
    // Pegar valores dos campos
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const cpf = document.getElementById('cpf').value;
    const funcao = document.getElementById('funcao').value;

    // Validações básicas
    if (!nome || !email || !senha || !cpf || !funcao) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Criar objeto com dados do usuário
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        funcao_empresa: funcao,
        fk_empresa: localStorage.getItem('EMPRESA_ID') 
    };

    // Enviar para o backend
    fetch('/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            alert('Usuário cadastrado com sucesso!');
            closeModal();
            window.location.reload(); // Recarrega a página para mostrar o novo usuário
        } else {
            alert('Erro ao cadastrar usuário: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar usuário!');
    });
}

function removeUser(button) {
    button.closest('.user-card').remove();
}

document.addEventListener('DOMContentLoaded', function() {
    generateUserCards();

    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            closeModal();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    generateUserCards();
});

window.addEventListener('click', function(e) {
    const modal = document.getElementById('userModal');
    if (e.target === modal) {
        closeModal();
    }
});