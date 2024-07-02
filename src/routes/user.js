const Router = require('koa-router');
var jwr = require('jsonwebtoken');
const dotenv = require('dotenv');
const utilsAuth = require('../lib/auth/jwt');

dotenv.config();

const router = new Router();


router.get('/', utilsAuth.isUser, async (ctx) => {
  try {
    const user = await ctx.orm.User.findAll();
    ctx.body = user;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('/profile', utilsAuth.isUser, async (ctx, next) => {
  try {
    const secret = process.env.JWT_SECRET;
    await next();
    const token = ctx.request.header.authorization.split(' ')[1];
    const decodedToken = jwr.verify(token, secret);
    const userId = decodedToken.sub;
    const user = await ctx.orm.User.findOne({ where: { id: userId } });
    ctx.body = user;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});


module.exports = router;
