/*
*TODO:
*Stop from placing blocks when there is one in the way --> fixed
*Stop from placing blocks when part is out of the field --> fixed
*Check full line --> fixed
*
*Add multiple blocks at random --> Fixed and refixed with array containing separate hardcoded blocks
*Score system
*Multiple colors -> change 1's in block arrays to a color -> fixed
*Change color via .css() instead of removing/adding classes -> fixed
*Show 3 current blocks to choose from
*
*
*BUGS:
*Can't place the one block-block on the outside line, because if I take [1] as the array it won't see it as a block
		=> update now seems to block the one block from the 5th line
		=> looks fixed
*vertical lines are tricky for some reason. They show up as cubes => fixed
*Clicking probably doesn't check whether the block is going out of bounds => fixed
*Sometimes gets an error line 137 "cannot read  property '1' of undefined" => 	$target = 'div#' + $targetLocation[0]  + 'c' + $targetLocation[1];
	=> looks fixed, haven't had the error in a while
*some blocks stay green after placement, add update method to color all blocks accordingly -> should be fixed
*/

//3*3 L shape
$block11 = [[1, 0, 0], [1, 0, 0], [1, 1, 1]];
$block12 = [[1, 1, 1], [0, 0, 1], [0, 0, 1]];
$block13 = [[1, 1, 1], [1, 0, 0], [1, 0, 0]];
$block14 = [[0, 0, 1], [0, 0, 1], [1, 1, 1]];

//cubes
$block21 = [[2]];
$block22 = [[2, 2], [2, 2]];
$block23 = [[2, 2, 2], [2, 2, 2], [2, 2, 2]];

//vertical lines
$block31 = [[3], [3]];
$block32 = [[3], [3], [3]];
$block33 = [[3], [3], [3], [3]];
$block34 = [[3], [3], [3], [3], [3]];

//horizontal lines
$block41 = [[4,4]];
$block42 = [[4,4,4]];
$block43 = [[4,4,4,4]];
$block44 = [[4,4,4,4,4]];

//2*2 L shape
$block51 = [[0, 5], [5, 5]];
$block52 = [[5, 0], [5, 5]];
$block53 = [[5, 5], [0, 5]];
$block54 = [[5, 5], [5, 0]];

/*$blockArray = 	[	
				[[1, 1], [1, 1]], 
				[[1, 0], [1, 1]], 
				[[1, 1], [1, 0]], 
				[[0, 1], [1, 1]], 
				[[1, 1], [0, 1]],
				[[1, 0], [0, 0]],
				];
$block = [[1]];*/

//array with blocks 
$blockArray = [	$block11, $block12, $block13, $block14, 
				$block21, $block22, $block23, 
				$block31, $block32, $block33, $block34,
				$block41, $block42, $block43, $block44,
				$block51, $block52, $block53, $block54];
$block = $block21;
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
			for($j = 0; $j < $block[0].length; $j++) {
				if($block[$i][$j] != 0) {
					console.log($i + ' ' +$j);
					$targetLocation = [($row + $i) , ($cell + $j) ];
					$target = 'div#' + $targetLocation[0]  + 'c' + $targetLocation[1];
					
					//If there's already a block at the location, show green else show red
					if($field[$targetLocation[0]][$targetLocation[1]] == 0) {
						$($target).css('background-color', 'green');
					} else {
						$($target).css('background-color', 'red');
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
			for($j = 0; $j < $block[0].length; $j++) {
				if($block[$i][$j] != 0) {
					$targetLocation = [($row + $i) , ($cell + $j) ];
					$target = 'div#' + $targetLocation[0]  + 'c' + $targetLocation[1];
				}
			}	
		}
		updateColor();
	});

	//on click place the block on the field by adding the classes and saving it in the array
	$('div.block').click(function() {
		//get the row and cell of the current div
		$id = this.id.split("c");
		$row = (parseInt($id[0]) + $block.length) > $field.length ? $field.length - $block.length : (parseInt($id[0]));
		$cell = (parseInt($id[1]) + $block[0].length) > $field[0].length ? $field[0].length - $block[0].length : (parseInt($id[1]));


		$spaceEmpty = true;
		//loop over each element in the array to see if there is a block there, if so , show a color and save it in the array
		for($i = 0; $i < $block.length; $i++) {
			for($j = 0; $j < $block[0].length; $j++) {
				if($block[$i][$j] != 0) {
					$targetLocation = [($row + $i) , ($cell + $j) ];
					$target = 'div#' + $targetLocation[0]  + 'c' + $targetLocation[1];
					if($field[$targetLocation[0]][$targetLocation[1]] != 0) {
						$('p#error').text("Can't place that here!");
						$spaceEmpty = false;
					}
					
					console.log($target);
				}
			}	
		}
		if($spaceEmpty) {
			for($i = 0; $i < $block.length; $i++) {
				for($j = 0; $j < $block[0].length; $j++) {
					if($block[$i][$j] != 0) {
						$targetLocation = [($row + $i) , ($cell + $j) ];
						$target = 'div#' + $targetLocation[0]  + 'c' + $targetLocation[1];
						//$($target).addClass("blue");
						$field[$targetLocation[0]][$targetLocation[1]] = $block[$i][$j];						
						console.log($target);
					}
				}	
			}
			changeBlock();
			checkFullLine();
			updateColor();
		}
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
	$random = Math.floor((Math.random() * $blockArray.length));
	console.log($random);
	$block = $blockArray[$random];
	console.log($block);
}

function updateColor() {
	console.log("UPDATE COLOR");
	for($i = 0; $i < $field.length; $i++) {
		for($j = 0; $j < $field[0].length; $j++) {
			switch($field[$i][$j]) {
				case 0:
					$target = 'div#' + $i  + 'c' + $j;
					$($target).css('background-color', 'gray');
					//console.log($target);
					break;
				case 1:
					$target = 'div#' + $i  + 'c' + $j;
					$($target).css('background-color', 'purple');
					//console.log($target);
					break;
				case 2: 
					$target = 'div#' + $i  + 'c' + $j;
					$($target).css('background-color', 'pink');
					//console.log($target);
					break;
				case 3:
					$target = 'div#' + $i  + 'c' + $j;
					$($target).css('background-color', 'blue');
					//console.log($target);
					break;
				case 4:
					$target = 'div#' + $i  + 'c' + $j;
					$($target).css('background-color', 'black');
					//console.log($target);
					break;
				case 5:
					$target = 'div#' + $i  + 'c' + $j;
					$($target).css('background-color', 'white');
					//console.log($target);
					break;
			}
		}	
	}
}