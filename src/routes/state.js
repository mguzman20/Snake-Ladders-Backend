const Router = require('koa-router');

const router = new Router();

router.get('/:id', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findOne({ where: { id: ctx.params.id } });
    ctx.body = game;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
