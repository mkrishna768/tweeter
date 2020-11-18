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
  let $tweet = $(`<article class="tweet">
              <header>
                <img src="${tweetData.user.avatars}">
                <section>
                  <span class="tweet-name">${tweetData.user.name}</span>
                  <span class="tweet-user">${tweetData.user.handle}</span>
                </section>
              </header>
              <p></p>
              <footer>
                <span>${days} days ago</span>
                <span>buttons</span>
              </footer>
            </article>`
  );
  //setting tweet text safely to prevent XSS
  $($tweet.children("p")[0]).text(tweetData.content.text);
  return $tweet;
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

$(document).ready(function() {
  const loadTweets = function() {
    $.get("/tweets", (data) => {
      renderTweets(data);
    });
  };

  loadTweets();

  $('#nav-new').click((event) => {
    $('#new-wrapper').slideToggle();
    $('#new-text').focus();
  });

  $('#new-form').submit(function(event) {
    event.preventDefault();
    if (!($("#new-text").val().length < 140)) {
      $("#new-error").text('⚠ Tweets cannot be longer than 140 characters ⚠');
      $("#new-error").slideDown();
    } else if (!$("#new-text").val().length > 0) {
      $("#new-error").text('⚠ Tweets cannot be empty ⚠');
      $("#new-error").slideDown();
      
    } else {
      $.post("/tweets/", $(this).serialize(), () => {
        $("#new-text").val('');
        $("#new-error").slideUp();
        $("#new-error").empty();
        $(".counter").text('140');
        $.get("/tweets", (data) => {
          $('#tweets-container').append(createTweetElement(data[data.length - 1]));
        });
      });
    }
  });
});