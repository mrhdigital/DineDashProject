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

var database = firebase.database();
var queryURL = 'https://api.edamam.com/search?app_id=64622731&app_key=720fb1becfca77bf78494a9ce7272cc6';

$('.btn-search').on('click', function(){

  if ($('#ingredient-input').val()) {
    var ingredientInput = $('#ingredient-input').val();
    queryURL += ('&q=' + ingredientInput.trim().replace(/ /g, "+"))

  }




var searchInput = 'chicken';
database.ref().set({
  searchTerms: searchInput
})
database.ref().on('value', function(snapshot){
  console.log(snapshot)
  searchTerm = snapshot.val().searchTerms;
});


$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function (response) {

  for (var i = 0; i < response.hits.length; i++) {
    var hits = response.hits[i].recipe
    var labels = $('<ul>');

    for (var j = 0; j < hits.healthLabels.length; j++) {
      labels.append('<li>' + hits.healthLabels[j] + '</li>');
    }

    var newRecipe = $('<li id="recipe-' + i + '">');
    newRecipe.append('<p>' + hits.label + '</p>').append('<p><a>' + hits.url + '</a></p>').append(labels).append('<img src=' + hits.image + '>');


    $('.recipes').append(newRecipe);

  }


})
})