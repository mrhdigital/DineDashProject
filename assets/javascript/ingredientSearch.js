$(document).ready(function () {
  $('.diet-restrictions').material_select();
  $('.health-restrictions').material_select();
})

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

//setting click event to search button
$('.btn-search').on('click', function () {
  var queryURL = 'https://api.edamam.com/search?app_id=64622731&app_key=720fb1becfca77bf78494a9ce7272cc6';
  var ingredientInput = '';
  var dietInput = '';
  var healthInput = '';
  console.log();
  //checking if input field has input
  if ($('#ingredient-input').val()) {

    //getting info from input field and adding to database
    ingredientInput = $('#ingredient-input').val();
    dietInput = $('.diet-restrictions').find(':selected').text();
    healthInput = $('.health-restrictions').find(':selected').text();

    database.ref().set({
      ingredientTerms: ingredientInput,
      dietTerms: dietInput,
      healthTerms: healthInput
    })

  }

  //getting input from database and adding to query URL
  database.ref().on('value', function (snapshot) {
    queryURL += ('&q=' + snapshot.val().ingredientTerms);

    if(snapshot.val().dietTerms != 'Choose an option'){
    queryURL += ('&diet=' + snapshot.val().dietTerms.trim().toLowerCase());
    }
    if(snapshot.val().healthTerms != 'Choose an option'){
      queryURL += ('&health=' + snapshot.val().healthTerms.trim().toLowerCase());
      }
    
    console.log(snapshot.val().ingredientTerms)
  });
  console.log(queryURL)
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
$('.btn-clear').on('click', function () {
  $('.recipes').text('');
  var queryURL = 'https://api.edamam.com/search?app_id=64622731&app_key=720fb1becfca77bf78494a9ce7272cc6';
  var ingredientInput = '';
  var dietInput = '';
  var healthInput = '';

  $(".diet-restrictions:selected").removeAttr("selected");



  database.ref().set({
    ingredientTerms: ingredientInput,
    dietTerms: dietInput,
    healthTerms: healthInput
  })
})
