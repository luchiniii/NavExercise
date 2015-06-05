var MenuLoader = (function() {
	'use strict';

	function _createMenu(json) {
		var html = '';

		for ( var obj  in json.items ) {
			html += '<li class="MainMenu-item ">';
			html += '	<a href="' + json.items[obj].url + '" title="' + json.items[obj].label + '" class="MainMenu-item-link">';
			html += '		' + json.items[obj].label;
			html += '	</a>';
			if ( typeof json.items[obj].items !== 'undefined' && json.items[obj].items.length > 0 ) {
				html += '<ul class="MainMenu-subMenu">';
				html += _createMenu(json.items[obj]);
				html +='</ul>';
			}
			html += '</li>';
		}
		return html;
	}

	function _ajax(url) {
		var ajaxrequest = new XMLHttpRequest();

		ajaxrequest.open('GET',url,false);
		ajaxrequest.send();
		return JSON.parse(ajaxrequest.responseText);
	}

	function _setHtml(htmlMenu) {
		var ulTag = document.getElementById('MainMenu');
		ulTag.innerHTML = ulTag.innerHTML+htmlMenu;
	}

	function _addEventListener(){
		var li = document.querySelectorAll('#MainMenu > .MainMenu-item > a');
		var mask = document.getElementsByClassName('Mask');
		var body = document.getElementsByTagName('body');

		for (var i = 0; i < li.length; i++) {
			li[i].addEventListener('click', handleClicks);
		}

		mask[0].addEventListener('click', handleMaskClick);
		body[0].addEventListener('click', handleBodyClick);
	}

	function handleClicks() {
		var liHovered = document.getElementsByClassName('is-hovered');
		var mask = document.getElementsByClassName('Mask');
		
		mask[0].classList.remove('is-visible');
		mask[0].classList.add('is-visible');

		if ( typeof liHovered[0] !== 'undefined' ) {
			liHovered[0].classList.remove('is-hovered');
		}
		
		this.classList.add('is-hovered');
	}

	function handleMaskClick() {
		var liHovered = document.getElementsByClassName('is-hovered');

		liHovered[0].classList.remove('is-hovered');
		this.classList.remove('is-visible');
	}

	function handleBodyClick(event) {
		var liHovered = document.getElementsByClassName('is-hovered');
		var mask = document.getElementsByClassName('Mask');
		if ( event.target !== liHovered[0] && event.target !== mask[0] ) {
			mask[0].classList.remove('is-visible');
			for (var j = 0; j < liHovered.length; j++) {
				liHovered[j].classList.remove('is-hovered');
			}
		}
		
	}

	function init() {
		var url = '/api/nav.json';
		var jsonData = _ajax(url);
		var htmlMenu = _createMenu(jsonData);
		_setHtml(htmlMenu);
		_addEventListener();
	}

	return {
		init:init
	};
}());
MenuLoader.init();


