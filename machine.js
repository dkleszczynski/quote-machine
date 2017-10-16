var quotes = [];

$(document).ready(function(){
	$.getJSON("quotes.json", function(data) {
		console.log('JSON');
		quotes = data;
	});
	
	facebookInit();
	
	var quoteText = document.getElementById("quoteText");
	var generateQuoteBtn = document.getElementById("generateQuoteBtn");
		
	$("#generateQuoteBtn").on("click", generateQuote);
});

function generateQuote() {
	$("#twitterBtn").on("click", twitterPublish);
	$("#twitterBtn").removeClass("disabled");
		
	$("#facebookBtn").on("click", facebookPublish);
	$("#facebookBtn").removeClass("disabled");
	
	$("#generateQuoteBtn").addClass("animated bounce");
		window.setTimeout(function() {
			$("#generateQuoteBtn").removeClass("animated bounce");
		}, 1100);
	
	var index = Math.floor(Math.random() * quotes.length);
	quoteText.innerHTML = quotes[index];
	
	$("#twitterBtn").prop("disabled", false);
	$("#facebookBtn").prop("disabled", false);
	
	$("#twitterBtn").addClass("cursor-pointer");
	$("#facebookBtn").addClass("cursor-pointer");
}

function twitterPublish() {
	$("#twitterBtn").addClass("animated bounce");
		window.setTimeout(function() {
			$("#twitterBtn").removeClass("animated bounce");
		}, 1100);
		
		var quote = $("#quoteText").text();
		window.open('https://twitter.com/share?url=google.com&text=' + quote,
		'new window', 'width=400, height=300, top=' +
		(screen.height / 2 - 150) + ', left=' + (screen.width / 2 - 200));
		return false;
}

function facebookPublish() {
	$("#facebookBtn").addClass("animated bounce");
		window.setTimeout(function() {
			$("#facebookBtn").removeClass("animated bounce");
		}, 1100);
	
	FB.login(function(response) {
		if (response.authResponse) {
			FB.api('/me', function(response) {
				var quote = $("#quoteText").text();
				FB.api('/me/feed', 'post', {message: quote}, function(response) {
					$("#infoModal h4").text("Facebook publish");
					$("#infoModal p").text("The quote has been published on the Facebook timeline.");
					$("#infoModal").modal();
				});
				return true;
		});
		} 
		else {
			console.log('User cancelled login or did not fully authorize.');
			return false;
		}
	}, {scope: 'publish_actions'});
}
