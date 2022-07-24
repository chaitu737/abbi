$(document).ready(function() {
	$('#accordion header').click(function() {
		$(this).next()
			.slideToggle(200)
			.closest('.question')
			.toggleClass('active')
			.siblings()
			.removeClass('active')
			.find('main')
			.slideUp(200);
	})
});