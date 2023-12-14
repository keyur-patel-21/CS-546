/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page.
*/

$(document).ready(function () {
  // Page load
  $.ajax({
      url: "http://api.tvmaze.com/shows",
      method: "GET",
      success: function (data) {
          // Populate tvShowList on page load
          populateShowList(data);
      },
      error: function (error) {
          console.log("Error fetching show list: ", error);
      }
  });

  // Search Form Submission
  $("#searchShows").submit(function (event) {
      event.preventDefault();
      let searchTerm = $("#show_search_term").val().trim();
      if (searchTerm === "") {
          alert("Please enter a search term");
          return;
      }

      // Clear previous search results
      $("#tvShowList").empty();

      // Query the API for the search term
      $.ajax({
          url: "http://api.tvmaze.com/search/shows?q=" + searchTerm,
          method: "GET",
          success: function (data) {
              // Populate tvShowList with search results
              populateShowList(data);
              $("#rootLink").show();
          },
          error: function (error) {
              console.log("Error fetching search results: ", error);
          }
      });
  });

  // Link Clicked
  $("#tvShowList").on("click", "a", function (event) {
      event.preventDefault();
      let showUrl = $(this).attr("href");

      // Hide tvShowList
      $("#tvShowList").hide();

      // Clear previous showDetails
      $("#showDetails").empty();

      // Fetch data for the selected show
      $.ajax({
          url: showUrl,
          method: "GET",
          success: function (showData) {
              // Populate showDetails with show data
              populateShowDetails(showData);
          },
          error: function (error) {
              console.log("Error fetching show details: ", error);
          }
      });
  });

  // Back to All Shows link
  $("#rootLink").click(function () {
      // Reload the page to show the initial list of shows
      location.reload();
  });
});

function populateShowList(data) {
  let tvShowList = $("#tvShowList");

  // Check if the data has a 'self' property, indicating it's from the initial API
  let isInitialList = data[0] && data[0]._links && data[0]._links.self;

  // Iterate through the shows and create list items with links
  data.forEach(function (item) {
    let show = isInitialList ? item : item.show;
    let listItem = $("<li></li>");
    let link = $("<a></a>").attr("href", show._links.self.href).text(show.name);

    listItem.append(link);
    tvShowList.append(listItem);
  });

  // Show the tvShowList
  tvShowList.show();

  // Show or hide the "Back to All Shows" link
  $("#rootLink").toggle(isInitialList);
}

  
  

function populateShowDetails(showData) {
  let showDetails = $("#showDetails");

  // Create elements for show details
  let title = $("<h1></h1>").text(showData.name);
  let image = $("<img>").attr("src", showData.image ? showData.image.medium : "http://localhost:3000/images/no_image.jpeg");
  let language = $("<p></p>").text("Language: " + (showData.language || "N/A"));
  let genres = $("<p></p>").text("Genres: " + (showData.genres ? showData.genres.join(", ") : "N/A"));
  let rating = $("<p></p>").text("Rating: " + (showData.rating ? showData.rating.average : "N/A"));
  let network = $("<p></p>").text("Network: " + (showData.network ? showData.network.name : "N/A"));
  let summary = $("<p></p>").html("Summary: " + (showData.summary || "N/A"));

  // Append elements to showDetails
  showDetails.append(title, image, language, genres, rating, network, summary);

  // Show the showDetails
  showDetails.show();

  // Show the Back to All Shows link
  $("#rootLink").show();
}
