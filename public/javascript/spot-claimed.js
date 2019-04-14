// grab the values from the browser local storage
if (localStorage.getItem("spotId") === null && localStorage.getItem("spotLat") === null && localStorage.getItem("spotLong") === null) {
    $("#spot-info").append("<h3 class='text-spot-claimed'>You haven't claimed a spot yet!</h3>");
    $("#not-available-btn").hide();
    $("#leave-spot-btn").hide();
} else {
    $("#not-available-btn").show();
    $("#leave-spot-btn").show();
    var spotId = $("<h3>").addClass("text-spot-claimed").text("Spot " + localStorage.getItem("spotId"));
    var spotLocation = $("<h4>").addClass("text-spot-claimed mb-2").text("Latitude " + localStorage.getItem("spotLat") + " - Longitude: " + localStorage.getItem("spotLong"));
    $("#spot-info").append(spotId, spotLocation);
}


// event listener on the "not available" button
$("#not-available-btn").on("click", function () {
    // swith to false the "spotAlreadyClaimed" item stored in localStorage
    localStorage.setItem("spotAlreadyClaimed", "false");
    // redirect to the home page
    location.replace("/home");
});


// event listener on the "leavong spot button" button
$("#leave-spot-btn").on("click", function () {
    // swith to false the "spotAlreadyClaimed" item stored in localStorage
    localStorage.setItem("spotAlreadyClaimed", "false");
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