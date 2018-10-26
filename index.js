$(function() {
	let formData = false;

 	$(".submit").submit(function(e) {              
		e.preventDefault();
		let query = $('input[id=query]').val();
		const limit = 10;
    $.ajax({
      method: "GET",
      url:`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=${limit}&format=json&origin=*`,
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      dataType: "json",
      error: (err) => {console.log(err)}
    })
    .done((data) => {
    	formData = true;

    	const [term, titles, snippets, urls] = data;

    	$(".list-group").empty();
    	if (titles.length === 0) { 
    		$(".list-group").append(`
          <li class="list-group-item">No results. Try typing just one keyword.
          </li>`);
    		return;
    	}
  		for (let i = 0; i < limit; i++) {
  			if (!urls[i]) {
  				return;
  			}
  			$(".list-group").append(`
          <li class="list-group-item">
            <h3>${titles[i]}</h3>
            <br>
            ${snippets[i]}
            <br>
            <a href="${urls[i]}">${urls[i]}</a>
          </li>`);
  		}
  	})

  	$('.sort-az-btn').click(() => {
  		if (formData) {
  			let list = $('.list-group');
				let listItems = list.children('li').get();
				listItems.sort((a, b) => {
					let compA = $(a).text().toUpperCase();
					let compB = $(b).text().toUpperCase();
					return (compA < compB) ? - 1 : (compA > compB)? 1 : 0;
				})
				$.each(listItems, (index, item) => list.append(item))
  		}
  	})

  	$('.sort-za-btn').click(() => {
  		if (formData) {
  			let list = $('.list-group');
				let listItems = list.children('li').get();
        console.log(listItems)
				listItems.sort((a, b) => {
					let compA = $(a).text().toUpperCase();
					let compB = $(b).text().toUpperCase();
					return (compA > compB) ? - 1 : (compA < compB)? 1 : 0;
				})
				$.each(listItems, (index, item) => list.append(item))
  		}  	
  	})
  })
})