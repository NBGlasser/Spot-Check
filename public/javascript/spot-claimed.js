// grab the values from the browser local storage
var spotId = $("<h3>").addClass("text-spot-claimed").text("Spot " + localStorage.getItem("spotId"));
var spotLocation = $("<h4>").addClass("text-spot-claimed mb-2").text("Latitude " + localStorage.getItem("spotLat") + " - Longitude: " + localStorage.getItem("spotLong"));
$("#spot-info").append(spotId, spotLocation);


// event listener on the "not available" button
$("#not-available-btn").on("click", function () {
    // redirect to the home page
    location.replace("/home");
});


// event listener on the "leavong spot button" button
$("#leave-spot-btn").on("click", function () {
    // grab the info of the spot freed
    // which are in local storage
    var spotFreed = {
        spotId: localStorage.getItem("spotId"),
        occupied: false
    }

    $.ajax("/api/spot-freed", {
        type: "PUT",
        data: spotFreed
    }).then(function () {
        location.replace("/home");
    });
});