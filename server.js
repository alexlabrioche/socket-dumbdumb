const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const SocketManager = require('./socketManager');

const port = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/init_game', (req, res) => {
  function randomAlphaNumStr(length = 5) {
    return (
      [...Array(length)]
        // eslint-disable-next-line no-bitwise
        .map(() => ((Math.random() * 36) | 0).toString(36))
        .join('')
    );
  }
  res.json({ code: randomAlphaNumStr(5) });
});

io.on('connection', SocketManager(io));

server.listen(port, () => console.log(`🚀 Listening on port ${port}`));
