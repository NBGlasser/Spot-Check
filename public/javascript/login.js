// grab the current url of the page
var currentUrl = window.location.origin;

// geolocate the user and store his/her position in a variable
var userLocation = {};
navigator.geolocation.getCurrentPosition(function (position) {

    userLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
    }
});

// event listener on the "login" form
$("#login-form").on("submit", function (event) {
    event.preventDefault();
    
    // localStorage.clear();

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
});