/*
*TODO:
*Stop from placing blocks when there is one in the way --> fixed
*Stop from placing blocks when part is out of the field --> fixed
*Check full line --> fixed
*
*Add multiple blocks at random --> Fixed
*Score system
*Multiple colors
*Change color via .css() instead of removing/adding classes
*
*BUGS:
*Can't place the one block-block on the outside line, because if I take [1] as the array it won't see it as a block
*Clicking probably doesn't check whether the block is going out of bounds
*/

//testing block
//$block = [[1, 0, 0], [1, 0, 0], [1, 1, 1]];
$blockArray = 	[	
				[[1, 1], [1, 1]], 
				[[1, 0], [1, 1]], 
				[[1, 1], [1, 0]], 
				[[0, 1], [1, 1]], 
				[[1, 1], [0, 1]],
				[[1, 0], [0, 0]],
				];
$block = [[1, 1], [0, 1]];
//array that remembers where there are blocks
$field = [[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0],[0,0,0,0,0, 0,0,0,0,0]];


$('document').ready(function() {
	//initialize first block
	//$block = changeBlock();
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

		$spaceEmpty = true;
		//loop over each element in the array to see if there is a block there, if so , show a color and save it in the array
		for($i = 0; $i < $block.length; $i++) {
			for($j = 0; $j < $block.length; $j++) {
				if($block[$i][$j] == 1) {
					$targetLocation = [($row + $i) , ($cell + $j) ];
					$target = 'div#' + $targetLocation[0]  + 'c' + $targetLocation[1];
					if($field[$targetLocation[0]][$targetLocation[1]] == 1) {
						$('p#error').text("Can't place that here!");
						$spaceEmpty = false;
					}
					
					console.log($target);
				}
			}	
		}
		if($spaceEmpty) {
			for($i = 0; $i < $block.length; $i++) {
				for($j = 0; $j < $block.length; $j++) {
					if($block[$i][$j] == 1) {
						$targetLocation = [($row + $i) , ($cell + $j) ];
						$target = 'div#' + $targetLocation[0]  + 'c' + $targetLocation[1];
						$($target).addClass("blue");
						$field[$targetLocation[0]][$targetLocation[1]] = 1;						
						console.log($target);
					}
				}	
			}
		}
		changeBlock();
		checkFullLine();
	});

});

function checkFullLine() {
	//check horizontally
	for($i = 0; $i < $field.length; $i++) {
		$fullLine = true;
		for($j = 0; $j < $field.length; $j++) {
			if($field[$i][$j] == 0) {
				$fullLine = false;
				break;
			}
		}	
		if($fullLine) {
			console.log("HORIZONTAL LINE!");
			for($j = 0; $j < $field.length; $j++) {
				$div = 'div#' + $i + 'c' + $j;
				$($div).removeClass("blue");
				$field[$i][$j] = 0;
			}
		}
	}

	//check vertically
	for($i = 0; $i < $field.length; $i++) {
		$fullLine = true;
		for($j = 0; $j < $field.length; $j++) {
			if($field[$j][$i] == 0) {
				$fullLine = false;
				break;
			}
		}	
		if($fullLine) {
			console.log("VERTICAL LINE!");
			for($j = 0; $j < $field.length; $j++) {
				$div = 'div#' + $j + 'c' + $i;
				//$($div).effect('explode');
				$($div).removeClass("blue");
				$field[$j][$i] = 0;
			}
		}
	}
}

function changeBlock() {
	$block = $blockArray[Math.floor((Math.random() * $blockArray.length))];
	console.log($block);
}
