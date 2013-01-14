$(document).ready(function(){
	jQuery.fn.exists = function(){return this.length>0;}
	if ($('.gallery').exists()) {
			$('.gallery').gallery({
			duration: 500,
			listOfSlides: '.list > li',
			switcher: '.switcher li'
		});
	}
});