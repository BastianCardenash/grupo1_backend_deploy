const Router = require('koa-router');
var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');

dotenv.config();

const router = new Router();

router.post("authetincation.signup", "/signup", async (ctx) => {
    const authInfo = ctx.request.body;
    let user = await ctx.orm.User.findOne({ where: { email: authInfo.email } });
    if (user) {
        ctx.body = `User with email '${authInfo.email}' already exists`;
        ctx.status = 400;
        return;
    }
    try {
        const saltRounds = 10;
        const hashPasword = await bcrypt.hash(authInfo.password, saltRounds);

        user = await ctx.orm.User.create({
                name: authInfo.name,
                email: authInfo.email,
                password: hashPasword,
                status: authInfo.status,
                friendsIds: [1]
            })
    }
    catch (error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    ctx.body = {
        username: user.username,
        email: user.email,
    };
    ctx.status = 201;
})

router.post("authentication.login", "/login", async (ctx) => {
    let user;
    const authInfo = ctx.request.body
    try {
        user = await ctx.orm.User.findOne({where:{email:authInfo.email}});
    }
    catch(error) {
        ctx.body = error;
        ctx.status = 400;
        return;
    }
    if (!user) {
        ctx.body = `The user by the email '${authInfo.email}' was not found`;
        ctx.status = 400;
        return;
    }

    const validPassword = await bcrypt.compare(authInfo.password, user.password);

    if (validPassword) {
        ctx.body = {
            username: user.username,
            email: user.email,
        };
        ctx.status = 200;
    } else {
        ctx.body = "Incorrect password";
        ctx.status = 400;
        return;
    }


    // Creamos el JWT. Si quisieras agregar distintos scopes, como por ejemplo
    // "admin", podrían hacer un llamado a la base de datos y cambiar el payload
    // en base a eso.
    const expirationSeconds = 1 * 60 * 60 * 24;
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
    token = jwt.sign(
        { scope: ['user'], exp: expirationSeconds + Date.now() / 1000},
        JWT_PRIVATE_KEY,
        { subject: user.id.toString() },
    );

    // Si el email es admin@admin.cl, le agregamos el scope de admin
    if (user.email === 'admin@uc.cl') {
        token = jwt.sign(
            { scope: ['user', 'admin'], exp: expirationSeconds + Date.now() / 1000},
            JWT_PRIVATE_KEY,
            { subject: user.id.toString() },
        );
    }
    
    ctx.body = {
    "access_token": token,
    "token_type": "Bearer",
    "expiresIn": expirationSeconds,
    }
    ctx.status = 200;

})

module.exports = router;