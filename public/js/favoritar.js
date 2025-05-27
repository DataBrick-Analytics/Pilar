// addEventListener("DOMContentLoaded", () => {

//     function favoritar() {
//         const user = sessionStorage.NOME_USUARIO;
//         const enterprise = sessionStorage.NOME_EMPRESA;
//         const property = sessionStorage.NOME_PROPRIEDADE;

//         const favoriteLand = undefined;
//         const dateFavorited = new Date()

//         if (user == null || enterprise == null || property == null || favoriteLand == null) {
//             const valores = { user, enterprise, property, favoriteLand }

//             valores.forEach(function (item) {
//                 if (item === null) {
//                     console.log(`${item} está nulo!`)
//                 }
//             })
//         }

//         fetch("/user/favoritar", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         })
//     }
// })