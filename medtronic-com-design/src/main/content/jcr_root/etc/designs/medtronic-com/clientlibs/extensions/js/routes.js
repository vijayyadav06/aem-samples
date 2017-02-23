(function ($, undefined) {

	/* Change this to set the context path, should begin and end with '/' ('/context/path/') */
	var rootPrefix = '';

	/* Configure URLs for Ajax Requests, or Page URLs to JSON API */
	var Routes = {
		loadMoreTopic: '/topic-data',
		loadMoreHome: '/home-data',
		getSearchResults: '/bin/medtronic-com/gsaSearchServlet',
		getPredictiveSuggestiveResults: '/bin/medtronic-com/gsaPredictiveSuggestiveServlet'
	};

	/* Do the prefixing */
	function prefixRoute(key, value, obj, prefix) {
		if (typeof value === 'string') {
			obj[key] = prefix + value;
		} else if ($.isPlainObject(value)) {
			prefixRoutes(value, prefix + key.toLowerCase() + '/');
		}
	}

    function prefixRoutes(obj, prefix) {
		$.each(obj, function (key, value) {
			prefixRoute(key, value, obj, prefix);
		});
	}

	prefixRoutes(Routes, rootPrefix);

	/* expose as global variable */
	window.Routes = Routes;

}(jQuery));
