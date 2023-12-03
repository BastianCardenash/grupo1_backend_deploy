const Router = require("koa-router");

const router = new Router();

// Crear un comentario en una publicación 
router.post("comments.create", "/", async (ctx) => {
  try {
    const comment = await ctx.orm.Comment.create(ctx.request.body);
    ctx.body = comment;
    ctx.status = 201;
  } catch(error){
    ctx.body = error;
    ctx.status = 400;
  }
})

// Mostrar todos los comentarios de una publicación
router.get("comments.index", "/:id", async (ctx) => {
  try {
    const comments = await ctx.orm.Comment.findAll({ where: { post_id: ctx.params.id } });
    ctx.body = comments;
    ctx.status = 200;
  } catch(error){
      ctx.body = error;
      ctx.status = 400;
  }
})

// Borrar una comentario
router.delete("comments.delete", "/:id", async (ctx) => {
  try {
      const comment = await ctx.orm.Comment.destroy({
          where: {
              id: ctx.params.id
          }
      });
      ctx.body = comment;
      ctx.status = 200;
  } catch(error){
      ctx.body = error;
      ctx.status = 400;
  }
})



module.exports = router;