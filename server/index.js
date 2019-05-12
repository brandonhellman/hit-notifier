const axios = require(`axios`);
const cheerio = require(`cheerio`);
const express = require(`express`);
const http = require(`http`);
const socketIo = require(`socket.io`);

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3001;

let connections = 0;
let history = [];

app.get(`*`, (req, res) => {
  res.redirect(`http://localhost:3000/`);
});

io.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

io.on(`connection`, (socket) => {
  socket.emit(`history`, history);
  io.sockets.emit(`connections`, ++connections);

  socket.on(`disconnect`, () => {
    io.sockets.emit(`connections`, --connections);
  });
});

function handleHIT(html, url) {
  const hitSetId = html.match(/projects\/([A-Z0-9]+)\/tasks/);

  // Skip if there is no hit set id.
  if (!hitSetId) {
    return;
  }

  // Skip if hit is in the history.
  history.forEach(({ html }) => {
    if (html.includes(hitSetId)) {
      return;
    }
  });

  const item = { html, url };

  io.sockets.emit(`hit`, item);
  history.unshift(item);

  // Only keep the last 10 HITs.
  if (history.length > 10) {
    history.pop();
  }
}

async function fetchMTC() {
  const response = await axios.get(`https://mturkcrowd.com/api.php?action=getPosts&order_by=post_date&limit=10`);
  return response.data.posts;
}

async function fetchTVF() {
  const response = await axios.get(`https://forum.turkerview.com/hub.php?action=getPosts&order_by=post_date&limit=10`);
  return response.data.posts;
}

async function mturkcrowd() {
  const posts = await fetchMTC();

  posts.forEach((post) => {
    const $ = cheerio.load(post.message_html);
    const hits = $(`.ctaBbcodeTable`);

    for (let i = 0; i < hits.length; i++) {
      const hit = hits.eq(i);
      const html = $(`<div>`)
        .append(hit.clone())
        .html();

      if (hit.find(`a[href^="https://worker.mturk.com/"]`)[0] && hit.find(`:contains(Reward)`)[0]) {
        handleHIT(html, `http://mturkcrowd.com/posts/${post.post_id}`);
      }
    }
  });
}

setInterval(mturkcrowd, 30000);
