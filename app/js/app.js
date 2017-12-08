"use strict";

var harmonise = (function() {
	//cache DOM
	var $main = $('main'),
		$input = $main.find('.input'),
		$proportion = $main.find('.proportion'),
		$devider = $main.find('.devider'),
		$round = $main.find('.round'),
		$count = $main.find('.count'),
		$maxCol = $main.find('.max'),
		$minCol = $main.find('.min'),
		$selectorBtn = $main.find('.selector button');
	
	//bind events
	$input.on('keyup', count);
	$count.on('keyup', count);
	$selectorBtn.on('click', selectActive);
	
	function count(e) {
		if (e.keyCode == 13) {
			let max = $input.val(),
				min = $input.val();
			
			$maxCol.text('');
			$minCol.text('');
			
			for(let i=0; i< 12/*$count.val()*/; i++){
				max *= $proportion.children('.active').data('value');
				min *= 1/$proportion.children('.active').data('value');
				$maxCol.append('<li title="Копировать в буфер обмена">'+max.toFixed($round.children('.active').data('value'))+'</li>');
				$minCol.append('<li title="Копировать в буфер обмена">'+min.toFixed($round.children('.active').data('value'))+'</li>');
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
	
	function selectActive() {
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		
		let ePosition = $(this).position().left - $(this).parent().position().left,
			eWidth = $(this).innerWidth();
		
		$(this).parent().find('.marker')
			.css('transform','translateX('+ ePosition +'px)')
			.css('width',eWidth);
	}
	
	return {
		count: count
	}
})();
