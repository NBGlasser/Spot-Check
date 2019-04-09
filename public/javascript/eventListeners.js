// load the page before running anything else
$(document).ready(function() {

    // event listener on the "submit" button on the login page
    $("#login-form").on("submit", function(event) {
        // prevent the page to refresh
        event.preventDefault();

        // grab the user phone number and store it in a variable
        var phoneNumber = $("#phone-number").val().trim();
        
        // post request to enter the data into the database
        $.post("/api/users", phoneNumber, function() {
            // very short-live confirmation message in the browser's console
            console.log("created new user");
            // display the home page with map and spots
            location.replace("/home");
        });

    });

    // hide the "search-destination" bar for "near you" option
    $("#near-you").on("click", function() {
        $("#search-destination").attr("style", "display:none");
    });

    // display the "search-destination" bar for "At Destination" option
    $("#destination").on("click", function() {
        $("#search-destination").attr("style", "display:block");
    })



    
});