"use strict";

var harmonise = (function() {
	//cache DOM
	var $main = $('main'),
		$input = $main.find('.input'),
		$proportion = $main.find('.proportion'),
		$devider = $main.find('.devider'),
		$round = $main.find('.round'),
		$count = $main.find('.count'),
		$maxCol = $main.find('.max ul'),
		$minCol = $main.find('.min ul');
	
	//bind events
	$input.on('keyup', count);
	$count.on('keyup', count);
	
	function count(e) {
		if (e.keyCode == 13) {
			let max = $input.val(),
				min = $input.val();
			
			$maxCol.text('');
			$minCol.text('');
			
			for(let i=0; i< $count.val(); i++){
				max *= $proportion.val();
				min *= 1/$proportion.val();
				$maxCol.append('<li title="Копировать в буфер обмена">'+max.toFixed($round.val())+'</li>');
				$minCol.append('<li title="Копировать в буфер обмена">'+min.toFixed($round.val())+'</li>');
			}
	  		
			if($devider.val() == "comma") changeDevider();
		}
	}
  
	function changeDevider() {
		$main.find('.h-content ul li').each(function(){
			let changed = $(this).text().replace('.', ',');
			$(this).text(changed);
		})
	}
	
	return {
		count: count
	}
})();