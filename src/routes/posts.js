const Router = require("koa-router");

const router = new Router();

// Crear una publicacion
router.post("posts.create", "/", async (ctx) => {
    try {
        const post = await ctx.orm.Post.create(ctx.request.body);
        ctx.body = post;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Mostrar todas las publicaciones
router.get("posts.index", "/", async (ctx) => {
    try {
        const posts = await ctx.orm.Post.findAll();
        ctx.body = posts;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Obtener datos de una publicacion con su id
router.get("posts.show", "/:id", async (ctx) => {
    try {
        const post = await ctx.orm.Post.findByPk(ctx.params.id);
        ctx.body = post;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Borrar una publicacion
router.delete("posts.delete", "/:id", async (ctx) => {
    try {
        const post = await ctx.orm.Post.destroy({
            where: {
                id: ctx.params.id
            }
        });
        ctx.body = post;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Editar una publicación
router.patch("posts.update", "/:id", async (ctx) => {
    try {
        const post = await ctx.orm.Post.update(ctx.request.body, {
            where: {
                id: ctx.params.id
            }
        });
        ctx.body = post;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})


module.exports = router;