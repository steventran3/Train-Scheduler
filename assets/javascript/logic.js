//Initialize Firebase
var config = {
	apiKey: "AIzaSyBf63vOsiOcfJbUYOzGNNSO85ZGf9MyzJc",
	authDomain: "uci-bootcamp.firebaseapp.com",
	databaseURL: "https://uci-bootcamp.firebaseio.com",
	projectId: "uci-bootcamp",
	storageBucket: "uci-bootcamp.appspot.com",
	messagingSenderId: "290327709584"
};

firebase.initializeApp(config);

var database = firebase.database();

// ------------------------------------------------------

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
// When the code gets here, it creates a new data space on firebase


// When the client's connection state changes...
connectedRef.on("value", function(snap) {
  console.log('connectedRef.on("value") fired')

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {
  console.log('connectionsRef.on("value") fired')

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#connected-viewers").text(snap.numChildren());
});



$('#submit-btn').on('click', function(){

  event.preventDefault();

  trainName = $('#train-input').val().trim();
  destination = $('#dest-input').val().trim();
  time = $('#time-input').val().trim();
  freq = $('#freq-input').val().trim();

  var newTrain = {
    trainName: trainName,
    destination: destination,
    time: time,
    freq: freq,
  };

  database.ref().push(newTrain);

  alert("New train successfully added")

  // Clears all of the text boxes
  $('#train-input').val("")
  $('#dest-input').val("")
  $('#time-input').val("")
  $('#freq-input').val("")
  
});

// Pull data from the database
database.ref().on('child_added', function(childSnapshot, prevChildKey){

  console.log(childSnapshot.val());

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().time;
    var frequency = childSnapshot.val().freq;

    //First time for intial value
    var startTime = moment(firstTrain, 'hh:mm');
    console.log("initial time is: " + moment(startTime).format('hh:mm'));

    //current time to find out difference
    var currentTime = moment();
    console.log("current time is: " + moment(currentTime).format("hh:mm"));

    //difference between initial and current
    var difference = moment().diff(moment(startTime), "minutes");
    console.log("difference in initial time and current time: " + difference);

    //modular math to figure out time 
    var remainder = difference % frequency;
    console.log("the remainder is: " + remainder);

    //minutes away time calculation
    var minutesAway = frequency - remainder;
    console.log("minutes till train: " + minutesAway);

    //calculate the next train arrival time
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

    $('.table-body').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minutesAway + "</td></tr>");


  });






