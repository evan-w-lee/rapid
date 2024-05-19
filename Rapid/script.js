$(document).ready(function() {
  let params = new URLSearchParams(location.search)
  if (params.get("search") !== null) {
	console.log(params)
	search()
  }
  function checkInput() {
	if ($('#before_search').val() === "") {
  	return false;
	} else {
  	return true;
	}
  }
  function changeTitle() {
	alert("changing title")
  }
  // Handles search events
  $('#search').click(function() {
	if (checkInput()) {
  	search();
	}
  });
  $('#random').click(function() {
	if (checkInput()) {
  	search();
	}
  });

  // Changes screen
  $(document).keyup(function(e) {
	if (e.which === 13) {
  	if (checkInput()) {
    	if ($('#searched_results_display').hasClass('hidden')) {

      	search();
    	} else {
      	var keyword = $('#after_search').val();
      	getWikiData(keyword);
    	}

  	}

	} else {
  	if ($('.wrapper').hasClass('hidden')) {

    	var n_keyword = $('#after_search').val();
    	getWikiData(n_keyword);
  	}
	}
  });
  let form = document.querySelector("form");
  form.addEventListener("submit", event => {
	console.log("Saving value", document.getElementById("before_search").value);
	search()
  });
  // Does all the searching
  function search() {
	var keyword = params.get("search")
	$('#after_search').val(keyword);
	$('.wrapper').addClass('hidden');
	$('#searched_results_display').removeClass('hidden');
	getWikiData(keyword);
  }

  function getWikiData(keyword) {
	// Ajax API stuff
	$.ajax({
  	url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&prop=info&inprop=url&utf8=&format=json",
  	dataType: "jsonp",
  	success: function(wikiResponse) {
    	if (wikiResponse.query.searchinfo.totalhits === 0) {
      	$('.wiki_results').html("");
      	$('.wiki_results').append("<div class='error'><div>There are no results for your search <b>" + keyword + "</b>. </div><br><div>Here are things that might help:</div><br><ul><li>Are your words spelled correctly?</li><li>Maybe try different keywords.</li><li>Try fewer keywords.</li></ul></div>");
    	} else {
      	showResults(wikiResponse);
    	}

  	}
	});
  }

  //Showing the results we retrieved from the wiki api in our html page
  function showResults(wikiResponse) {
	var timestamp1 = 0;
	timestamp1 = Date.now();
	console.log(wikiResponse);
	$('.wiki_results').html(""); // Prevents results from piling up on each other
	// Creates results
	for (var i = 0; i < 9; i++) {
  	var wordcount = wikiResponse.query.search[i].wordcount;
  	var title = wikiResponse.query.search[i].title;
  	var timestamp = wikiResponse.query.search[i].timestamp;
  	$('.wiki_results').append("<div class='wiki_title wiki_title_" + i + "'></div><i class='fa fa-volume-high'></i></p><div class='wiki_snippet wiki_snippet_" + i + "'></div><div class='wiki_wordcount wiki_wordcount_' id='wordcount'>" + wordcount + " words in this article</div><div class='wiki_wordcount wiki_wordcount_' id='wordcount'>Last edited " + timestamp + "</div><p></p>");
	}



	for (var j = 0; j < 9; j++) {
  	// Changes title
  	var testt = document.getElementById("after_search").value;
  	if (document.getElementById("after_search").value === "") {
    	document.title = "Rapid"
  	} else {
    	var testtt = "Rapid • "+ testt;
    	document.title = testtt;
  	}

  	var new_title = wikiResponse.query.search[j].title;
  	var new_url = new_title.replace(/\s/g, "_");
  	var snippet = wikiResponse.query.search[j].snippet + "...";
  	$(".wiki_title_" + j + "").html("<a href='https://en.wikipedia.org/wiki/" + new_url + "' target='_blank'>" + new_title + "</a>");
  	$(".wiki_snippet_" + j + "").html(snippet);
	}

	// Specifications
	var timestamp2 = 0;
	timestamp2 = Date.now();
	var timestamp = timestamp2 - timestamp1;
	document.getElementById("specs").innerHTML = "";
	var flag = Math.floor(Math.random() * (11 - 6) ) + 6;
	$("#specs").html( flag + " results (" + timestamp/1000 + " seconds)");
  }

  $('.after_search_container span').click(function() {
	if ($('#after_search').val() === "") {
  	//pass
	} else {
  	var keyword = $('#after_search').val();
  	getWikiData(keyword);
  	alert("yep thats it")
	}
  });

});

var mybutton = document.getElementById("myBtn");

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function randomSearch() {
  var word = ["Alabama ", "Alaska ", "Arizona ", "Arkansas ", "California ", "Colorado ", "Connecticut ", "Delaware ", "Florida ", "Georgia ", "Hawaii ", "Idaho ", "Illinois ", "Indiana ", "Iowa ", "Kansas ", "Kentucky ", "Louisiana ", "Maine ", "Maryland ", "Massachusetts ", "Michigan ", "Minnesota ", "Mississippi ", "Missouri ", "Montana ", "Nebraska ", "Nevada ", "New Hampshire ", "New Jersey ", "New Mexico ", "New York ", "North Carolina ", "North Dakota ", "Ohio ", "Oklahoma ", "Oregon ", "Pennsylvania ", "Rhode Island ", "South Carolina ", "South Dakota ", "Tennessee ", "Texas ", "Utah ", "Vermont ", "Virginia ", "Washington ", "West Virginia ", "Wisconsin", "Wyoming", "Apple", "House", "Cat", "Apache", "Grass", "Tree", "Britain", "Bookmark", "Google", "Ant", "Plasma ball", "Skunk", "Cake", "Poison ivy", "Rain", "Science", "Cookie", "CSS", "Landscape", "Sleep", "River", "Lake", "Ocean", "Book", "Download", "E-mail", "Facebook", "School", "Fire", "Pine tree", "Fart", "Google", "ELA", "Dog", "Math", "Bat", "Trout", "HTML", "Antler", "Shower", "Quarter", "Hypertext", "Mint", "Inbox", "Internet", "Light", "Sun", "Chemistry", "Metal", "Football", "Baseball", "Basketball", "Tennis", "Dodgeball", "JavaScript", "Telescope", "Volt", "Rat", "Tank", "Mirror", "Paper", "Packet", "Plastic", "Notepad", "Fishing", "Hot springs", "Soda", "Oxegen", "Hydrogen", "YouTube", "Socket", "Fish", "Spider", "Bird", "Library", "Forest", "Tesla", "Mountain", "Banana"];
  var words = word[Math.floor(Math.random()*word.length)];
  document.getElementById("before_search").value = words;
}


