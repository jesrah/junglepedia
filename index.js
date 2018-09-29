$(function() {
	var formData = false;

 	$(".submit").submit(function(e) {              
		e.preventDefault();
		var query = $('input[name=wiki-query]').val() 
		var limit = 10;
    $.ajax({
      method: "GET",
      // url:`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&utf8=&format=json&origin=*`,
      url:`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=${limit}&format=json&origin=*`,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      error: (err) => {console.log(err)}
    })
    .done((data) => {
    	formData = true;
    	//if "least relevant" is selected, set variable to false, and reverse each data array. 
    	let titles = data[1];
    	let snippets = data[2];
    	let urls = data[3];

    	$(".list-group").empty();
    	if (titles.length === 0) { 
    		$(".list-group").append('<li class="list-group-item">' + 'No results. Try different keywords.' + '</li>');
    		return;
    	}
  		for (let i = 0; i < limit; i++) {
  			$(".list-group").append('<li class="list-group-item">' + '<h3>' + titles[i] + '</h3>' + '<br>' + snippets[i] + '<br>' + `<a href="${urls[i]}">` + urls[i] + '</a>' + '</li>')
  		}
  	})

  	$('.sort-az-btn').click(() => {
  		if (formData) {
  			var list = $('.list-group');
				var listItems = list.children('li').get();
				listItems.sort((a, b) => {
					var compA = $(a).text().toUpperCase();
					var compB = $(b).text().toUpperCase();
					return (compA < compB) ? - 1 : (compA > compB)? 1 : 0;
				})
				$.each(listItems, (index, item) => list.append(item))
  		}
  	})

  	$('.sort-za-btn').click(() => {
  		if (formData) {
  			var list = $('.list-group');
				var listItems = list.children('li').get();
				listItems.sort((a, b) => {
					var compA = $(a).text().toUpperCase();
					var compB = $(b).text().toUpperCase();
					return (compA > compB) ? - 1 : (compA < compB)? 1 : 0;
				})
				$.each(listItems, (index, item) => list.append(item))
  		}  	
  	})
  })
})