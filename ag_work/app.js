console.log('test test')

$('button').on('click', (event) => {
	const theVideo = $('input').val();

	$.ajax({
		url: 'https://www.youtube.com/results?search_query=' + theVideo + 'AIzaSyC_xdKtskgVo7e_iNelQcq3Ti6BkeDy3Sw',
		type: "GET",
		dataType: 'json',
		success: getVideos,
		fail: function (error) {
			console.log("didn't work")
		}
	})
	console.log('button was clicked')
})


function getVideos(data) {
	console.log(data)
	//get the city name
	const cityName = data.name;
	const h1 = $('<h1>').text(cityName)
	$('body').append(h1);
	console.log(cityName)


	//current temperature in F
	const currentTemp = (parseInt(((data.temp - 273) * 1.8) + 32))
	const h2 = $('<h2>')
	$('body').append(h2)
	console.log(currentTemp)

	//the current weather description

	//high temperature in F

	//low temperature in F
}
