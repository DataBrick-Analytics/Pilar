var dataModel = require("../models/dataModel");


//KPIS
function getRegionType(req, res) {
	var fkBairro = req.params.id;
    // const fkBairro = localStorage.getItem("FK_BAIRRO")
	console.log("ID recebido:", id);

	// Verifica se o ID está definido e não é nulo
	if ( fkBairro == undefined || fkBairro == null) {
		return res.status(400).json({
			error: "O id está undefined ou nulo!"
		});
	}

	dataModel.getRegionType(fkBairro)
		.then(
			function (resultado) {
				res.json(resultado);
			}
		).catch(
			function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro na coleta de novos Dados:",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			}
		);
}


function getUrbanMeshDensity(req, res) {
    var fkBairro = req.params.id;
	// const fkBairro = localStorage.getItem("FK_BAIRRO")
    console.log("ID recebido:", fkBairro);

	if (fkBairro == undefined) {
		return res.status(400).send("fkBairro está undefined")
	}

	dataModel.getUrbanMeshDensity(fkBairro)
		.then(
			function (resultado) {
				res.status(200).json(resultado)
				console.log("Valor Densidade: " + resultado)
			}
		).catch(
			function (erro) {
				console.log("Houve um erro ao pegar a Densidade")
				res.status(500).json(erro.sqlMessage)
			}
		)
}

function getPriceSquareMeter(req, res) {
    var fkBairro = req.params.id;
    // const fkBairro = localStorage.getItem("FK_BAIRRO")
    console.log("ID recebido:", fkBairro);


    if (fkBairro == undefined) {
        return res.status(400).send("fkBairro está undefined")
    }

    dataModel.getPriceSquareMeter(fkBairro)
        .then(
            function (resultado) {
                res.status(200).json(resultado)
                console.log("Valor Preço m²: " + resultado)
            }
        ).catch(
            function (erro) {
                console.log("Houve um erro ao pegar o Preço m²")
                res.status(500).json(erro.sqlMessage)
            }
        )
}


//AUXILIARES
async function getSchoolsRegion(req, res) {
    var fkBairro = req.params.id;
	// const fkBairro = localStorage.getItem("FK_BAIRRO")
    console.log("ID recebido:", fkBairro);


	await dataModel.getSchoolsRegion(fkBairro)
		.then(
			function (resultado) {
				res.status(200).send(resultado.length)
				console.log("Qtd de escolas encontradas: " + resultado.length)
			}
		).catch(
			function (erro) {
				console.log("Houve um erro ao pegar as escolas")
				res.status(500).json(erro.sqlMessage)
			}
		)
	}

function getHospitalsByRegion(req, res) {
    var fkBairro = req.params.id;
    // const fkBairro = localStorage.getItem("FK_BAIRRO")
    console.log("ID recebido:", fkBairro);

    if (fkBairro == undefined) {
        return res.status(400).send("fkBairro está undefined")
    }

    dataModel.getHospitalsByRegion(fkBairro)   
        .then(
            function (resultado) {
                res.status(200).json(resultado)
                console.log("Qtd de hospitais encontrados: " + resultado.length)
            }
        ).catch(
            function (erro) {
                console.log("Houve um erro ao pegar os hospitais")
                res.status(500).json(erro.sqlMessage)
            }
        )
    }

//GRAFICOS
function getMediaByFifth(req, res) {
	var fkBairro = req.params.id;
    // const fkBairro = localStorage.getItem("FK_BAIRRO")
	console.log("ID recebido:", fkBairro);

	// Verifica se o idBairro está definidBairroo e não é nulo
	if (fkBairro == undefined || fkBairro == null) {
		return res.status(400).json({
			error: "O idBairro está undefined ou nulo!"
		});
	}
	dataModel.getMediaByFifth(fkBairro)
		.then(
			function (resultado) {
				res.json(resultado);

			}
		).catch(
			function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro na coleta de novos Dados:",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			}
		);
    }



	function getPriceFluctuation(req, res) {
		var fkBairro = req.params.id;
        // const fkBairro = localStorage.getItem("FK_BAIRRO")
		console.log("ID recebido:", fkBairro);

		if (fkBairro == undefined || fkBairro == null) {
			return res.status(400).json({
				error: "O id está undefined ou nulo!"
			});
		}

		dataModel.getPriceFluctuation(fkBairro)
			.then(
				function (resultado) {
					res.json(resultado);
				}
			).catch(
				function (erro) {
					console.log(erro);
					console.log(
						"\nHouve um erro na coleta de novos Dados:",
						erro.sqlMessage
					);
					res.status(500).json(erro.sqlMessage);
				}
			);
	}



	module.exports = {
        //KPIS
		getRegionType,
		getUrbanMeshDensity,
        getPriceSquareMeter,

        //GRAFICOS
		getMediaByFifth,
        getPriceFluctuation,

        //AUXILIARES
		getSchoolsRegion,
        getHospitalsByRegion
    };
