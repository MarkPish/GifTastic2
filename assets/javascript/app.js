//Set up array for new bird names
    // create function to 
    $(document).ready(function() {
        var birdArray = ["Eagle", "Owl"];
        console.log(birdArray)
        
        // Ajax call to giphy...set parameters to search, rating and limit=10
        // make div with ability to have still and animate images...using 'data-state', 'data-still' and 'data-animate'
        $(document).on("click", ".bird", function(event) {
            //event.preventDefault();
            console.log("here");    
            var x = $(this).attr('data-search');
            console.log(x);
    
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
            console.log(queryURL);
    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                    var results = response.data;
                    console.log(results);
                    for (var i = 0; i < results.length; i++) {
                        if (!results[i].rating == 'g' && !results[i].rating == 'pg')
                            continue;

                        var birdImage = $("<img>")
                                        .attr("src", results[i].images.fixed_height_still.url)
                                        .attr("src", results[i].images.fixed_height_still.url)
                                        .attr("data-state", "still")
                                        .attr("data-still", results[i].images.fixed_height_still.url)
                                        .attr("data-animate", results[i].images.fixed_height.url);

                                        
                        // Set up variables and images....still, animate
                        
                        var rating = results[i].rating;    
                        var p = $("<p>").text("Rating: " + rating);
                        //  birdImage.addClass("startStopGifs")
                        
                        $("#gifArea").append(birdImage).append(p);
                    }
            });
                        
                        
         }
        );  
    
    // click event takes input bird, trims and pushes to the array...creates new button
        $("#addBird").on("click", function(event) {
        event.preventDefault();
        var newBird = $("#birdInput").val().trim();
        birdArray.push(newBird);
        console.log(birdArray);
        $("#birdInput").val('');
        createButtons();
        });
    
    //  Create function to iterate through birdArray
    function createButtons() {
     $("#initialButtons").empty();
     for (var i = 0; i < birdArray.length; i++) {
       
         var newBtn = $('<button>')
                        .addClass('btn btn-default bird')
                        .attr('data-search', birdArray[i])
                        .text(birdArray[i])
         $("#initialButtons").append(newBtn);
    }
    }
    
        createButtons();    
    
      $(".gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    
    
    })    