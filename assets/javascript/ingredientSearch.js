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

//creating reference for firebase and base Query URL
var database = firebase.database();
var queryURL = 'https://api.edamam.com/search?app_id=64622731&app_key=720fb1becfca77bf78494a9ce7272cc6';

//setting click event to search button
$('.btn-search').on('click', function () {

  //checking if input field has input
  if ($('#ingredient-input').val()) {

    //getting info from input field and adding to database
    var ingredientInput = $('#ingredient-input').val();
    database.ref().set({ingredientTerms: ingredientInput})

  }

  //getting input from database and adding to query URL
  database.ref().on('value', function (snapshot) {
    queryURL += ('&q=' + snapshot.val().ingredientTerms);
  });

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {

    //looping through recipes
    for (var i = 0; i < response.hits.length; i++) {
      //set reference for recipe
      var hits = response.hits[i].recipe

      //creating UL to attach ingredients to
      var labels = $('<ul>');

      // looping through ingredients on each recipe
      for (var j = 0; j < hits.healthLabels.length; j++) {
        labels.append('<li>' + hits.healthLabels[j] + '</li>');
      }

      //appending all list items onto the list
      var newRecipe = $('<li id="recipe-' + i + '">');
      newRecipe.append('<p>' + hits.label + '</p>').append('<p><a>' + hits.url + '</a></p>').append(labels).append('<img src=' + hits.image + '>');
      $('.recipes').append(newRecipe);

    }

  })
})