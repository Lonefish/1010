$('document').ready(function() {
	for($i = 0; $i < 10; $i++) {
		for($j = 0; $j < 10; $j++) {
			$('div#canvas').append('<div class="block" id="row' + $i + 'cell' + $j + '"></div>');
		}
	}
});