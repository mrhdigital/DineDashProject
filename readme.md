Title: Ecco Nutrition

Members: Eric Baltutis, Gavin Peterson, Mirza Hameed

Project Description:

For this project, our team will be creating a web application for users who are interested in finding recipes based on food that they already have in the house. The ingredients will be inputted into a form and submitted. These ingredients will be sent to the firebase to be stored.

The ingredients will then be sent over to the recipes API. Using ajax, the API will send back recipes that include ingredients that were initially submitted by the user. The user can scroll through the different recipes. When clicked, a recipe will pop up with tabs that include nutrition, ingredients, directions, etc., which the user can click on and view. 

In the end, if the user determines that they are too lazy to make any food themselves, then they can type in their city and select their type of restaurant in an input form. The requests will be send to the restaurant API and return a list of the restaurants that match the search terms.

Using APIs:

1. src="https://developers.zomato.com/api#16bb34e9bd1f61b035c1c511af09909f"

2. var queryURL = 'https://api.edamam.com/search?app_id=64622731&app_key=720fb1becfca77bf78494a9ce7272cc6&q=' + searchInput;

Tasks:

Eric: Frontend working on html and css as well as materialize/css. Google maps API

Mirza: Restaurant API

Gavin: Recipe API/backend-firebase
