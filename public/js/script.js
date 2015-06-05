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

	function _createMobileMenu(json) {
		var html = '';

		for ( var obj  in json.items ) {
			html += '<li class="MobileMenu-item ">';
			html += '	<a href="' + json.items[obj].url + '" title="' + json.items[obj].label + '" class="MobileMenu-item-link ' + (typeof json.items[obj].items !== 'undefined' && json.items[obj].items.length > 0 ? 'MobileMenu-item-link--hasSub' : '' ) +'">';
			html += '		' + json.items[obj].label;
			html += '	</a>';
			if ( typeof json.items[obj].items !== 'undefined' && json.items[obj].items.length > 0 ) {
				html += '<ul class="MobileMenu-subMenu">';
				html += _createMobileMenu(json.items[obj]);
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

	function _setHtml(htmlMenu, element) {
		var ulTag = document.getElementById(element);
		ulTag.innerHTML = ulTag.innerHTML+htmlMenu;
	}

	function _addEventListener(){
		var li = document.querySelectorAll('#MainMenu > .MainMenu-item > a');
		var liMobile = document.querySelectorAll('#MobileMenu > .MobileMenu-item');
		var mask = document.getElementsByClassName('Mask');
		var body = document.getElementsByTagName('body');
		var menuMobile = document.getElementsByClassName('MobileClose');
		var menuBurger = document.getElementsByClassName('BurgerIcon-icon');

		for (var i = 0; i < li.length; i++) {
			li[i].addEventListener('click', handleClicks);
		}

		for ( i = 0; i < li.length; i++) {
			liMobile[i].addEventListener('click', handleClicksMobile);
		}

		mask[0].addEventListener('click', handleMaskClick);
		body[0].addEventListener('click', handleBodyClick);
		menuMobile[0].addEventListener('click', handleMenuMobileClick);
		menuBurger[0].addEventListener('click', handleMenuBurgerClick);
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
	function handleClicksMobile() {
		var liHovered = document.getElementsByClassName('is-hoveredm');
				
		if ( typeof liHovered[0] !== 'undefined' ) {
			liHovered[0].classList.remove('is-hoveredm');
		}
		
		this.classList.add('is-hoveredm');
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

	function handleMenuMobileClick (event) {
		var menuMobile = document.getElementsByClassName('Mobile');
		menuMobile[0].classList.remove('is-shown');
	}

	function handleMenuBurgerClick (event) {
		var menuMobile = document.getElementsByClassName('Mobile');
		menuMobile[0].classList.add('is-shown');
	}

	function init() {
		var url = '/api/nav.json';
		var jsonData = _ajax(url);
		var htmlMenu = _createMenu(jsonData);
		var htmlMobileMenu = _createMobileMenu(jsonData);
		_setHtml(htmlMenu, 'MainMenu');
		_setHtml(htmlMobileMenu, 'MobileMenu');
		_addEventListener();
	}

	return {
		init:init
	};
}());
MenuLoader.init();


