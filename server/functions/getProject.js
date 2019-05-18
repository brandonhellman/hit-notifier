const { JSDOM } = require(`jsdom`);

function getHitSetId(html, frag) {
  const htmlMatch = html.match(/projects\/([A-Z0-9]+)\/tasks/);

  if (htmlMatch) {
    return htmlMatch[1];
  }

  return null;
}

function getRequesterId(html, frag) {
  const htmlMatch = html.match(/requesters\/([A-Z0-9]+)\/projects/);

  if (htmlMatch) {
    return htmlMatch[1];
  }

  return null;
}

function getRequesterName(html, frag) {
  const mtsMatch = [...frag.querySelectorAll(`b`)].find((b) => b.textContent === `Requester:`);

  if (mtsMatch && mtsMatch.nextElementSibling && mtsMatch.nextElementSibling.textContent) {
    return mtsMatch.nextElementSibling.textContent.trim();
  }

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
  const htmlMatch = html.match(/Reward:.+?([0-9.]+)/) ? html.match(/Reward:.+?([0-9.]+)/)[1] : null;

  if (htmlMatch) {
    return Number(htmlMatch[0]);
  }

  return null;
}

function getProject(html) {
  const frag = JSDOM.fragment(html);

  return {
    hit_set_id: getHitSetId(html, frag),
    requester_id: getRequesterId(html, frag),
    requester_name: getRequesterName(html, frag),
    title: getTitle(html, frag),
    description: getDescription(html, frag),
    monetary_reward: {
      amount_in_dollars: getReward(html, frag),
    },
  };
}

module.exports = getProject;
