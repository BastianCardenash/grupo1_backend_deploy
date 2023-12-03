const Router = require("koa-router");
const authUtils = require("../lib/auth/jwt.js");
const bcrypt = require('bcrypt');

const router = new Router();

// Mostrar todos los usuarios
router.get("users.index", "/", async (ctx) => {
    try {
        const users = await ctx.orm.User.findAll();
        ctx.body = users;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Mostrar un usuario
router.get("users.show", "/:id", async (ctx) => {
    try {
        const user = await ctx.orm.User.findByPk(ctx.params.id);
        ctx.body = user;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Eliminar un usuario
router.delete("users.delete", "/:id", async (ctx) => {
    try {
        const user = await ctx.orm.User.destroy({
            where: {
                id: ctx.params.id
            }
        });
        ctx.body = user;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Modificar un usuario
router.patch("users.update", "/:id", async (ctx) => {
    try {
        const user = await ctx.orm.User.update(ctx.request.body, {
            where: {
                id: ctx.params.id
            }
        });
        ctx.body = user;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Cambiar contraseña de usuario
router.patch("users.changePassword", "/password/:id", async (ctx) => {
    try {
        const body = ctx.request.body;
        const user = await ctx.orm.User.findByPk(ctx.params.id);

        const saltRounds = 10;

        const validPassword = await bcrypt.compare(body.prevPassword, user.password);
        if (!validPassword){
            ctx.status = 400;
            ctx.body = { message: 'La contraseña actual es incorrecta' };
            return;
        }

        const newPassword = await bcrypt.hash(body.password, saltRounds);

        const updatedUser = await user.update({
            password: newPassword
        });
        ctx.body = updatedUser;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Agregamos un usuario a la lista de amigos de otro usuario en el atributo array friendsIds
router.patch("users.addFriend", "/:id/friends/:friendId", async (ctx) => {
    try {
        const user = await ctx.orm.User.findByPk(ctx.params.id);
        const friend = await ctx.orm.User.findByPk(ctx.params.friendId);

        if (user.friendsIds.includes(friend.id)) {
            ctx.status = 400;
            ctx.body = { message: 'El usuario ya es amigo de este usuario' };
            return;
        }

        const updatedUser = await user.update({
            friendsIds: [...user.friendsIds, friend.id]
        });

        ctx.body = updatedUser;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

// Eliminar un usuario de la lista de amigos de otro usuario en el atributo array friendsIds
router.patch("users.removeFriend", "/:id/remove/:friendId", async (ctx) => {
    try {
        const user = await ctx.orm.User.findByPk(ctx.params.id);
        const friend = await ctx.orm.User.findByPk(ctx.params.friendId);
        
        if (!user.friendsIds.includes(friend.id)) {
            ctx.status = 400;
            ctx.body = { message: 'El amigo a remover no se encuentra en su lista de amigos.' };
            return;
        }
        
        const newFriends = user.friendsIds.filter(id => id != friend.id)
        const updatedUser = await user.update({
            friendsIds: newFriends
        });

        ctx.body = updatedUser;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

module.exports = router;
