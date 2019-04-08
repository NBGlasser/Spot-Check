var currentUrl = window.location.origin
var pos = {}

$(function() {
    // $("#login").on("click", function(event){
    //     event.preventDefault();

    //     var userInfo = {
    //         userName: $("#user-name").val(),
    //         password: $("#password").val()
    //     }
    // })

    // $.ajax("/api/USERS", {
    //     type: "POST",
    //     data: userInfo
    // }).then(
    //     function(data){
    //         if(data){
    //            window.location = currentUrl + "/home"
    //         }
    //     }
    // )

    $("#sumbit").on("click", function(event){
        navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
        })
        $.ajax("/api/spots", {
            type: "POST",
            data: pos
        }).then(
            window.location = currentUrl + "/home"
        )
    })

    $("#search").on("click", function(event){
        $.get("/api/spots", function(data){
            console.log(data)
        }).then(
            location.reload()
        )   
    })


})