const axios = require('axios');
const { JSDOM } = require('jsdom');

module.exports.fetchPostsMtc = async function() {
  const threads = await axios.get('https://mturkcrowd.com/forums/daily-work-threads.4/');
  const threadsDOM = new JSDOM(threads.data);
  const latestThread = threadsDOM.window.document.querySelector('.js-threadList > .structItem');
  let pageJump = latestThread.querySelector('.structItem-pageJump');
  let lastPageHref = '';

  if (pageJump != null) {
    lastPageHref = latestThread.querySelector('.structItem-pageJump > a:last-of-type').href;
  } else {
    lastPageHref = latestThread.querySelector('.structItem-title > a').href;
  }

  const page = await axios.get(`https://mturkcrowd.com${lastPageHref}`);
  const pageDOM = new JSDOM(page.data);
  const posts = pageDOM.window.document.querySelectorAll('.js-post');

  return [...posts].map((post) => {
    return {
      message_html: post.querySelector('.bbWrapper').innerHTML,
      post_date: Number(post.querySelector('time').dataset.time),
      post_id: Number(post.dataset.content.replace('post-', '')),
    };
  });
};
