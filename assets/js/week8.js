

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

})
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


//calling in the spotify api

// Adding click event listen listener to all buttons
    // $("button").on("click", function() {
      // Grabbing and storing the data-animal property value from the button
      // var animal = $(this).data("animal");

      // Constructing a queryURL using the animal name
      var queryURL = "https://api.spotify.com/v1/users/melymelm/playlists/SleepyTime";

      //classical music playlist
      //playlist name = Classical Music For Sleep
      //user name = nosleeplessethan

      //ambient music
      //playlist name = Chill-out & Ambient Music
      //user name = nosleeplessethan

      //world music
      //playlist name = World Music For Sleep
      //user name = nosleeplessethan


      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
    //     // After data comes back from the request
    //     .done(function(response) {
    //       console.log(queryURL);

    //       console.log(response);
    //       // storing the data from the AJAX request in the results variable
    //       var results = response.data;

    //       // Looping through each result item
    //       for (var i = 0; i < results.length; i++) {

    //         // Creating and storing a div tag
    //         var animalDiv = $("<div>");

    //         // Creating a paragraph tag with the result item's rating
    //         var p = $("<p>").text("Rating: " + results[i].rating);

    //         // Creating and storing an image tag
    //         var animalImage = $("<img>");
    //         // Setting the src attribute of the image to a property pulled off the result item
    //         animalImage.attr("src", results[i].images.fixed_height.url);

    //         // Appending the paragraph and image tag to the animalDiv
    //         animalDiv.append(p);
    //         animalDiv.append(animalImage);

    //         // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
    //         $("#gifs-appear-here").prepend(animalDiv);
    //       }
    //     });
    // });



