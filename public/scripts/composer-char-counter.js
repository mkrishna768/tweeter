console.log("char counter loaded");
$(document).ready(function() {
  console.log("Document ready");
  $("#tweet-text").on("input", function(event) {
    const counter = this.nextElementSibling.lastElementChild;
    counter.innerHTML = 140 - $(this).val().length;
    if (counter.innerHTML >= 0) {
      $(counter).css("color", "#545149");
    } else {
      $(counter).css("color", "red");
    }
  });
});