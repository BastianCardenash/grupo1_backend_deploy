const Koa = require("koa");
const KoaLogger = require("koa-logger");
const { koaBody } = require("koa-body");
const router = require("./routes.js");
const orm = require("./models");
const cors = require("@koa/cors");

const app = new Koa();

app.context.orm = orm;

// Koa Middlewares
app.use(cors());
app.use(KoaLogger());
app.use(koaBody());


// Koa router
app.use(router.routes());


// app.listen(3000, () => {
//     console.log("Iniciando app. Escuchando en el puerto http://localhost:3000");
// });

module.exports = app;