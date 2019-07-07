$('#submit').on('click', function() {
    var searchTerm = $('#searchTerm').val();
    var button = $('<button>').html(searchTerm).attr("data-animal", searchTerm);
    $('#buttonContainer').append(button);
    event.preventDefault();
})

$('#buttonContainer').on("click", 'button', function() {
    var animal = $(this).attr("data-animal");
    console.log("clicked " + animal);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
      // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.
      var results = response.data;
      for (var i=0; i < results.length; i++){
          var gifDiv = $('<div>');
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var gif = $("<img>");
          var url = results[i].images.fixed_height.url;
          var urlStill = results[i].images.fixed_height_still.url;
          gif.attr('src', urlStill);
          gif.attr('data-still', urlStill);
          gif.attr('data-animate', url);
          gif.attr('data-state', "still");
          gif.attr('class', "gif");

          gifDiv.prepend(gif);
          gifDiv.prepend(p);

          $("#gifHolder").prepend(gifDiv);
      }

      console.log(response);

    });

    $("#gifHolder").on("click", '.gif', function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state == "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
  });

