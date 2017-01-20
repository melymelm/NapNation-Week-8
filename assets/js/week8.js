
// $( document ).ready(function() {
//     console.log( "ready!" );
// });

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

