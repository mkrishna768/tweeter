/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//test data
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function(tweetData) {
  //finding when tweet posted
  const present = new Date(Date.now()); 
  const tweetDate = new Date(tweetData.created_at);
  const timeDiff = present.getTime() - tweetDate.getTime(); 
  const days = Math.floor(timeDiff / (1000 * 3600 * 24));
  //returning tweet
  return $(`<article class="tweet">
              <header>
                <img src="${tweetData.user.avatars}">
                <section>
                  <span class="tweet-name">${tweetData.user.name}</span>
                  <span class="tweet-user">${tweetData.user.handle}</span>
                </section>
              </header>
              <p>${tweetData.content.text}</p>
              <footer>
                <span>${days} days ago</span>
                <span>buttons</span>
              </footer>
            </article>`);
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}

//test code
$(document).ready(function() {
  renderTweets(data);
});