// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBdt5lhNaTHcvEbf4BmBAqWDvPNBf8gdz4",
    authDomain: "napnation-week-8.firebaseapp.com",
    databaseURL: "https://napnation-week-8.firebaseio.com",
    storageBucket: "napnation-week-8.appspot.com",
    messagingSenderId: "749153404995"
  };
  firebase.initializeApp(config);

//set vars

var dataRef = firebase.database();

var name = "";
var address = "";
var email = "";
var rating = "";
var comments = "";
var spotUser = "";
var spotPlayList = "";


$(document).ready(function(){
	$("#addNap").on("click", function(e){
		e.preventDefault();
		console.log("button clicked");

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
			rating: rating,
			comments: comments
		});

		console.log("------from click function-------");
		console.log(name);
		console.log(address);
		console.log(email);
		console.log(rating);
		console.log(comments);
		console.log("------------------");

		//clear data
		$("#inputName").val("");
		$("#inputAddress").val("");
		$("#inputEmail").val("");
		$("#inputRating").val("");
		$("#inputComment").val("");


		return false;
	});

});
//capture submit button click

//firebase: initial loader, adding child, appending to table

dataRef.ref().on("child_added", function(childSnapshot) {
	//console everything
	console.log("-------child Snapshot--------")
	console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().address);
	console.log(childSnapshot.val().email);
	console.log(childSnapshot.val().rating);
	console.log(childSnapshot.val().comments);
	console.log("------------------");

	//adding items to the html
	var addPlace = $("#places");

	var placeData = "<tr>";
	    placeData += "<td>" + childSnapshot.val().name + "</td>";
	    placeData += "<td>" + childSnapshot.val().address + "</td>";
	    placeData += "<td>" + childSnapshot.val().rating + "</td>";
	    placeData += "<td>" + childSnapshot.val().comments + "</td>"
	    placeData += "</tr>";

	$(addPlace).append(placeData);
});

// --------------------------------------------------------------------------------
//calling in the spotify api

// Tripp Spotify

    $(document).ready(function(){
    function getArtistTrack(artist) {

       // Running an initial search to identify the artist's unique Spotify id
       var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";
       $.ajax({
         url: queryURL,
         method: "GET"
       }).done(function(response) {

         // Printing the entire object to console
         console.log(response);

         // Printing the artist id from the Spotify object to console
         var artistID = response.artists.items[0].id;

         // Building a SECOND URL to query another Spotify endpoint (this one for the tracks)
         var queryURLTracks = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US";

         // Running a second AJAX call to get the tracks associated with that Spotify id
         $.ajax({
           url: queryURLTracks,
           method: "GET"
         }).done(function(trackResponse) {

           // Logging the tracks
           console.log(trackResponse);

         
           // (NOTE YOU NEED TO BE LOGGED INTO SPOTIFY)or have a spotify webpage open in background for 30sec song
         

           var player = "<iframe src='https://embed.spotify.com/?uri=spotify:track:" +
             trackResponse.tracks[0].id +
             "' frameborder='0' allowtransparency='true'></iframe>";

           // Appending the new player into the HTML
           $("#player-div").append(player);
         });
       });
     }

     // Event handler for user clicking the select-artist button
     $("#select-artist").on("click", function(e) {
       // Preventing the button from trying to submit the form
       e.preventDefault();
       // Storing the artist name
       var artist = $("#artist-input").val().trim();

       // Running the getArtistTrack (passing in the artist as an argument)
       getArtistTrack(artist);
       return false;

     });

  }); //end of document ready for music





//---------------------------------------------------------------------------------
//melissa spotify

// $("#addPlayList").on("click", function(e) {

//   e.preventDefault();

//   console.log("add play clicked");

//       spotUser = "nosleeplessethan";

//       //logic based on what they've chosen with radio buttons
//       if ($("input:radio[value=option1]")[0].checked = true) {
//           spotPlayList = "Classical Music For Sleep";
//           console.log("spotify playlist: " +spotPlayList);
//         }

//       if ($("input:radio[value=option2]")[1].checked = true) {
//           spotPlayList = "Chill-out & Ambient Music";
//           console.log("spotify playlist: " + spotPlayList);
//         }

//       if ($("input:radio[value=option3]")[2].checked = true) {
//           spotPlayList = "World Music For Sleep";
//           console.log("spotify playlist: " + spotPlayList);
//         }

//       console.log("Shows playlist to show: " + spotPlayList);
       

//       // Constructing a queryURL 
//       var queryURL = "https://api.spotify.com/v1/users/" + spotUser + "/playlists/" + spotPlayList;

      

//       var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";
//         $.ajax({
//           url: queryURL,
//           method: "GET"
//         }).done(function(response) {

//           // Printing the entire object to console
//           console.log(response);

//           var player = "<iframe src='https://embed.spotify.com/?uri=spotify:track:" +
//           trackResponse.tracks[0].id +
//           "' frameborder='0' allowtransparency='true'></iframe>";

//           // Appending the new player into the HTML
//         $("#player-div").append(player);

//         });

//      }); //end of click funtion for music



// --------------------------------------------------------------------------------
//calling in the google map


// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

$(document).ready(function(){

function initAutocomplete() {

   console.log("Inside the map function!");
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
    });