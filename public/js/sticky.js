//Add sticky class to navs to add scroll functionality



//Get the nav element
const nav = $('nav')[0];

const $nav = $($('nav')[0]);







//Get the position of nav

const navPos = nav.offsetTop;

// If scroll, add the sticky class. Otherwise, remove sticky class from navs

// Call function when scroll




const addSticky = ()=>{
	console.log(window);
	if(window.pageYOffset >= navPos){
		console.log('It worked');
		$nav.addClass('sticky');
	}else{
		console.log('this worked too');
		$nav.removeClass('sticky');
	}
}


window.onscroll = addSticky;