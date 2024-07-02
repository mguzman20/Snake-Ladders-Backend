const Router = require('koa-router');
const state = require('./routes/state');
const play = require('./routes/play');
const user = require('./routes/user');
const game = require('./routes/game');
const authentication = require('./routes/authentication');
const jwtMiddleware = require('koa-jwt');
const dotenv = require('dotenv');

dotenv.config();

const router = new Router();

router.get('/', (ctx) => {
    ctx.body = 'Hello World';
});

router.use('/authentication', authentication.routes());

// Rutas protegidas:
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));
router.use('/user', user.routes());
router.use('/state', state.routes());
router.use('/play', play.routes());
router.use('/game', game.routes());



module.exports = router;
