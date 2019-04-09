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


    var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -0, lng: 0},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }


      var script = document.createElement('script');
        script.src = currentUrl + '/api/spots';
        document.getElementsByTagName('head')[0].appendChild(script);
      

      // Loop through the results array and place a marker for each
      // set of coordinates.
      window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
            //===================== CHECK THE JSON WHEN WE MERGE=================//
          var coords = results.features[i].geometry.coordinates;
          var latLng = new google.maps.LatLng(coords[1],coords[0]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
          });
        }
      }
    
   

})
