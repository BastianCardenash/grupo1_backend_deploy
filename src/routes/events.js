const Router = require("koa-router");

const router = new Router();

// Crear un evento
router.post("events.create", "/", async (ctx) => {
    try {
        const event = await ctx.orm.Event.create(ctx.request.body);
        ctx.body = event;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Mostrar todos los eventos
router.get("events.index", "/", async (ctx) => {
    try {
        const events = await ctx.orm.Event.findAll();
        ctx.body = events;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Eliminar un evento
router.delete("events.delete", "/:id", async (ctx) => {
    try {
        const event = await ctx.orm.Event.destroy({
            where: {
                id: ctx.params.id
            }
        });
        ctx.body = event;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Modificar un evento
router.patch("events.update", "/:id", async (ctx) => {
    try {
        const event = await ctx.orm.Event.findByPk(ctx.params.id);
        const updatedEvent = await event.update(ctx.request.body);
        ctx.body = updatedEvent;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Añadir un participante a un evento
router.patch("events.addParticipant", "/:id/add/:iduser", async (ctx) => {
    try {
        const event = await ctx.orm.Event.findByPk(ctx.params.id);
        const user = await ctx.orm.User.findByPk(ctx.params.iduser);

        if (event.participantsIds.includes(user.id)) {
            ctx.body = "Ya eres participante de este evento.";
            return;
        }

        const updatedEvent = await event.update({
            participantsIds: [...event.participantsIds, user.id]
        });

        ctx.body = updatedEvent;
        ctx.status = 200;

    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Eliminar un participante de un evento
router.patch("events.removeParticipant", "/:id/remove/:iduser", async (ctx) => {
    try {
        const event = await ctx.orm.Event.findByPk(ctx.params.id);
        const user = await ctx.orm.User.findByPk(ctx.params.iduser);

        if (!event.participantsIds.includes(user.id)) {
            ctx.body = "No eres participante de este evento.";
            return;
        }

        const updatedEvent = await event.update({
            participantsIds: event.participantsIds.filter(id => id !== user.id)
        });
        console.log("Abandonaste el evento")

        ctx.body = updatedEvent;
        ctx.status = 200;

    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})


module.exports = router;