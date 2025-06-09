function openModalSlack() {
    const modal = document.querySelector('.modal');
    const overlay = document.getElementById('modalOverlay');

    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeModalSlack() {
    const modal = document.querySelector('.modal');
    const overlay = document.getElementById('modalOverlay');

    modal.style.display = 'none';
    overlay.style.display = 'none';
}

document.getElementById('modalOverlay').addEventListener('click', closeModalSlack);

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModalSlack();
    }
});

document.querySelector('.modal').addEventListener('click', function (event) {
    event.stopPropagation();
});

async function saveSlack(event) {
    event.preventDefault();

    const cargo = document.getElementById('cargo').value.trim();
    const canalSlack = document.getElementById('slack').value.trim();

    if (!cargo || !canalSlack) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos!'
        });
        return;
    }

    const userID = localStorage.getItem('USER_ID');

    try {
        const response = await fetch(`/slack/save/${userID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cargo: cargo,
                canalSlack: canalSlack
            })
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Configurações do Slack salvas com sucesso!'
            });

            document.getElementById('cargo').value = '';
            document.getElementById('slack').value = '';

            closeModalSlack();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao salvar configurações');
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: `Erro ao salvar configurações: ${error.message}`
        });
    }
}

async function getAllSlack() {
    const userID = localStorage.getItem('USER_ID');

    try {
        const response = await fetch(`/slack/getAll/${userID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            for(const slack of data) {
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert';

                if (slack.status == true) {
                    alertDiv.className += " online";
                } else {
                    alertDiv.className += " offline";
                }

                alertDiv.innerHTML = `
                    <p>Canal: <strong>${slack.canal}</strong> | Cargo: <strong>${slack.cargo}</strong></p>
                    <button class="edit-button" onclick="openModalSlack('${slack.cargo}', '${slack.canal}', ${slack.id_notificacao})">✏</button>
                    <button class="close-button" onclick="deleteSlack(${slack.id_notificacao})">×</button>
                `;
                alertsContainer.appendChild(alertDiv);
            }
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao buscar configurações');
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: `Erro ao buscar configurações: ${error.message}`
        });
    }
}

async function updateSlack(notificationID) {
    try {
        const response = await fetch(`/slack/update/${notificationID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Configurações do Slack atualizadas com sucesso!'
            });
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao atualizar configurações');
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: `Erro ao atualizar configurações: ${error.message}`
        });
    }
}

async function deleteSlack(notificationID) {
    try {

        const response = await fetch(`/slack/delete/${notificationID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Configurações do Slack excluídas com sucesso!'
            });
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao excluir configurações');
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: `Erro ao excluir configurações: ${error.message}`
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getAllSlack();
});