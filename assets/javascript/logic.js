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



// Initial Values
var trainName = '';
var destination = '';
var arrival = '';
var freq = '';








