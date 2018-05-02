//spinner global
var spinner = $('.loadSpinner');

$(document).ready(function () {

    var apiKey = '3d79c0c33955e5e3d00c6de1cec0d473';
    var citySearchURL = "https://developers.zomato.com/api/v2.1/cities";
    var cuisineSearchURL = "https://developers.zomato.com/api/v2.1/cuisines";
    var searchURL = "https://developers.zomato.com/api/v2.1/search";
    var apiData;
    var cuisine;
    var cuisineId;
    var city;
    var cityId;

    $(document).on("click", "#resetButton", function (event) {

        // event.preventDefault();
        $("#cuisine-input").empty();
        $("#city-input").empty();
        $(".resultsWrapper").empty();
        $("#city-input").val("");
        $("#cuisine-input").css("display", "none");

    });



    $(document).on("click", ".api-call", function (event) {

        event.preventDefault();

        // Add in loading spinner

        var opts = {
            lines: 13, // The number of lines to draw
            length: 38, // The length of each line
            width: 17, // The line thickness
            radius: 45, // The radius of the inner circle
            scale: 1, // Scales overall size of the spinner
            corners: 1, // Corner roundness (0..1)
            color: '#ffffff', // CSS color or array of colors
            fadeColor: 'transparent', // CSS color or array of colors
            opacity: 0.25, // Opacity of the lines
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            className: 'spinner', // The CSS class to assign to the spinner
            top: '50%', // Top position relative to parent
            left: '50%', // Left position relative to parent
            shadow: 'none', // Box-shadow for the lines
            position: 'absolute' // Element positioning
        };

        var target = $('.loadSpinner');
        var spinner = new Spinner().spin();
        target.append(spinner.el);

        $("#hits").empty();

        city = $("#city-input").val().trim().replace(/\s+/g, ''); // Remove ALL spaces

        console.log("[In api-call] cuisine: " + cuisine);

        $.ajax({
            type: "GET",
            headers: {
                'X-Zomato-API-Key': apiKey //only allowed non-standard header
            },
            url: citySearchURL,
            dataType: 'json',
            data: {
                q: city
            },
            processData: true, // Converts data to query string

            success: function (data) {

                $('.spinner').remove(); //remove appended spinner

                console.log("City apiData: ", data);

                var message = $("<span>");
                message.text("Select Your City:");
                $("#head").html(message);

                if (data.location_suggestions.length === 0) {

                    $("#hits").html("<p>Unable to locate specified city name. Please check your spelling and try again.</p>");
                    return;

                }
                else {

                    apiData = data;

                    console.log("[api-Call] option: ", $("#cuisine-input option:selected").val());

                    if ($("#cuisine-input option:selected").val() === "null") {

                        for (let i = 0; i < data.location_suggestions.length; i++) {

                            var button = $("<button>");
                            button.text(data.location_suggestions[i].name);
                            button.val(data.location_suggestions[i].name);
                            button.attr('id', i);
                            button.attr('class', 'buttons cities');
                            $("#hits").append(button);

                        }
                    }
                }
            }
        })
    });

    $(document).on("click", ".cities", function (event) {

        event.preventDefault();

        $("#head").empty();
        $("#hits").empty();

        $("#city-input").val($(this).val());
        console.log("City button 'this': ", $(this).val());

        $("#cuisine-input").css("display", "inline");

        var index = $(this).attr('id');
        cityId = apiData.location_suggestions[index].id;

        console.log("[In cities] index: " + index);
        console.log("[In cities] cityId: ", cityId);

        $.ajax({
            type: "GET",
            headers: {
                'X-Zomato-API-Key': apiKey //only allowed non-standard header
            },
            url: cuisineSearchURL,
            dataType: 'json',
            data: {
                city_id: cityId
            },
            processData: true, // Converts data to query string
            success: function (data) {

                console.log("Cuisine apiData: ", data);

                if (data.cuisines.length === 0) {

                    $("#hits").html("<p>Unable to locate restaurants serving " + cuisine + ". Please check your spelling and try again, or try a different cuisine and/or city.</p>");
                    return;

                }
                else {

                    for (let i = 0; i < data.cuisines.length; i++) {

                        var option = $("<option>");
                        option.val(data.cuisines[i].cuisine.cuisine_name);
                        option.text(data.cuisines[i].cuisine.cuisine_name);
                        option.attr("data-cuisineId", data.cuisines[i].cuisine.cuisine_id);
                        $("#cuisine-input").append(option);

                    }

                }
            }
        });
    });

    $("#cuisine-input").on("change", function (event) {

        event.preventDefault();
        
        var opts = {
            lines: 13, // The number of lines to draw
            length: 38, // The length of each line
            width: 17, // The line thickness
            radius: 45, // The radius of the inner circle
            scale: 1, // Scales overall size of the spinner
            corners: 1, // Corner roundness (0..1)
            color: '#ffffff', // CSS color or array of colors
            fadeColor: 'transparent', // CSS color or array of colors
            opacity: 0.25, // Opacity of the lines
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwise
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            className: 'spinner', // The CSS class to assign to the spinner
            top: '50%', // Top position relative to parent
            left: '50%', // Left position relative to parent
            shadow: 'none', // Box-shadow for the lines
            position: 'absolute' // Element positioning
        };

        var target = $('.loadSpinner');
        var spinner = new Spinner().spin();
        target.append(spinner.el);
        
        cuisine = $("#cuisine-input option:selected").val();
        city = $("#city-input").val();

        var message = $("<span>");
        message.text(cuisine + " Restaurants in " + city);
        $("#head").html(message);

        cuisineId = $("#cuisine-input option:selected").attr("data-cuisineId");
        console.log("[In Select handler] cuisineId: ", cuisineId);

        $.ajax({
            type: "GET",
            headers: {
                'X-Zomato-API-Key': apiKey //only allowed non-standard header
            },
            url: searchURL,
            dataType: 'json',
            data: {
                cuisines: cuisineId,
                entity_id: cityId,
                entity_type: 'city'
            },
            processData: true, // Converts data to query string
            success: function (data) {

                $('.spinner').remove(); //remove appended spinner

                console.log("Search apiData: ", data);

                $("#hits").empty();

                if (data.restaurants.length === 0) {
                    $("#hits").html("<p>Unable to locate restaurants serving " + cuisine + ". Please check your spelling and try again, or try a different cuisine and/or city.</p>");
                    return;
                }
                else if ($("#cuisine-input option:selected").val() === "null") {
                    return;
                }
                else {

                    // Display Restaurant Data
                    // Venue Info: Name, City, Address, <hr>, cuisines, cost, zomato url

                    for (let i = 0; i < data.restaurants.length; i++) {

                        
                        var priceRange = data.restaurants[i].restaurant.price_range;
                        var span = $("<span>");
                       // var p = $("<p>");
                        for (var cost = 0; cost < priceRange; cost++) {
                                 span.append("$");
                             }
                        // p.append("Cost: ", span);
                        var mainDiv = $("<div>");
                         mainDiv.append(`
                         <div class="venues">
                             <div class="venueName">${data.restaurants[i].restaurant.name}</div>
                             <div class="venueCity">${data.restaurants[i].restaurant.location.city}</div>
                             <div>
                                 ${data.restaurants[i].restaurant.location.address}
                                 <hr>
                                 <p>
                                     Cuisines: ${data.restaurants[i].restaurant.cuisines}
                                     
                                     <br>Cost: ${span.html()}
                                     
                                     <br>
                                     <a id="Rlink" href="${data.restaurants[i].restaurant.url}" target ="_ blank">Visit Zomato Restaurant Page</a>
                                 </p>
                             </div>
                         </div>
                         `) 

                        $("#hits").append(mainDiv);

                    }


                }
            }
        });
    });
});
