(function( $ ) {
	'use strict';

	// var CardSort = {
	// 	CATEGORY_GUTTER: 16,
	// 	CATEGORY_WIDTH: 260,
	// 	CARD_SORTABLE_OPTIONS: {
	// 		connectWith: ".sortable-category:not(.is-full)",
	// 		placeholder: "card-placeholder",
	// 		tolerance: "pointer",
	// 		scroll: !1,
	// 		delay: 150,
	// 		items: "li",
	// 		helper: "clone",
	// 		appendTo: document.body
	// 	},
	// 	CATEGORY_DRAGGABLE_OPTIONS: {
	// 		delay: 150,
	// 		helper: "clone",
	// 		appendTo: ".cs-stage",
	// 		scrollSpeed: 5
	// 	}
	// };

	// var $instructions_dialog = $( "#os-instructions-dialog" );

	// $instructions_dialog.dialog({
	// 	modal: true,
	// 	autoOpen: false,
	// 	draggable: false,
	// 	resizable: false,
	// 	overlay: { backgroundColor: "#000000", opacity: 0.3 }, 
	// 	buttons: {
	// 		Ok: function() {
	// 			$( this ).dialog( "close" );
	// 		}
	// 	}
	// });
	// $( document ).on( "click", ".cs-instructions-btn", function(e) {
	// 	e.preventDefault();

	// 	$instructions_dialog.dialog( "open" );
	// });

	// $('.cs-unsorted').sortable(CardSort.CARD_SORTABLE_OPTIONS);

	// var $grid = $('.cs-grid').packery({
	// 	itemSelector: ".category",
	// 	columnWidth: ".category-width",
	// 	gutter: CardSort.CATEGORY_GUTTER,
	// 	transitionDuration: "0"
	// });

	// var $categoryItems = $grid.find('.category').draggable(CardSort.CATEGORY_DRAGGABLE_OPTIONS);
	// $grid.packery( 'bindUIDraggableEvents', $categoryItems );
})( jQuery );
