// load the page before running anything else
$(document).ready(function() {

    // search form not displayed by default
    var displayForm = false;
    
    // if the user clicks on "At Destination", the search form appears 
    $("#near-you").on("click", function() {
        displayForm = false;
    });

    // if the user clicks on "Near You", the search form disappears 
    $("#destination").on("click", function() {
        displayForm = true;
    });
});