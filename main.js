

$(document).ready(function(){

//This function adds smooth-scrolling to all links. I'm using it to animate anchors attached to buttons.

  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 600, function(){ //600 - number of miliseconds used in a scroll animation
        window.location.hash = hash;
      });
    }
  });

//Simple tabs switcher. Not reusable.

  $('#virtual-events').on('click', function() {
    $('.description-container').addClass('inactive');
    $('.events-container').removeClass('inactive');
    $('#virtual-events').addClass('underline');
    $('#about').removeClass('underline');
  });

  $('#about').on('click', function() {
    $('.description-container').removeClass('inactive');
    $('.events-container').addClass('inactive');
    $('#virtual-events').removeClass('underline');
    $('#about').addClass('underline');
  });

//Focus on form fields shrinks label

$("input[type=text]").focus(function(element){
  var input = element.target.id;
  var label = $("label[for=" + input + "]");
  label.removeClass('normal-label').addClass('small-label');


  });

$("input[type=text]").blur(function(element){
    var input = element.target.id;
    var label = $("label[for=" + input + "]");
    var inputValue = $("#" + input).val();

    if (inputValue == false) {
      label.removeClass('small-label').addClass('normal-label');

    }
    });

});
