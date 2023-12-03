const Router = require("koa-router");
const users = require("./routes/users.js");
const events = require("./routes/events.js");
const chats = require("./routes/chats.js");
const posts = require("./routes/posts.js");
const comments = require("./routes/comments.js");
const messages = require("./routes/messages.js");
const authRoutes = require("./routes/authentication.js");
const scopeProtectedRoutes = require("./routes/protected.js");

const jwtmiddleware = require("koa-jwt");
const dotenv = require("dotenv");
dotenv.config();

const router = new Router();

router.use(authRoutes.routes());

// Desde aqui, todas las rutas requieren autenticación
router.use(jwtmiddleware({ secret: process.env.JWT_SECRET }));
router.use('/protected', scopeProtectedRoutes.routes());
router.use('/users', users.routes());
router.use('/posts', posts.routes());
router.use('/comments', comments.routes());
router.use('/events', events.routes());
router.use('/chats', chats.routes());
router.use('/messages', messages.routes());

module.exports = router;