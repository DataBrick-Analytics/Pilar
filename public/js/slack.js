let isEditing = false;
let editingID = null;

function openModalSlack(cargo = '', canal = '', id_notificacao = null) {
    isEditing = !!id_notificacao;
    editingID = id_notificacao;

    const modal = document.querySelector('.modal');
    const overlay = document.getElementById('modalOverlay');

    modal.style.display = 'block';
    overlay.style.display = 'block';

    document.querySelector('#cargo').value = cargo;
    document.querySelector('#canal').value = canal;
}


function closeModalSlack() {
    const modal = document.querySelector('.modal');
    const overlay = document.getElementById('modalOverlay');

    isEditing = false;
    editingID = null;

    modal.style.display = 'none';
    overlay.style.display = 'none';
}

async function handleSaveSlack(event) {
    event.preventDefault();

    const cargo = document.querySelector('#cargo').value;
    const canal = document.querySelector('#canal').value;

    if (isEditing) {
        await updateSlack(editingID, canal, cargo);
    } else {
        await saveSlack(canal, cargo);
    }

    isEditing = false;
    editingID = null;

    closeModalSlack();
    document.querySelector('.alerts-container').innerHTML = '';
    getAllSlack();
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

async function saveSlack(canalSlack, cargo) {
    const userID = localStorage.getItem('USER_ID');
    const enterpriseID = localStorage.getItem('EMPRESA_ID');

    try {
        const response = await fetch(`/slack/save/${userID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cargo, canalSlack, enterpriseId: enterpriseID })
        });

        if (response.ok) {
            Swal.fire({ icon: 'success', title: 'Sucesso!', text: 'Configurações do Slack salvas com sucesso!' });
            document.getElementById('cargo').value = '';
            document.getElementById('canal').value = '';
            getAllSlack();
            closeModalSlack();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao salvar configurações');
        }
    } catch (error) {
        Swal.fire({ icon: 'error', title: 'Erro!', text: `Erro ao salvar configurações: ${error.message}` });
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
            const alertsContainer = document.querySelector('.alerts-container');
            alertsContainer.innerHTML = '';
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
                    <span class="buttons">
                        <label class="switch">
                            <input type="checkbox" ${slack.status == 1 ? 'checked' : ''} onchange="toggleSlackStatus(${slack.id_notificacao}, this.checked)">
                            <span class="slider"></span>
                        </label>
                        <button class="edit-button" onclick="openModalSlack('${slack.cargo}', '${slack.canal}', ${slack.id_notificacao})">✏</button>
                        <button class="delete-button" onclick="deleteSlack(${slack.id_notificacao})">×</button>
                    </span>
                `;
                alertDiv.setAttribute('data-id', slack.id_notificacao);
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

async function toggleSlackStatus(notificationID, newStatus) {
    try {
        const response = await fetch(`/slack/updateStatus/${notificationID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao atualizar status');
        } else {
            const alertDiv = document.querySelector(`.alert[data-id="${notificationID}"]`);
            if (newStatus) {
                alertDiv.classList.add('online');
                alertDiv.classList.remove('offline');
            } else {
                alertDiv.classList.add('offline');
                alertDiv.classList.remove('online');
            }

        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: `Erro ao mudar status: ${error.message}`
        });
    }
}


async function updateSlack(notificationID, canal, cargo) {
    try {
        const response = await fetch(`/slack/update/${notificationID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ canal, cargo })
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Configurações do Slack atualizadas com sucesso!'
            });
            getAllSlack();
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
            const alertDiv = document.querySelector(`.alert[data-id="${notificationID}"]`);
            if (alertDiv) {
                alertDiv.remove();
            }
            getAllSlack();
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