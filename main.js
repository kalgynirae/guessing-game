// Set up some JQuery variables
var $instructions = $('#instructions');
var $output = $('#output');
var $input = $('#input');
var $button = $('#button');
var $form = $('form');
var $guesses = $('#guesses');

// Grab settings from the query string
var params = {};
if (window.location.search) {
    var parameters = window.location.search.substring(1).split('&');
    for (var i=0; i < parameters.length; i++) {
        var s = parameters[i].split('=');
        if (s.length != 2)
            continue;
        params[s[0]] = s[1];
    }
}

// Determine whether to use settings from the query string
var plow = parseInt(params['low']);
var phigh = parseInt(params['high']);
var LOW = (!isNaN(plow) ? plow : 1);
var HIGH = (!isNaN(phigh) ? phigh : Math.ceil(Math.random() * 500));

// Post instructions and calculate an answer
$instructions.append(LOW + ' and ' + HIGH + '.');
var answer = Math.floor(Math.random() * (HIGH - LOW + 1)) + LOW;

// Focus the input box for ease of input
$input.focus();

// Use form submission so the user can use the enter key to guess
$form.submit(function(event) {
    // Don't actually let the form submit
    event.preventDefault();

    // Check the user's guess and post a response
    var response, responseClass;
    var guess = $input.val();
    if (guess > answer) {
        response = "It's lower than that...";
        responseClass = 'lower';
    }
    else if (guess < answer) {
        response = "It's higher than that...";
        responseClass = 'higher';
    }
    else if (guess == answer) {
        response = "You got it! Yay! You win!";
        responseClass = 'win';
    }

    // Add the guess to the list
    $guesses.append('<span class="guess ' + responseClass + '">' + guess + '</span> ');

    // Show the response
    $output.hide();
    $output.text(response);
    $output.attr('class', responseClass);
    $output.fadeIn();

    // Reset the input box
    $input.val('');
});
