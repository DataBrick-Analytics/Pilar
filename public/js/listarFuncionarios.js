addEventListener("DOMContentLoaded", () => {

    async function getAllEmployees() {
        try{
            const answer = await fetch("/enterprise/employees")
            const employees = await answer.json()
        }
    }
})