$('#submit').on('click', function() {
    var searchTerm = $('#searchTerm').val();
    var button = $('<button>').html(searchTerm);
    $('#buttonContainer').append(button);
    event.preventDefault();
})

$("button").on("click", function() {
    var animal = $(this).attr("data-animal");
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
          gif.attr('src', results[i].images.fixed_height.url);

          gifDiv.prepend(gif);
          gifDiv.prepend(p);

          $("#gifs-appear-here").prepend(gifDiv);
      }

      console.log(response);

    });
  });

