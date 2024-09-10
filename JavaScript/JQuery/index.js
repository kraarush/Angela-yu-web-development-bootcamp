$("h1").css("color", "red");

setTimeout( ()=>{
    $("p").addClass("new-class old-class");
    $("p").removeClass("new-class");

}, 100 );

setTimeout(() => {
    $("h1").addClass("old-class");
}, 100 );



// To manipulate text of our website
$("h1").text("Text is changed");
$("p").html("The new way of writing <b>innerHTML</b>");


// to get and set Attributes
$("a").attr("href","https://www.youtube.com");


// to add event listeners
$("h1").click(function(){
    $("h1").css("color","purple");
});


$("button").click(function(){       // selects all the button thus no need of loops
    $("p").text("Button is clicked");
});


// keypress
$(document).keypress(function(event) {
    $("h1").text(event.key);
});


// more flexible way of selecting all the existing events is
$("h1").on("mouseover", function(){
    $("h1").css("color","purple");
});


// adding elements and appending them
$("h1").before("<button>New btn</button>"); // adds new element before the selected element
$("h1").after("<button>New btn</button>");  // adds new element after the selected element
$("h1").prepend("<button>New btn</button>");  // adds new element in the start of the selected element's text
$("h1").append("<button>New btn</button>");  // adds new element in the end of the selected element's text


// Deleting elements
// $("button").remove();

$("button").on("click", function(){
    // $("h1").toggle();
    // $("h1").fadeOut();
    // $("h1").fadeIn();
    // $("h1").show();
    // $("h1").hide();
    $("h1").fadeToggle();

});