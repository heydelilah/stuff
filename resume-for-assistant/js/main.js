$(function () {  
  /* 
  * Disabled icons + lines 
  * Highlight the matching icon + line based on data attributes
  * Edit middle text
  */
  $('.icons .icon').hover(function () {
    var className = $(this).data('class'), 
        title = $(this).data('title');

    $('.spider .middle h2').text(title);

    $('.icons .icon, .lines .line').removeClass('active').addClass('disabled');
    $('.lines').find("[data-class='" + className + "']").addClass('active');
    $(this).addClass('active');

  }, function () {
    $('.icons .icon, .lines .line').removeClass('active disabled');
    $(this).removeClass('active');

    $('.spider .middle h2').html('<span><span class="book-text"> 书</span>&<span class="movie-text">影</span></span>');

  });

})

$(document).ready(function() {
    $('.pgwSlideshow').pgwSlideshow();
});