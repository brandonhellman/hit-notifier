const argv = require('yargs').argv;
const axios = require(`axios`);
const express = require(`express`);
const http = require(`http`);
const { JSDOM } = require(`jsdom`);
const socketIo = require(`socket.io`);

const { delay, port } = require(`./constants`);
const getProject = require(`./functions/getProject`);

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let connections = 0;
let history = [];

app.use(express.static(`${__dirname}/build`));

app.get(`*`, (req, res) => {
  if (argv.dev === `true`) {
    res.redirect(`http://localhost:3000/`);
  } else {
    res.sendFile(`${__dirname}/build/index.html`);
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

io.on(`connection`, (socket) => {
  socket.emit(`history`, history);
  io.sockets.emit(`connections`, ++connections);

  socket.on(`disconnect`, () => {
    io.sockets.emit(`connections`, --connections);
  });
});

function handleHistory(hit) {
  history.unshift(hit);

  if (history.length > 10) {
    history.pop();
  }
}

function isMasters(html) {
  const mtsMasters = html.match(/(Qualifications:).+(Masters Exists)/gi);
  const mtsPhoto = html.match(/(Qualifications:).+(Photo Moderation Masters Exists)/gi);
  return Boolean(mtsMasters || mtsPhoto);
}

function isUsOnly(html) {
  const mtsUs = html.match(/(Qualifications:).+(Location EqualTo US)/gi);
  const mtsUs2 = html.match(/(Qualifications:).+(Location In US)/gi);
  return Boolean(mtsUs || mtsUs2);
}

function handleHit(html, url, posted) {
  const match = html.match(/projects\/([A-Z0-9]+)\/tasks/);

  if (!match) {
    return;
  }

  const hitSetId = match[1];
  const inHistory = history.some(({ id }) => id === hitSetId);

  if (inHistory) {
    return;
  }

  const hit = {
    html,
    url,
    posted,
    id: hitSetId,
    isMasters: isMasters(html),
    isUsOnly: isUsOnly(html),
    project: getProject(html),
  };

  handleHistory(hit);
  io.sockets.emit(`hit`, hit);
}

function handlePost(post, url) {
  const frag = JSDOM.fragment(post.message_html);
  const mtsHits = frag.querySelectorAll(`.ctaBbcodeTable`);

  [...mtsHits].forEach((hit) => {
    const hasMturkLink = hit.querySelector(`a[href^="https://worker.mturk.com/"]`);

    if (hasMturkLink) {
      handleHit(hit.outerHTML, url, post.post_date * 1000);
    }
  });
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
  [...posts].reverse().forEach((post) => handlePost(post, `http://mturkcrowd.com/posts/${post.post_id}`));
}

async function turkerviewforum() {
  const posts = await fetchTVF();
  [...posts].reverse().forEach((post) => handlePost(post, `https://forum.turkerview.com/posts/${post.post_id}`));
}

setInterval(mturkcrowd, delay);
setInterval(turkerviewforum, delay);
