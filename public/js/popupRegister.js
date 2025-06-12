
async function generateUserCards() {
    try {
        const resposta = await fetch(`/enterprise/employees/${localStorage.getItem('EMPRESA_ID')}`)

        const employees = await resposta.json()

        const container = document.querySelector('.users-container');
        container.innerHTML = ''

        employees.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <span id="${user.id_usuario}">${user.nome} - ${user.email}</span>
                <div class="crud">
                    <img class="edit-btn" src="assets/icons-dash/edit.svg" alt="Editar">
                    <img class="size" src="assets/icons-dash/x.png" alt="" aria-label="Remove user">
                </div>
            `;
            container.appendChild(card);

            const editBtn = card.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => {
                localStorage.setItem('ID_FUNCIONARIO', user.id_usuario);
                window.location.href = `usuario.html?id=${user.id_usuario}`;
            });

            const removeBtn = card.querySelector('.size');
            removeBtn.addEventListener('click', function () {
                removeUser(card);
            });

        });     
    } catch (err) {
        console.log("Erro ao gerar os cards", err)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Dom carregado")
    generateUserCards()
})



addEventListener("DOMContentLoaded", () => {
    document.getElementById('userForm').addEventListener('submit', function (e) {
        e.preventDefault();
        closeModal();
    });
})

window.addEventListener('click', function (e) {
    const modal = document.getElementById('userModal');
    if (e.target === modal) {
        closeModal();
    }
});

function openModal() {
    document.getElementById('userModal').style.display = 'flex';
}


async function removeUser(card) {
    const id = Number(card.querySelector('span').id);
    console.log("ID selecionado: " + id);

    const deletion = await fetch(`/user/${id}`, {
        method: "DELETE"
    });
    
    if(deletion.ok){
        alert("Usuário deletado com sucesso")
            registrarAtividade(11);
        await generateUserCards()
    } else {
        alert("Erro ao remover o usuário");
    }

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
    const dtNasc = document.getElementById('dtNasc').value;

    // Validações básicas
    if (!nome || !email || !senha || !cpf || !funcao || !dtNasc) {
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
        fk_empresa: localStorage.getItem('EMPRESA_ID'),
        data_nasc: dtNasc
    };

    // Enviar para o backend
    fetch('/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao cadastrar usuário. Código: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            alert('Usuário cadastrado com sucesso!');
            closeModal();
            window.location.reload();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar usuário: ' + error.message);
        });
}


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('userForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            closeModal();
        });
    }
});

window.addEventListener('click', function (e) {
    const modal = document.getElementById('userModal');
    if (e.target === modal) {
        closeModal();
    }
});
