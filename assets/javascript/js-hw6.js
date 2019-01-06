$( document ).ready(function() {


    // Beginning array of rappers
    var rappers = ["Tupac", "Biggie", "Kanye West", "Nas", "Drake", "Eminem", "Nicki Minaj", "Kendrick Lamar", "Lil Wayne", "Jay-Z"];
   

    function displayGifButtons(){
        $("#gifButtonsView").empty(); 
        for (var i = 0; i < rappers.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("rapper");
            gifButton.addClass("btn")
            gifButton.attr("data-name", rappers[i]);
            gifButton.text(rappers[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new rapper button
    function addNewButton(){
        $("#addGif").on("click", function(){
        var rapper = $("#rapper-input").val().trim();

    // If nothing is entered and the button is clicked nothing will happen
        if (rapper == ""){
          return false; 
        }
        rappers.push(rapper);
    
        displayGifButtons();
        return false;
        });
    }
   

    // Function that displays all gifs
    function displayGifs(){
        var rapper = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + rapper + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })


        .done(function(response) {
            $("#gifsView").empty(); 
            var results = response.data; 
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                

                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
               
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Call functions to show gifs as well as add new button if needed
    displayGifButtons(); 
    addNewButton();

    // Listens for if you actually click on gif in order to animate
    $(document).on("click", ".rapper", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });