var ambiente_processo = 'desenvolvimento'; // 'desenvolvimento' ou 'producao'

var caminho_env = '';
switch(ambiente_processo) {
    case 'producao':
        caminho_env = '.env.prod';
        break;
    case 'desenvolvimento':
        caminho_env = '.env.dev';
        break;
    default:
        caminho_env = '.env';
}

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var userRouter = require("./src/routes/userRoutes");
var enterpriseRouter = require("./src/routes/enterpriseRoutes");
var modeloRouter = require("./src/routes/modeloRoutes");
var dataRouter = require("./src/routes/dataRoutes");
var filterRouter = require("./src/routes/filterRoutes");
var favoritesRouter = require("./src/routes/favoritesRoutes");
var slackRouter = require("./src/routes/slackRoutes");
var districtRouter = require("./src/routes/districtRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/", userRouter);
app.use("/", enterpriseRouter); 
app.use("/", dataRouter);
app.use("/", filterRouter);
app.use("/", favoritesRouter);
app.use("/", slackRouter);
app.use("/", districtRouter);
app.use("/modeloRoutes", modeloRouter);

app.listen(PORTA_APP, function () {
    console.log(`
.----------------. .----------------. .----------------. .----------------. .----------------. .----------------. .----------------. .----------------. .----------------.   
| .--------------. | .--------------. | .--------------. | .--------------. | .--------------. | .--------------. | .--------------. | .--------------. | .--------------. |  
| |  ________    | | |      __      | | |  _________   | | |      __      | | |   ______     | | |  _______     | | |     _____    | | |     ______   | | |  ___  ____   | |  
| | |_   ___ \`.  | | |     /  \\     | | | |  _   _  |  | | |     /  \\     | | |  |_   _ \\    | | | |_   __ \\    | | |    |_   _|   | | |   .' ___  |  | | | |_  ||_  _|  | |  
| |   | |   \`. \\ | | |    / /\\ \\    | | | |_/ | | \\_|  | | |    / /\\ \\    | | |    | |_) |   | | |   | |__) |   | | |      | |     | | |  / .'   \\_|  | | |   | |_/ /    | |  
| |   | |    | | | | |   / ____ \\   | | |     | |      | | |   / ____ \\   | | |    |  __'.   | | |   |  __ /    | | |      | |     | | |  | |         | | |   |  __'.    | |  
| |  _| |___.' / | | | _/ /    \\ \\_ | | |    _| |_     | | | _/ /    \\ \\_ | | |   _| |__) |  | | |  _| |  \\ \\_  | | |     _| |_    | | |  \\ \`.___.'\\  | | |  _| |  \\ \\_  | |  
| | |________.'  | | ||____|  |____|| | |   |_____|    | | ||____|  |____|| | |  |_______/   | | | |____| |___| | | |    |_____|   | | |   \`._____.'  | | | |____||____| | |  
| |              | | |              | | |              | | |              | | |              | | |              | | |              | | |              | | |              | |  
| '--------------' | '--------------' | '--------------' | '--------------' | '--------------' | '--------------' | '--------------' | '--------------' | '--------------' |  
 '----------------' '----------------' '----------------' '----------------' '----------------' '----------------' '----------------' '----------------' '----------------'   
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
