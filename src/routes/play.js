const Router = require('koa-router');
const path = require('path');
const fs = require('fs');

const router = new Router();
const pathTable = path.join(__dirname, '../data/table.json');
const tableJson = JSON.parse(fs.readFileSync(pathTable, 'utf8'));


function newPosition(initPosition) {
  for (let i = 0; i < tableJson.snakes.length; i += 1) {
    if (tableJson.snakes[i][0] === initPosition) {
      return tableJson.snakes[i][1];
    }
  }
  for (let j = 0; j < tableJson.ladders.length; j += 1) {
    if (tableJson.ladders[j][0] === initPosition) {
      return tableJson.ladders[j][1];
    }
  }
  return initPosition;
}

function updateTurn(actual) {
  if (actual === 1) return 2;
  if (actual === 2) return 3;
  if (actual === 3) return 4;
  if (actual === 4) return 1;
  return 1;
}

router.post('/', async (ctx) => {
  try {
    const playerTurn = ctx.request.body.playerTurn.playerInTurn; // 1, 2, 3 o 4
    const gameId = ctx.request.body.id.gameId; // enviar id del juego
    const dado = Math.floor(Math.random() * 6) + 1;
    const game = await ctx.orm.Game.findOne({ where: { id: gameId } });
    const position = `position_${playerTurn}`;
    const initPosition = game[position];
    const finalPosition = newPosition(initPosition + dado);
    game[position] = finalPosition;
    game.player_turn = updateTurn(playerTurn);
    if (finalPosition >= 100) {
      game[position] = 100;
      game.game_finished = true;
    }
    await game.save();

    ctx.status = 200;
    ctx.body = { dado, initPosition, finalPosition };
  } catch (error) {
    ctx.body = 'error';
    ctx.status = 400;
  }
});

module.exports = router;
