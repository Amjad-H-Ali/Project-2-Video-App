
//Event listener on like button
$('.likeBtn').on('click', (e)=>{


	//We use ajax to POST a like/unlike to our DB to prevent 'page reload' as when a post is made the conventional way. No one wants a reloading page when hitting the like button
	//Ajax POST rather than Form POST
	$.ajax({
		//POST method to add the like
		type: 'POST',

		//A POST to this route located in userControllers
		url: '/like',

		//Send over some data we will need
		data: {

			// the vid Id to know which vid was liked
			vidId: $(e.currentTarget)[0].id,

			//If the button is clicked/unclicked, we want to add/remove the vid from array in DB
			liked: $(e.currentTarget).children().hasClass('fa-thumbs-o-up')

		},

		success: success,

		fail: (err)=>{
			console.log(err);
		}
	})







	//Fill in like button if clicked
	if( $(e.currentTarget).children().hasClass('fa-thumbs-o-up') ){
		console.log($(e.currentTarget).siblings());
		//Fill in like Button
		$(e.currentTarget).children().toggleClass('fa-thumbs-o-up');


		$(e.currentTarget).children().toggleClass('fa-thumbs-up');

		//Also, increment number of likes
		$(e.currentTarget).siblings()[4].innerText ++;



	

	} 
	//If already filled, then unfill.
	else if ( $(e.currentTarget).children().hasClass('fa-thumbs-up')){

		//Unfill like button
		$(e.currentTarget).children().toggleClass('fa-thumbs-o-up');


		$(e.currentTarget).children().toggleClass('fa-thumbs-up');

		//Also. decrement number of likes
		$(e.currentTarget).siblings()[4].innerText --;

	}





	





});



function success (data) {
	console.log(data);
};













