console.log('test test')

//connect api to webpage
//display contend objects after button clicked
//display visual of video snippets when button is clicked

//function to call YouTube API
$('#button').on('click', (event) => {

	const keyword = $('input').val();

	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/search",
		data: {
			key: "AIzaSyC_xdKtskgVo7e_iNelQcq3Ti6BkeDy3Sw",
			q: keyword,
			type: "video",
			videoEmbeddable: true,
			part: "snippet"
		},
		type: "GET",
		dataType: "json",
		success: getVideos,
		fail: function (err) {
			console.log("didn't work")
		}
	})
})


function getVideos(data) {
	console.log(data);
	//Iterating through items array of objects in data object
	for(let i = 0; i < data.items.length; i++) {
		//Make a div that will contain a button and a thumbnail and set id to specific id of video we are iterating through
		const $div = $('<div>').attr('id',data.items[i].id.videoId);
		//Getting url from thumbnails within those objects
		const thumbnailURL = data.items[i].snippet.thumbnails.medium.url;
		//Adding url as the src of imgages to make the thumbnails appear
		const thumbnailImage = $('<img>').attr('src', thumbnailURL);
		//Append thumbnail to div with a button
		const btnThumbContain = $div.append(thumbnailImage).append($('<button>').attr('class','thumbNailBtn').text('share'))
		// Appending images to div on our view page
		$(btnThumbContain).appendTo('#thumbNails');
	}


	//Event lister on thumbnail button
	//When clicked, a form will pop up
	$('.thumbNailBtn').on('click', (event)=>{
		// When share btn clicked this form will pop up
		$('.modal').css('display', 'block');

		console.log($(event.target).parent()[0].id);
	});

	

	//Event listener when pressing the close button on form
	$('.close').on('click', (e)=>{
		// close the form
		$('.modal').css('display', 'none');
	})





	$('#player').attr('src',"http://www.youtube.com/embed/"+data.items[0].id.videoId+"?enablejsapi=1&origin=http://example.com")
}