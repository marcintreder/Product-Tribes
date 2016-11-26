$(document).ready(function() {

    //Smooth Scrolling. This function adds smooth-scrolling to all links. I'm using it to animate anchors attached to buttons. It's reusable.

    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 600, function() { //600 - number of miliseconds used in a scroll animation
                window.location.hash = hash;
            });
        }
    });

    //Simple tabs switcher. Not reusable - hard-coded IDs and Classes

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

    //Label shrinker. This function shrinks labels on focus.

    $("input[type=text]").focus(function(element) {
        var input = element.target.id; //gets id of a clicked input
        var label = $("label[for=" + input + "]"); //builds label that has to be shrinked
        label.removeClass('normal-label').addClass('small-label'); //adds class responsible for the small label


    });

    //Label enlarger. This function return empty labels to a normal size when a form field is empty.

    $("input[type=text]").blur(function(element) {
        var input = element.target.id;
        var label = $("label[for=" + input + "]");
        var inputValue = $("#" + input).val(); //saves label content in a variable

        if (inputValue == false) { //when input is empty val() inputValue returns undefined
            label.removeClass('small-label').addClass('normal-label'); //removes small-label class and ads normal labels class

        }
    });

    //ON BLUR FORM VALIDATION. Not reusable due to hard-coded ID names.
    $("input[type=text]").blur(function() {
        var inputId = "#" + $(this).attr("id");
        var inputValue = $(this).val();

        //Shows emtpy field error if there's not one already present (e.g. from on submit validation)
        if (inputValue.length == 0 && $(inputId).next(".error").length == 0) {
            $(inputId).addClass("error-input").after("<p class=\"error\">Please fill it in. We need this to proceed your application</p>");
        }

        //Validation of a field length. For security reasons nothing above 254 signs limits will pass the validation
        if (inputValue.length > 254 && $(inputId).next(".error").length == 0) {
            $(inputId).addClass("error-input").after("<p class=\"error\">Please enter the correct information and don't try to hack it.</p>");
        }
        if (inputValue.length > 254 && $(inputId).next(".error").length != 0) {
            $(inputId).addClass("error-input");
            $(inputId).next(".error").replaceWith("<p class=\"error\">Please enter the correct information and don't try to hack it.</p>");
        }

        //Name validation on blur.
        if (inputId == "#name" && inputValue.length > 0) {
            var namePattern = /^[a-zA-Z0-9_ ]+$/; //Regex allowing only alpha-numerical characters and spaces
            var nameChecked = namePattern.test(inputValue); //Test. Returns false if input value has any forbidden characters


            if (nameChecked == false && $(inputId).next(".error").length == 0) { // If input's value has some forbidden characters, but there's no previous error message, we're adding an error message
                $(inputId).addClass("error-input").after("<p class=\"error\">Please check if this is a correct information.</p>");
            } else if (nameChecked == false && $(inputId).next(".error").length != 0) { // If input's value has some forbidden characters and there is no previous error message, we're replacing it with a new error message
                $(inputId).addClass("error-input");
                $(inputId).next(".error").replaceWith("<p class=\"error\">Please check if this is a correct information.</p>");
            } else if (nameChecked == true) {
                $(inputId).removeClass("error-input"); // Whenever there's a correct info in the input, we're removing error input class and message
                $(inputId).next(".error").remove();
            }
        }

        //email validaiton
        if (inputId == "#email" && inputValue.length > 0) {
            var emailPattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            var emailChecked = emailPattern.test(inputValue);

            if (emailChecked == false && $(inputId).next(".error").length == 0) {
                $(inputId).addClass("error-input").after("<p class=\"error\">Please check if this is a correct e-mail address.</p>");
            } else if (emailChecked == false && $(inputId).next(".error").length != 0) { // If input's value has some forbidden characters and there is no previous error message, we're replacing it with a new error message
                $(inputId).addClass("error-input");
                $(inputId).next(".error").replaceWith("<p class=\"error\">Please check if this is a correct e-mail address.</p>");
            } else if (emailChecked == true) {
                $(inputId).removeClass("error-input"); // Whenever there's a correct info in the input, we're removing error input class and message
                $(inputId).next(".error").remove();
            }

        }

        //removes messages when there's a correct data in the "job" field
        if (inputId == "#job" && inputValue.length > 0) {
            $(inputId).removeClass("error-input");
            $(inputId).next(".error").remove();
        }

        //removes messages when there's a correct data in the "company" field
        if (inputId == "#company" && inputValue.length > 0) {
            $(inputId).removeClass("error-input");
            $(inputId).next(".error").remove();
        }

    });


    //GOOGLE SPREADSHEET SENDED SCRIPT.It's a modified script from: https://github.com/dwyl/web-form-to-google-sheet. I've added "on submit" validation.

    // variable to hold request
    var request;
    // bind to the submit event of our form


    $("#apply").submit(function(event) {

        //ON SUBMIT VALIDATION.

        // checks if any errors are already in the DOM and prevents adding another error message
        if ($(this).find(".error" == true)) {
            $(".error").each(function() {
                $(".error").prev().removeClass("error-input");
            })
            $(".error").remove(); //removes error message when an input has some content

        }

        //On submit validation. Checks if fields are not empty, e-mail address is correct, name doesn't have special signs and if any of the entries are longer than 254 charackters.

        for (i = 0; i < $(this).children("input[type=text]").length; i++) {
            var child = $(this).children("input[type=text]").eq(i);
            var childId = "#" + child.attr("id");

            //Empty elements get marked red and user receives information about an error
            if (child.val() == false) {
                $(childId).addClass("error-input").after("<p class=\"error\">Please fill it in. We need this to proceed your application</p>");
            }

            //For security reasons, anything longer than 254 signs is going to be blocked by the form
            if (child.val().length > 254) {
                $(childId).addClass("error-input").after("<p class=\"error\">Please enter the correct information and don't try to hack it.</p>");
            }

            //email validation with regexp
            if (childId == "#email" && child.val() != false) {
                var emailData = child.val();
                var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                var checked = pattern.test(emailData);

                if (checked == false) {
                    $(childId).addClass("error-input").after("<p class=\"error\">Please check if this is a correct e-mail address.</p>");
                }
            }

            if (childId == "#name" && child.val() != false) {
                var nameData = child.val();
                var pattern = /^[a-zA-Z0-9_ ]+$/;
                var checked = pattern.test(nameData);

                if (checked == false) {
                    $(childId).addClass("error-input").after("<p class=\"error\">Please check if this is a correct information.</p>");
                }
            }

            //at the end of the loop if there's at least one error, form gets blocked
            if (i == $(this).children("input[type=text]").length - 1 && $(this).find(".error-input").length > 0) {
                return false;
            }
        }

        //Original script starts here

        // abort any pending request
        if (request) {
            request.abort();
        }
        // setup some local variables
        var $form = $(this);
        // let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");
        // serialize the data in the form
        var serializedData = $form.serialize();
        // let's disable the inputs for the duration of the ajax request
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);
        $('#submit-button').empty().html('<div class=\"wait\"></div');
        // fire off the request to /form.php
        request = $.ajax({
            url: "https://script.google.com/macros/s/AKfycbxcgNmvsZhzCjLAHq8O2TPEhM3hnGz6rNSDNV9pPkMCqiyAAWsj/exec",
            type: "post",
            data: serializedData
        });
        // callback handler that will be called on success
        request.done(function(response, textStatus, jqXHR) {

            //Console logs for testing purposes
            /*console.log(response, textStatus, jqXHR);
            console.log("Hooray, it worked!");*/

            // success message
            $('.wait').remove();
            $('#submit-button').empty().removeClass('primary-button').addClass('success').html('Application received. Expect reply in 48 hours.');

            // form reset - called automatically after success message
            setTimeout(function() {
                $('#submit-button').empty().removeClass('success').addClass('primary-button').html('Apply now!').fadeIn(400);
                $($inputs).val('').blur().removeClass('error-input');
                $('.error').remove();
            }, 4000); //Delay (in ms) for the form reset

        });
        // callback handler that will be called on failure
        request.fail(function(jqXHR, textStatus, errorThrown) {
            // log the error to the console
            console.error(
                "The following error occured: " +
                textStatus, errorThrown
            );

          $('#submit-button').empty().removeClass('primary-button').addClass('total-error').html('Something went wrong. Try again later.');

        });
        // callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function() {
            // reenable the inputs
            $inputs.prop("disabled", false);
        });
        // prevent default posting of form
        event.preventDefault();
    });

    //GET EVENTS. I'm getting events from a JSON file stored on an external server

    var eventsJSON = "https://quarkbackend.com/getfile/marcintreder/vitualevents-json";

    $.getJSON(eventsJSON, function(data){
      eventBuilder();

 //Appends html with a <li> element for every event and subsequently with the name of the event <h3> and empty list of events. Appending starts from the last event in JSON added to the first <li> elements
      function eventBuilder() {
        var colorIndex = 0;
        //Array of border classes added to li elements;
        var borders = ['black-border', 'silver-border', 'orange-border', 'mineshaft-border', 'blue-border'];
        for (i = data.events.length -1; i >= 0; i--){
          var eventTitle = data.events[i].name;
          var x = Math.abs(i - (data.events.length-1));

          titleBuilder(eventTitle);

        function titleBuilder() {
          $('.events').append('<li class=\'event\'><h3 class=\'event-title\'>' + eventTitle +
          '</h3><ul class=\'webinars-list\'></ul>');

          if(colorIndex <= borders.length-1){
            var border = borders[colorIndex];
            $('.event').eq(x).addClass(border);
            colorIndex++;
          }

          else if(colorIndex > borders.length-1){
            colorIndex = 0;
            var border = borders[colorIndex];
            $('.event').eq(x).addClass(border);
            colorIndex++;
            }
          }
          console.log(colorIndex);

          webinarBuilder();


        function webinarBuilder() {
          for (z = 0; z < data.events[i].webinars.length; z++) {

            var y = Math.abs((z - data.events.length)+1);

            $('.webinars-list').eq(x).append('<li><em>' + data.events[i].webinars[z].title + '</em>'+ ' - ' + data.events[i].webinars[z].speaker + '</li>');
                  }
            $('.webinars-list').find('li').last().after('<a href=\''+ data.events[i].link + '\' target=\'_blank\'>' + data.events[i].linkLabel + '</a>');
                }
        }
      }

    });


});
