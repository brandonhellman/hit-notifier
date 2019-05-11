const axios = require(`axios`);
const express = require(`express`);
const http = require(`http`);
const socketIo = require(`socket.io`);

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3001;

let connections = 0;

app.get(`*`, (req, res) => {
  res.redirect(`http://localhost:3000/`);
});

io.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

io.on(`connection`, (socket) => {
  connections++;
  socket.emit(`count`, connections);
  console.log(connections);

  socket.on(`disconnect`, () => {
    connections--;
    console.log(connections);
  });
});

async function fetchMTC() {
  const response = await axios.get(`https://mturkcrowd.com/api.php?action=getPosts&order_by=post_date&limit=10`);
  return response.data.posts;
}

async function fetchTVF() {
  const response = await axios.get(`https://forum.turkerview.com/hub.php?action=getPosts&order_by=post_date&limit=10`);
  return response.data.posts;
}
