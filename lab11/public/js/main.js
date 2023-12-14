$(document).ready(function () {
  $.ajax({
    url: "http://api.tvmaze.com/shows",
    method: "GET",
    success: function (data) {
      populateShowList(data);
    },
    error: function (error) {
      console.log("Error fetching show list: ", error);
    },
  });

  $("#searchShows").submit(function (event) {
    event.preventDefault();
    let searchTerm = $("#show_search_term").val().trim();
    if (searchTerm === "") {
      alert("Please enter a search term");
      return;
    }

    $("#tvShowList").empty();

    $.ajax({
      url: "http://api.tvmaze.com/search/shows?q=" + searchTerm,
      method: "GET",
      success: function (data) {
        populateShowList(data);
        $("#rootLink").show();
      },
      error: function (error) {
        console.log("Error fetching search results: ", error);
      },
    });
  });

  $("#tvShowList").on("click", "a", function (event) {
    event.preventDefault();
    let showUrl = $(this).attr("href");

    $("#tvShowList").hide();
    $("#showDetails").empty();

    $.ajax({
      url: showUrl,
      method: "GET",
      success: function (showData) {
        populateShowDetails(showData);
      },
      error: function (error) {
        console.log("Error fetching show details: ", error);
      },
    });
  });

  $("#rootLink").click(function () {
    location.reload();
  });
});

function populateShowList(data) {
  let tvShowList = $("#tvShowList");
  let isInitialList = data[0] && data[0]._links && data[0]._links.self;

  data.forEach(function (item) {
    let show = isInitialList ? item : item.show;
    let listItem = $("<li></li>");
    let link = $("<a></a>").attr("href", show._links.self.href).text(show.name);

    listItem.append(link);
    tvShowList.append(listItem);
  });

  tvShowList.show();
  $("#rootLink").toggle(isInitialList);
}

function populateShowDetails(showData) {
  let showDetails = $("#showDetails");
  let title = $("<h1></h1>").text(showData.name);
  let image = $("<img>").attr(
    "src",
    showData.image
      ? showData.image.medium
      : "http://localhost:3000/images/no_image.jpeg"
  );
  let language = $("<p></p>").text("Language: " + (showData.language || "N/A"));
  let genres = $("<p></p>").text(
    "Genres: " + (showData.genres ? showData.genres.join(", ") : "N/A")
  );
  let rating = $("<p></p>").text(
    "Rating: " + (showData.rating ? showData.rating.average : "N/A")
  );
  let network = $("<p></p>").text(
    "Network: " + (showData.network ? showData.network.name : "N/A")
  );
  let summary = $("<p></p>").html("Summary: " + (showData.summary || "N/A"));

  showDetails.append(title, image, language, genres, rating, network, summary);
  showDetails.show();
  $("#rootLink").show();
}
