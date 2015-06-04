var MenuLoader = (function() {
	'use strict';

	function MenuLoader(url) {
		// enforces new
		if (!(this instanceof MenuLoader)) {
			return new MenuLoader(url);
		}
		this.url = url;
		/*this.jsonMenu = jsonMenu;
		this.htmlMenu = htmlMenu;*/
	}

	MenuLoader.prototype.ajaxLoad = function(url) {
		var ajaxrequest = new XMLHttpRequest();
		ajaxrequest.onreadystatechange = function()
		{
			if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200)
			{
				console.log( ajaxrequest.responseText );
			}
		};

		ajaxrequest.open("GET","api/data/nav.json",true);
		ajaxrequest.send();
	};

	return MenuLoader;
}());

http://localhost:3000/api/nav.json

