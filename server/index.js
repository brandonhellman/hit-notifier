const argv = require('yargs').argv;
const axios = require(`axios`);
const cheerio = require(`cheerio`);
const express = require(`express`);
const http = require(`http`);
const socketIo = require(`socket.io`);

const { delay, port } = require(`./constants`);

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
  const masters = html.match(/(Qualifications:).+(Masters has been granted)/gi);
  const mtsPhoto = html.match(/(Qualifications:).+(Photo Moderation Masters Exists)/gi);
  return Boolean(masters || mtsPhoto);
}

function isUsOnly(html) {
  const isUS = html.match(/(Qualifications:).+(Location is US)/gi);
  const isUS2 = html.match(/(Qualifications:).+(Location is one of:)(.+|)( US)/gi);
  const mtsUs = html.match(/(Qualifications:).+(Location EqualTo US)/gi);

  const isINT = html.match(/(Qualifications:).+(Location is )(?!US)/gi);
  const isINT2 = html.match(
    /(Qualifications:).+(Location is one of:)(.+|)( (AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW))/gi,
  );

  return Boolean((isUS || isUS2 || mtsUs) && (!isINT || !isINT2));
}

function handleHIT(html, url, posted) {
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
  };

  handleHistory(hit);
  io.sockets.emit(`hit`, hit);
}

function handlePost(post, url) {
  const $ = cheerio.load(post.message_html);
  const hits = $(`.ctaBbcodeTable`);

  for (let i = 0; i < hits.length; i++) {
    const hit = hits.eq(i);
    const html = $(`<div>`)
      .append(hit.clone())
      .html();

    if (hit.find(`a[href^="https://worker.mturk.com/"]`)[0] && hit.find(`:contains(Reward)`)[0]) {
      handleHIT(html, url, post.post_date * 1000);
    }
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
  posts.forEach((post) => handlePost(post, `http://mturkcrowd.com/posts/${post.post_id}`));
}

async function turkerviewforum() {
  const posts = await fetchTVF();
  posts.forEach((post) => handlePost(post, `https://forum.turkerview.com/posts/${post.post_id}`));
}

setInterval(mturkcrowd, delay);
setInterval(turkerviewforum, delay);
