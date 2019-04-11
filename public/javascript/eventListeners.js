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
                console.log(data)

                for (var i = 0; i < data.length; i++) {
                    //===================== CHECK THE JSON WHEN WE MERGE=================//
                    var latLng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map
                    });
                }
            })

        })
    }

    nearMe()

    // navigator.geolocation.getCurrentPosition(function (position) {

    //     userLocation = {
    //         lat: position.coords.latitude,
    //         long: position.coords.longitude
    //     }


    // ------------------- Sophie ----------------------

    // event listener on the "register" form
    $("#register-form").on("submit", function (event) {
        event.preventDefault();
        // nearMe()
        console.log(userLocation);
        // grab the two password inputs
        var pwd = $("#password").val().trim();
        var pwdConfirm = $("#password-confirm").val().trim();

        // compare the two password inputs
        if (pwd !== pwdConfirm) {
            $("#pwd-warning").attr("style", "display:block");
        } else {

            var newUserInfo = {
                phoneNum: $("#phone-number").val().trim(),
                password: pwd,
                timeStamp: moment().format(),
                lat: userLocation.lat,
                long: userLocation.long

            }

            // post request to create a new user data point into the "users" table
            $.ajax("/api/new-user", {
                type: "POST",
                data: newUserInfo
            }).then(
                function (data) {
                    if (data) {
                        // location.replace("/login");
                        console.log("this is the data response ")
                        window.location = currentUrl + "/home"
                        
                    }
                }
            );

        }
    });

    // -------------------------------------------------



    $("#login-form").on("submit", function (event) {
        event.preventDefault();
        nearMe()

        var userInfo = {
            phoneNum: $("#phone-number").val(),
            password: $("#password").val(),
            timeStamp: moment().format(),
            lat: userLocation.lat,
            long: userLocation.long
        }

        $.ajax("/api/history", {
            type: "POST",
            data: userInfo
        })
        


        //             $.ajax("/api/users", {
        //                 type: "POST",
        //                 data: userInfo
        //             }).then(
        //                 function (data) {
        //                     if (data) {
        //                         window.location = currentUrl + "/home"
        //                     }
        //                 }
        //             )
        //         })
    })

    $("#search-destination").on("submit", function (event) {
        // prevent the page to refresh
        event.preventDefault();

        // grab the values
        var street = $("#street").val().trim();
        var city = $("#city").val().trim();
        var state = $("#state").val().trim();

        //  query for ajax
        var queryURL = "/maps.googleapis.com/maps/api/geocode/json?address=" + street + "," + city + "," + state + "&key=AIzaSyBLbZS2RmuzjLUIzfK3zrTLbKybGkcaD-E"

        var lat1;
        var lat2;
        var long1;
        var long2;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var newLoc = {
                lat: response.results.geometry.location.lat,
                lng: response.results.geometry.location.lng
            }

            lat1 = response.results.geometry.location.lat + .05
            lat2 = response.results.geometry.location.lat - .05
            long1 = response.results.geometry.location.lng + .05
            long2 = response.results.geometry.location.lng - .05

            $.get("/api/spots/" + lat1 + "/" + lat2 + "/" + long1 + "/" + long2, function (data) {
                console.log(data)

                for (var i = 0; i < data.length; i++) {
                    var latLng = new google.maps.LatLng(data[i].latitude, data[i].longitude);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map
                    });
                }
                map.setCenter(newLoc)
            })

        })



    })


    $("#submit").on("click", function (event) {

        navigator.geolocation.getCurrentPosition(function (position) {

            userLocation = {
                lat: position.coords.latitude,
                long: position.coords.longitude
            }


            //                 $.ajax("/api/spots", {
            //                     type: "POST",
            //                     data: userInfo
            //                 }).then(
            //                     window.location = currentUrl + "/home"
            //                 )

            $.ajax("/api/spots", {
                type: "POST",
                data: userLocation
            }).then(
                window.location = currentUrl + "/home"
            )
        });
    });




    // display the "search-destination" bar for "At Destination" option
    $("#destination").on("click", function () {
        $("#search-destination").attr("style", "display:block");
    });


    // hide the "search-destination" bar for "near you" option
    $("#near-you").on("click", function () {
        $("#search-destination").attr("style", "display:none");
    });
    // });
});
