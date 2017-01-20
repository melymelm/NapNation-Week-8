
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