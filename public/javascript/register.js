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
                    // console.log("this is the data response ")
                    window.location = currentUrl + "/home"

                }
            }
        );

    }
});