/*
*TODO:
*Stop from placing blocks when there is one in the way
*Stop from placing blocks when part is out of the field --> fixed
*Check full line
*/

//testing block
$block = [[1, 0, 0], [1, 0, 0], [1, 1, 1]];
//array that remembers where there are blocks
$field = [[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0]];


$('document').ready(function() {
	//Make playfield
	for($i = 0; $i < 10; $i++) {
		for($j = 0; $j < 10; $j++) {
			$('div#canvas').append('<div class="block" id="' + $i + 'c' + $j + '"></div>');
		}
	}

	//On mouse enter on a block div, show the block starting from the top-left part of the block
	$('div.block').mouseenter(function() {
		//get the row and cell of the current div
		$id = this.id.split("c");
		$row = (parseInt($id[0]) + $block.length) > $field.length ? $field.length - $block.length : (parseInt($id[0]));
		$cell = (parseInt($id[1]) + $block[0].length) > $field[0].length ? $field[0].length - $block[0].length : (parseInt($id[1]));

		console.log($row + '  -  ' + $cell);
		//loop over each element in the array to see if there is a block there, if so, show a color
		for($i = 0; $i < $block.length; $i++) {
			for($j = 0; $j < $block.length; $j++) {
				if($block[$i][$j] == 1) {
					$targetLocation = [($row + $i) , ($cell + $j) ];
					$target = 'div#' + $targetLocation[0]  + 'c' + $targetLocation[1];
					
					//If there's already a block at the location, show green else show red
					if($field[$targetLocation[0]][$targetLocation[1]] == 0) {
						$($target).addClass("green");
					} else {
						$($target).addClass("red");
					}
					
					//console.log($target);
				}
			}	
		}
	});

	//on mouseleave do the exact opposite of mouseenter
	$('div.block').mouseleave(function() {
		//get the row and cell of the current div
		$id = this.id.split("c");
		$row = (parseInt($id[0]) + $block.length) > $field.length ? $field.length - $block.length : (parseInt($id[0]));
		$cell = (parseInt($id[1]) + $block[0].length) > $field[0].length ? $field[0].length - $block[0].length : (parseInt($id[1]));
		//loop over each element in the array and delete the colorclasses
		for($i = 0; $i < $block.length; $i++) {
			for($j = 0; $j < $block.length; $j++) {
				if($block[$i][$j] == 1) {
					$targetLocation = [($row + $i) , ($cell + $j) ];
					$target = 'div#' + $targetLocation[0]  + 'c' + $targetLocation[1];
					$($target).removeClass("green");
					$($target).removeClass("red");

				}
			}	
		}
	});

	//on click place the block on the field by adding the classes and saving it in the array
	$('div.block').click(function() {
		//get the row and cell of the current div
		$id = this.id.split("c");
		$row = parseInt($id[0]);
		$cell = parseInt($id[1]);
		//loop over each element in the array to see if there is a block there, if so, show a color and save it in the array
		for($i = 0; $i < $block.length; $i++) {
			for($j = 0; $j < $block.length; $j++) {
				if($block[$i][$j] == 1) {
					$targetLocation = [($row + $i) , ($cell + $j) ];
					$target = 'div#' + $targetLocation[0]  + 'c' + $targetLocation[1];
					if($field[$targetLocation[0]][$targetLocation[1]] == 0) {
						$($target).addClass("blue");
						$field[$targetLocation[0]][$targetLocation[1]] = 1;
					} else {
						$('p#error').text("Can't place that here!");
					}
					
					console.log($target);
				}
			}	
		}
	});

});