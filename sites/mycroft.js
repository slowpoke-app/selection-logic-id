
(function(){

function loadOpenSearch(url){

	OpenSearch.getEngineFromURL(url, function(status, engine, error){

		if(status == 'OK'){
			G_ENGINE_EDITOR.load(engine);
		}
		else
			G_ENGINE_EDITOR.showError(error);

	});

}

$('a[onClick^=addOpenSearch]').each(function(){

	var adder = $(this).attr('onclick').toString();

	var match = adder.match(/'(.*?)'/gi);

	var params = null;
	if(match){
		params = $.map(match, function(m){
			return m.slice(1, -1);
		});
	}

	if(!params || params.length != 5 || (params[4] != 'g' && params[4] != 'p')){

		// Add a placeholder for the image so the alignment look good
		$(this).before('<span style="display: inline-block; width: 16px; height: 16px; margin: 0 8px;"></span>');

		return true;
	}



	$(this).before(
		$('<a href="#"></a>').append(
			$('<img class="icon" alt="Add to Chrome Selection Search" title="Add to Chrome Selection Search" />').attr('src', chrome.extension.getURL('icon16.png')).css({
				'margin' : '0 8px',
				'width' : '16px', 'hwight' : '16px',
			})
		).click(function(e){

			G_ENGINE_EDITOR.show(e.pageX, e.pageY-50);

			
			loadOpenSearch("http://mycroft.mozdev.org/installos.php/" + params[3] + "/" + params[0] + ".xml");
			return false;
		})
	);
});


$('a[onClick^=addEngine]').each(function(){

	$(this).before('<span style="display: inline-block; width: 16px; height: 16px; margin: 0 8px;"></span>');
});

$('#NOTES-table .NOTEheader').after(
	$('<tr class="NOTEbody"><td><img class="icon" title="Chrome Selection Search" width="16px" height="16px" src="'+chrome.extension.getURL('icon16.png')+'" />'+
	' Add search engine to Chrome <a href="https://chrome.google.com/extensions/detail/gipnlpdeieaidmmeaichnddnmjmcakoe">Selection Search</a> extension.</td></tr>')
);


})();