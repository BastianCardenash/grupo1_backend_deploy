const Router = require("koa-router");
const authUtils = require("../lib/auth/jwt.js");

const router = new Router();

router.get("/protecteduser", authUtils.isUser, async (ctx) => {
    ctx.body = {
        user: ctx.state.user,
        id: ctx.state.user.sub
    }
})

router.get("/admin", authUtils.isAdmin, async (ctx) => {
    // Devolvemos la lista de todos los usuarios
    ctx.body = await ctx.orm.User.findAll();
})
 
module.exports = router;