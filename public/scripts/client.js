/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//creates tweet DOM object
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
                      <span class="tweet-buttons"><img src="/images/flag.png"> <img src="/images/retweet.png"> <img src="/images/heart.png"> </span>
                    </footer>
                  </article>`);

  //setting tweet text safely to prevent XSS
  $($tweet.children("p")[0]).text(tweetData.content.text);
  return $tweet;
};

//renders all given tweets
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

//loads tweets from database and renders them
const loadTweets = function() {
  $.get("/tweets", (data) => {
    renderTweets(data);
  });
};

$(document).ready(function() {
  loadTweets();

  //toggles new tweet form
  $('#nav-new').click((event) => {
    $('#new-wrapper').slideToggle();
    $('#new-text').focus();
  });

  //handling tweet submission
  $('#new-form').submit(function(event) {
    event.preventDefault();
    //tweet format error
    if (!($("#new-text").val().length < 140)) {
      $("#new-error").text('⚠ Tweets cannot be longer than 140 characters ⚠');
      $("#new-error").slideDown();
    } else if (!$("#new-text").val().length > 0) {
      $("#new-error").text('⚠ Tweets cannot be empty ⚠');
      $("#new-error").slideDown();
    //posting tweet
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