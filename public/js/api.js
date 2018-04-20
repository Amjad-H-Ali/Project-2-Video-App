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

	console.log(data.items[2].snippet.thumbnails.high.url);
	console.log(data.items[2].snippet.title);

	for(let i = 0; i < data.items.length; i++) {
		console.log(data.items[i])
	}

	const thumbnailURL = data.items[2].snippet.thumbnails.medium.url;
	const thumbnailImage = $('<img>').attr('src', thumbnailURL)
	// const thumbnailImage = $('<img src= thumbnailURL />')

	$('#theDiv').append(thumbnailImage)
}