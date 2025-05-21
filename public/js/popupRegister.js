addEventListener("DOMContentLoaded", function () {
    async function generateUserCards() {
        const resposta = await fetch("/enterprise/employees")
        const employees = await resposta.json()
        const employeesList = [employees];

        console.log("Tamo no retorno", employeesList)

        const container = document.querySelector('.users-container');
        const users = Array(employeesList.length).fill({ name: 'Usuario x - email' });

        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
            <span>${user.name}</span>
            <button onclick="removeUser(this)" aria-label="Remove user">✕</button>
        `;
            container.appendChild(card);

        })
    }

    function closeModal() {
        document.getElementById('userModal').style.display = 'none';
    }



    document.getElementById('userForm').addEventListener('submit', function (e) {
        e.preventDefault();
        closeModal();
    });

    document.addEventListener('DOMContentLoaded', function () {
        generateUserCards();
    });

    window.addEventListener('click', function (e) {
        const modal = document.getElementById('userModal');
        if (e.target === modal) {
            closeModal();
        }
    });
})

function openModal() {
    document.getElementById('userModal').style.display = 'flex';
}
function removeUser(button) {
    button.closest('.user-card').remove();
}