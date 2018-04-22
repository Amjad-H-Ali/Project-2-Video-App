
//Event listener on like button
$('.likeBtn').on('click', (e)=>{




	$.ajax({
		type: 'POST',

		url: '/like',

		data: {

			vidId: $(e.currentTarget)[0].id,


			liked: $(e.currentTarget).children().hasClass('fa-thumbs-o-up')

		},

		success: success,

		fail: (err)=>{
			console.log(err);
		}
	})







	//Fill in like button if clicked, if already filled, then unfill.
	if( $(e.currentTarget).children().hasClass('fa-thumbs-o-up') || $(e.currentTarget).children().hasClass('fa-thumbs-up') ){
		
		$(e.currentTarget).children().toggleClass('fa-thumbs-o-up');


		$(e.currentTarget).children().toggleClass('fa-thumbs-up');

	}; 






});



function success (data) {
	console.log(data);
}