  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC9y55fnvNPqajMd9zcWttEMcvM86rjnuE",
    authDomain: "nutrition-project-b321a.firebaseapp.com",
    databaseURL: "https://nutrition-project-b321a.firebaseio.com",
    projectId: "nutrition-project-b321a",
    storageBucket: "nutrition-project-b321a.appspot.com",
    messagingSenderId: "986829728187"
  };
  firebase.initializeApp(config);

database = firebase.database();

var searchInput;

var queryURL = 'https://api.edamam.com/search?app_id=64622731&app_key=720fb1becfca77bf78494a9ce7272cc6&q=bagel'// + searchInput;

$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function(response){
  console.log(response)

})