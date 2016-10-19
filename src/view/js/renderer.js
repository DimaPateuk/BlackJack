const button = document.querySelector('#quite');
console.log(button.onclick);
button.onclick = () => {
	window.close();
}

function setMoveCardhandler(control, card) {
	function _setHandler (classEl, action, factor) {
		$(control + ' .' + classEl).on('click', function () {
			const $card = $(card);
			const value = parseInt($card.css(action));
			const increaseValue = $('.increase').val();
			console.log(increaseValue);
			$card.css(action, (value + (factor * increaseValue)) + 'px');
		});
	}

	_setHandler('top','top', -1);
	_setHandler('left', 'left',-1);
	_setHandler('bottom', 'top', 1);
	_setHandler('right', 'left', 1);

}

setMoveCardhandler('.my_cards_card_1_control', '.my_cards_card_1');
setMoveCardhandler('.my_cards_card_2_control', '.my_cards_card_2');