function entrar() {
	var emailVar = email_input.value;
	var senhaVar = senha_input.value;

	if (emailVar == "" || senhaVar == "") {
		console.log("Erro na hora do Login")

		Swal.fire({
			icon: "error",
			title: "Opa...",
			text: "Informações Faltando!",
			color: "#FFFFFF",
			background: "#2C3E50"
		})
		return
	}


	console.log("FORM LOGIN: ", emailVar);
	console.log("FORM SENHA: ", senhaVar);

	fetch("/enterprise/autenticar", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: emailVar,
			senha: senhaVar
		})
	})
		.then(resposta => {
			console.log("ESTOU NO THEN DO entrar()!")
			if (!resposta.ok) {
				// Aqui a gente tenta extrair a mensagem de erro que veio do backend
				return resposta.text().then(mensagemErro => {
					throw new Error(mensagemErro);
				});
			}
			return resposta.json();
		})
		.then(dadosEmpresa => {
			Swal.fire({
				icon: "success",
				title: "Bem-vindo!",
				text: "Login realizado com sucesso",
				color: "#FFFFFF",
				background: "#2C3E50"
			})
				.then(() => {
					sessionStorage.setItem("ID_EMPRESA", dadosEmpresa.idEmpresa)
					sessionStorage.setItem("NOME_EMPRESA", dadosEmpresa.nomeEmpresa)
					sessionStorage.setItem("EMAIL", dadosEmpresa.email);
					sessionStorage.setItem("ENDERECO", dadosEmpresa.endereco); // 'totalGuardado' está correto
					sessionStorage.setItem("TELEFONE", dadosEmpresa.telefone);

					window.location = "/dashboard.html"
				})
		})
		.catch(function (erro) {
			console.log(erro);
			Swal.fire({
				icon: "error",
				title: "Erro ao fazer login",
				text: erro.message,
				color: "#FFFFFF",
				background: "#2C3E50"
			});
		})
	return false;
}

document.addEventListener("DOMContentLoaded", () => {
	var iconSenha = document.getElementById("senhaIcon")

	iconSenha.addEventListener('click', () => {
		senha_input.type = senha_input.type === "password" ? "text" : "password"
	})
})

document.addEventListener("DOMContentLoaded", () => {
	var botao = document.getElementById("BotaoLogin")

	botao.addEventListener('click', () => {

		Swal.fire({
			icon: "success",
			title: "Bem-vindo!",
			text: "Login realizado com sucesso",
			color: "#FFFFFF",
			background: "#2C3E50"
		})
		.then(() => {
		window.location = "/dashboard.html"
	})
})
}
)