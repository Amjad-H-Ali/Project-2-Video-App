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
			videoDuration: "short",
			part: "snippet"
		},
		type: "GET",
		dataType: "json",
		success: getVideos,
		fail: function (err) {
			console.log("didn't work");
		}
	});
});







function getVideos(data) {
	
	console.log(data);

	//Remove all thumbnails to prevent another search result to pile on top of other thumbnails
	$('#searchedVideos').empty();


	//Iterating through items array of objects in data object
	for(let i = 0; i < data.items.length; i++) {

		//Make a div that will contain a button and a video thumbnail and set id to the associated id of video we are iterating through
		const $div = $('<div>').attr('id', data.items[i].id.videoId);


		//Getting video Id from data set
		const videoId = data.items[i].id.videoId;


		//Adding videoId as the src for iframe to make the video thumbnails appear
		const video = $('<iframe>').attr('src', "http://www.youtube.com/embed/" + videoId + "?enablejsapi=1&origin=http://example.com");


		//Append videos to the div with a button
		const btnThumbContain = $div.append(video).append($('<button>').attr('class','thumbNailBtn').text('share'));


		// // Appending videos to div on our search page
		$(btnThumbContain).appendTo('#searchedVideos');
	};







	//Event lister on thumbnail button
	//When clicked, a form will pop up
	$('.thumbNailBtn').on('click', (event)=>{
		// When share btn clicked this form will pop up
		$('.modal').css('display', 'block');
		//Change action of form and pass in videoId to Post Route parameter
		$('#postVidForm').attr('action',`/video/${$(event.target).parent()[0].id}`)

		console.log($(event.target).parent()[0].id);
	});







	//Event listener when pressing the close button on form
	$('.close').on('click', (e)=>{
		// close the form
		$('.modal').css('display', 'none');
	});




};














