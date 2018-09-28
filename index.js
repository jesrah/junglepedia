$(function() {
	 	$(".submit").submit(function(e) {              
         e.preventDefault();
         var query = $('input[name=wiki-query]').val()
         // $.ajax({
         //  	url:` https://en.wikipedia.org/w/api.php?action=query&titles=${query}&prop=images&imlimit=5&callback=?`,
         //  	headers: {
         //  		'Content-Type': 'application/json; charset=utf-8'
         //  	},
         //  	method: "GET",
         //  	data: { titles: query, format: 'html' },
         //  	dataType: 'jsonp',
         //  	encode: true
         //  })
         //  .done((data) => {
         //   		$(".placeholder").empty().append(data)
         //  })
     
        $.ajax({
	        method: "GET",
	        url:`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&utf8=&format=json&origin=*`,
	        // url: `http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=${query}&callback=?`,
	        contentType: "application/json; charset=utf-8",
	        // async: false,
	        dataType: "json",
	        error: (err) => {console.log(err)}
	      })
	      .done((data) => {
	      	console.log(data);
	      	// let markup = data.parse.text['*'];
	      	// //allows setting of div 'blurb'
	      	// let blurb = $('<div></div>').html(markup)
	      	// //puts div in placeholder, then p in div with markup
	      	// $('.placeholder').html($(blurb)).find('p')
	      	// // $(".placeholder").empty().append('<p> Data: ' + JSON.parse(JSON.stringify(data)) + '</p>')
	      })
    })
})