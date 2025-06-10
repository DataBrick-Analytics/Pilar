addEventListener("DOMContentLoaded", () => {

    export function favoritar(user, enterprise, property) {
        const dateFavorited = new Date()

        if (user == null || enterprise == null || property == null || favoriteLand == null) {
            const valores = {user, enterprise, property, favoriteLand}

            valores.forEach(function (item) {
                if (item === null) {
                    console.log(`${item} está nulo!`)
                }
            })
        }
        fetch("/favorite/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({
                userID: user,
                enterpriseID: enterprise,
                favoriteLand: property,
                dateFavorited: dateFavorited
            })
        })
    }
})