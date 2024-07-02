const Koa = require('koa');
const KoaLogger = require('koa-logger');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const { koaBody } = require('koa-body');
const io = require('socket.io');
const path = require('path');
const fs = require('fs');
const pathTable = path.join(__dirname, './data/table.json');
const tableJson = JSON.parse(fs.readFileSync(pathTable, 'utf8'));


const router = require('./routes');
const orm = require('./models');

const app = new Koa();


app.context.orm = orm;

app.use(cors());
app.use(KoaLogger());
app.use(koaBody());
app.use(bodyParser());

app.use(router.routes());






const server = require('http').createServer(app.callback());
const socketIO = io(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

socketIO.on('connection', (socket) => {
  console.log('Nuevo cliente conectado al WebSocket');

  socket.on('message', async (data) => {
    console.log('Mensaje recibido del cliente:', data);
    let response = await play(data)
    console.log(response)


    socket.broadcast.emit('response', { response });
    socket.emit('response', { response })
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado del WebSocket');
  });
});





async function play(data) {

  const playerTurn = data.playerInTurn;
  const gameId = data.gameId; 
  const dado = Math.floor(Math.random() * 6) + 1;
  const game = await orm.Game.findOne({ where: { id: gameId } });
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
  return { dado, initPosition, finalPosition, gameId };
}


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

module.exports = { app, server };
