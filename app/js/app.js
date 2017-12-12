"use strict";

var harmonise = (function() {
	//cache DOM
	var $main = $('main'),
		$input = $main.find('.input'),
		$proportion = $main.find('.proportion .selector-wrap'),
		$devider = $main.find('.devider .selector-wrap'),
		$round = $main.find('.round .selector-wrap'),
		$count = $main.find('.count'),
		$maxCol = $main.find('.max'),
		$minCol = $main.find('.min'),
		$selectorBtn = $main.find('.selector .selector-wrap button');
	
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
				$maxCol.append('<li title="Копировать в буфер обмена">'+max.toFixed($round.children('.active').data('round'))+'</li>');
				$minCol.append('<li title="Копировать в буфер обмена">'+min.toFixed($round.children('.active').data('round'))+'</li>');
			}
	  		
			if($devider.children('button.active').data('value') == ",") changeDevider();
		}
	}
  
	function changeDevider() {
		$main.find('.numbers ul li').each(function(){
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
})();
