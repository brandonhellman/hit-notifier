const { JSDOM } = require(`jsdom`);

function getRequesterId(html, frag) {
  return null;
}

function getRequesterName(html, frag) {
  return null;
}

function getTitle(html, frag) {
  const mtsMatch = [...frag.querySelectorAll(`b`)].find((b) => b.textContent === `Title:`);

  if (mtsMatch && mtsMatch.nextElementSibling && mtsMatch.nextElementSibling.textContent) {
    return mtsMatch.nextElementSibling.textContent.trim();
  }

  return null;
}

function getDescription(html, frag) {
  const mtsMatch = [...frag.querySelectorAll(`b`)].find((b) => b.textContent === `Description:`);

  if (mtsMatch && mtsMatch.nextSibling && mtsMatch.nextSibling.nodeValue) {
    return mtsMatch.nextSibling.nodeValue.trim();
  }

  return null;
}

function getReward(html, frag) {
  const mtsMatch = html.match(/Reward:.+?([0-9.]+)/) ? html.match(/Reward:.+?([0-9.]+)/)[1] : null;

  if (mtsMatch) {
    return Number(mtsMatch[0]);
  }

  return null;
}

function getProject(html) {
  const frag = JSDOM.fragment(html);

  return {
    hit_set_id: null,
    requester_id: getRequesterId(html, frag),
    requester_name: getRequesterName(html, frag),
    title: getTitle(html, frag),
    description: getDescription(html, frag),
    reward: getReward(html, frag),
  };
}

module.exports = getProject;
