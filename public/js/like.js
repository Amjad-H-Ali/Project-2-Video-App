//Event listener on like button
$('.likeBtn').on('click', (e)=>{


	//Fill in like button if clicked, if already filled, then unfill.
	if( $(e.currentTarget).children().hasClass('fa-thumbs-o-up') || $(e.currentTarget).children().hasClass('fa-thumbs-up') ){
		
		$(e.currentTarget).children().toggleClass('fa-thumbs-o-up');


		$(e.currentTarget).children().toggleClass('fa-thumbs-up');

	}; 


});