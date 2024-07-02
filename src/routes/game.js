const Router = require('koa-router');

const router = new Router();
const { Op } = require('sequelize');
var jwr = require('jsonwebtoken');
const dotenv = require('dotenv');
const utilsAuth = require('../lib/auth/jwt');

dotenv.config();


router.get('/', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findAll();
    ctx.body = game;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('/', async (ctx, next) => {
  try {
    const newGame = await ctx.orm.Game.create(ctx.request.body);
    const secret = process.env.JWT_SECRET;
    await next();
    const token = ctx.request.header.authorization.split(' ')[1];
    const decodedToken = jwr.verify(token, secret);
    const userId = decodedToken.sub;
    newGame.user_1 = parseInt(userId);
    ctx.body = {
      id: newGame.id,
    };
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});


router.get('/obtain/:id', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findOne({
      where: {
        id: ctx.params.id
      }
    });
    ctx.body = game;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('/obtainPlayers/:id', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findOne({
      where: {
        id: ctx.params.id
      }
    });
    player1 = game.user_1 ? await ctx.orm.User.findOne({where: {id: game.user_1}}) : null;
    player2 = game.user_2 ? await ctx.orm.User.findOne({where: {id: game.user_2}}) : null;
    player3 = game.user_3 ? await ctx.orm.User.findOne({where: {id: game.user_3}}) : null;
    player4 = game.user_4 ? await ctx.orm.User.findOne({where: {id: game.user_4}}) : null;

    ctx.body = {user_1: player1.username,
      user_2:player2.username,
      user_3:player3.username, 
      user_4:player4.username};
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});
  

router.get('/pregame', async (ctx) => {
  try {
    const game = await ctx.orm.Game.findAll({
      where: {
        [Op.or]: [
          { user_1: null },
          { user_2: null },
          { user_3: null },
          { user_4: null }
        ]
      },
      game_finished: null
    });

    ctx.body = game;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// juegos que están en curso para el usuario (id)
router.get('/inGame', async (ctx, next) => {
  try {
    const secret = process.env.JWT_SECRET;
    await next();
    const token = ctx.request.header.authorization.split(' ')[1];
    const decodedToken = jwr.verify(token, secret);
    const userId = decodedToken.sub;

    const game = await ctx.orm.Game.findAll({
      where: {
        [Op.or]: [
          { user_1: userId },
          { user_2: userId },
          { user_3: userId },
          { user_4: userId }
        ],
        game_finished: false
      }
    });

    ctx.body = game;
    ctx.status = 200;

  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});


router.get('/addPlayer/:id', async (ctx, next) => {
  try {
    const game = await ctx.orm.Game.findOne({
      where: {
        id: ctx.params.id
        }
        });
      
    const secret = process.env.JWT_SECRET;
    await next();
    const token = ctx.request.header.authorization.split(' ')[1];
    console.log(token);
    const decodedToken = jwr.verify(token, secret);
    const userId = decodedToken.sub;

    
    if (game.user_1 == null) {
      game.user_1 = userId;
    }
    else if (game.user_2 == null) {
      game.user_2 = userId;
    }
    else if (game.user_3 == null) {
      game.user_3 = userId;
    }
    else if (game.user_4 == null) {
      game.user_4 = userId;
    }

    await game.save();
      
    ctx.body = game;
    ctx.status = 200;

  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// router.post

module.exports = router;
