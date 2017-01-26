  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0xcgAA7o8mIc6KPmz6ztdUqdhPGzXuns",
    authDomain: "maps-api-cc7d2.firebaseapp.com",
    databaseURL: "https://maps-api-cc7d2.firebaseio.com",
    storageBucket: "maps-api-cc7d2.appspot.com",
    messagingSenderId: "276667608972"
  };

  firebase.initializeApp(config);


  //set vars

var dataRef = firebase.database();

var name = "";
var address = "";
var email = "";
var rating = "";
var comments = "";
var trainData = "";

//capture submit button click
$("#addNap").on("click", function(){

  name = $("#inputName").val().trim();
  address = $("#inputAddress").val().trim();
  email = $("#inputEmail").val().trim();
  rating = $("#inputRating").val();
  comments = $("#inputComment").val().trim();

  //code for the push to database
  dataRef.ref().push({
    name: name,
    address: address,
    email: email,
    rating: rating
  });

  return false;
});

//firebase: initial loader, adding child

dataRef.ref().on("child_added", function(childSnapshot) {
  //loggive everything
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().address);
  console.log(childSnapshot.val().email);
  console.log(childSnapshot.val().rating);

  //adding items to the html
  var addPlace = $("#places");

  var placeData = "<tr>";
      trainData += "<td>" + childSnapshot.val().name + "</td>";
      trainData += "<td>" + childSnapshot.val().address + "</td>";
      trainData += "<td>" + childSnapshot.val().email + "</td>";
      trainData += "<td>" + childSnapshot.val().rating + "</td>"
      trainData += "</tr>";

  addPlace.append(placeData);




  $("#places").append("<div class")
});






// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.8999416, lng: -79.0147377},
    zoom: 14,
    mapTypeId: 'roadmap'
  });
  

  var markers = napLocations;

  

  // set variables for markers
  var napLocations = [
        {
          position: {lat: 35.8999429, lng: -79.014743}, 
              
              label: 'Friday Center'
        },
        {
           position: {lat: 35.9134642, lng: -79.0573057}, 
          
          label: 'UNC Student Union'
        },

        {
          position: {lat: 35.9107755, lng: -79.0527463},

            label: 'Polk Place'
        },

        {
          position: {lat: 35.9321256, lng: -79.0379809},

            label: 'Chapel Hill Public Library'
        },

        {
          position: {lat: 35.9134695, lng: -79.050745},

            label: 'Coker Arboretum'
        },
      ];

  for (var i = 0; i < napLocations.length; i++) {
      var marker = new google.maps.Marker (napLocations[i]);
      marker.setMap(map);
    }


  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(100, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      napLocations.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  // [END region_getplaces]
}

var infoWindow = new google.maps.InfoWindow({map: map});
// Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }

    
    


