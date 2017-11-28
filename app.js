"use strict";

(function harmonise() {
	//cache DOM
	var $main = $('main'),
		$input = $main.find('.input'),
		$proportion = $main.find('.proportion'),
		$round = $main.find('.round'),
		$maxCol = $main.find('.max ul'),
		$minCol = $main.find('.min ul');
	
	//bind events
	$input.on('keyup', count);
	
	function count(e) {
		if (e.keyCode == 13) {
			let value = $(this).val(),
				max = value,
				min = value;
			
			$maxCol.text('');
			$minCol.text('');
			
			for(let i=0; i<7;i++){
				max *= $proportion.val();
				min *= $proportion.val() - 1;
				$maxCol.append('<li title="Копировать в буфер обмена">'+Math.round(max * $round.val()) / $round.val()+'</li>');
				$minCol.append('<li title="Копировать в буфер обмена">'+Math.round(min * $round.val()) / $round.val()+'</li>');
			}
		}
	}
})();