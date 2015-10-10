angular.module('arBlog')

.config(['markedProvider', function(markedProvider) {
  markedProvider.setOptions({
  	gfm: true,
  	tables: true,
  	breaks: false,
    pedantic: false,
    sanitize: false, // if false -> allow plain old HTML ;)
    smartLists: true,
    smartypants: false,
  	highlight: function (code, lang) {
  		if (lang) {
  			return hljs.highlight(lang, code, true).value;
  		} else {
      	return hljs.highlightAuto(code).value;
    	}
  	}
  });
}]);