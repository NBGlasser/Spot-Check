// load the page before running anything else
$(document).ready(function () {

    var currentUrl = window.location.origin;
    var userLocation = {};

    function nearMe() {

        navigator.geolocation.getCurrentPosition(function (position) {

            userLocation = {
                lat: position.coords.latitude,
                long: position.coords.longitude
            }

            var lat1;
            var lat2;
            var long1;
            var long2;

            lat1 = userLocation.lat + .05
            lat2 = userLocation.lat - .05
            long1 = userLocation.long + .05
            long2 = userLocation.long - .05

            $.get("/api/spots/" + lat1 + "/" + lat2 + "/" + long1 + "/" + long2, function (data) {

                for (var i = 0; i < data.length; i++) {
                    // list the info and display the markers only for the spots available
                    if (data[i].occupied === false) {
                        var list = $("<li>").addClass("mt-4 spot-available ml-4 font-weight-bold").text("Spot " + data[i].id);
                        var paragraph = $("<p>").addClass("mb-1 ml-4 spot-available").text("Latitude: " + data[i].latitude + " - Longitude: " + data[i].longitude);
                        var button = $("<button>").attr("data-id", data[i].id).attr("data-lat", data[i].latitude).attr("data-long", data[i].longitude).addClass("btn btn-lg bg-success ml-4 claim-btn").text("Claim");
                        // display the markers on the map
                        var latLng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
                        var marker = new google.maps.Marker({
                            position: latLng,
                            title: "Spot " + data[i].id,
                            map: map
                        });
                    }
                    
                    $("#spot-data").append(list, paragraph, button);
                    
                }
            });

        });
    }

    nearMe();

    // $("#search-destination").on("submit", function (event) {
    //     // prevent the page to refresh
    //     event.preventDefault();

    //     // grab the values
    //     var street = $("#street").val().trim();
    //     var city = $("#city").val().trim();
    //     var state = $("#state").val().trim();

    //     //  query for ajax
    //     var queryURL = "/maps.googleapis.com/maps/api/geocode/json?address=" + street + "," + city + "," + state + "&key=AIzaSyBLbZS2RmuzjLUIzfK3zrTLbKybGkcaD-E"

    //     var lat1;
    //     var lat2;
    //     var long1;
    //     var long2;

    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function (response) {

    //         var newLoc = {
    //             lat: response.results.geometry.location.lat,
    //             lng: response.results.geometry.location.lng
    //         }

    //         lat1 = response.results.geometry.location.lat + .05
    //         lat2 = response.results.geometry.location.lat - .05
    //         long1 = response.results.geometry.location.lng + .05
    //         long2 = response.results.geometry.location.lng - .05

    //         $.get("/api/spots/" + lat1 + "/" + lat2 + "/" + long1 + "/" + long2, function (data) {
    //             console.log(data)

    //             for (var i = 0; i < data.length; i++) {
    //                 var latLng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
    //                 var marker = new google.maps.Marker({
    //                     position: latLng,
    //                     map: map
    //                 });
    //             }
    //             map.setCenter(newLoc)
    //         })
    //     })
    // })
    
    // event listener on the "enter a spot" button
    $("#enter-spot").on("click", function (event) {

        navigator.geolocation.getCurrentPosition(function (position) {

            userLocation = {
                lat: position.coords.latitude,
                long: position.coords.longitude
            }

            console.log("This is position " + position.coords.latitude)


            console.log("this is userlocation " + userLocation)
            
                $.ajax("/api/3p/spots", {
                    type: "POST",
                    data: userLocation
                // ======================= Sophie =====================
                }).then(function() {
                    // display the modal
                    $("#modal-spot-entered").modal("toggle");
                    // event listener on the close button of the modal
                    // to reload the page once the modal is closed and
                    // display the marker on the map as well as list the spot in the "results" card
                    $(".close-modal").on("click", function() {
                        window.location = currentUrl + "/home";
                    });
                });
                // =====================================================
            
        });
    });


    // display the "search-destination" bar and hide the "spot" card for "At Destination" option
    $("#destination").on("click", function () {
        $("#search-destination").attr("style", "display:block");
    });


    // hide the "search-destination" bar and the "spot" card for "near you" option
    $("#near-you").on("click", function () {
        $("#search-destination").attr("style", "display:none");
    });

    // event listener on the "claim" buttons
    $(document).on("click", ".claim-btn", function() {
        // if the user has already claimed a spot
        if (localStorage.getItem("spotAlreadyClaimed") === "true") {
            // display a modal saying to free the former spot before claiming another one
            $("#modal-spot-claimed-already").modal("toggle");
        } else {
            // swith to true the "spotAlreadyClaimed" item stored in localStorage
            localStorage.setItem("spotAlreadyClaimed", "true");
            // grab the info of the spot corresponding
            // to the button that has been clicked
            var spotId = $(this).data("id");
            var spotLat = $(this).data("lat");
            var spotLong= $(this).data("long");

            // clear the local storage from previous data
            // store those new info in
            // localStorage.clear();
            localStorage.setItem("spotId", spotId);
            localStorage.setItem("spotLat", spotLat);
            localStorage.setItem("spotLong", spotLong);

            // change the status of the spot
            var newState = true;

            // store this new status in an object
            var spotNewState = {
                occupied: newState,
            }
        
            // post request to update the status of the spot
            $.ajax("/api/spots/" + spotId, {
                type: "PUT",
                data: spotNewState
            }).then(function() {
                // redirect the user to the spot claimed page
                location.replace("/spot-claimed");

            });
        }
    });


});
