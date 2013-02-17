(function($) {
var apikey_usenetcrawler;

function addToSABnzbdFromUsenetCrawler() {
	var img = chrome.extension.getURL('images/sab2_16_fetching.png');
    $(this).find('img').attr("src", img);
    var nzburl = $(this).attr('href');
    var addLink = this;
    addToSABnzbd(addLink, nzburl, "addurl");
    return false;
}

function handleAllDownloadLinks() {
	var img = chrome.extension.getURL('/images/sab2_16.png');
	$("a[title='View details']").each(function() {
		var match = /^.*details\/([^\/]*)\/.*$/g.exec(this.pathname);
		if(match != null) {
			var href = "https://www.usenet-crawler.com/api?apikey=" + apikey_usenetcrawler + "&t=get&id=" + match[1];
			var link = $('<a class="addSABnzbd" href="' + href + '"><img title="Send to SABnzbd" src="' + img + '" /></a>');
			$(this).after(link);
			link.click(addToSABnzbdFromUsenetCrawler);
		}		
	});
}

function RefreshSettings()
{
	
}

Initialize('usenetcrawler', RefreshSettings, function() {
	GetSetting('apikey_usenetcrawler', function( state ) {
		apikey_usenetcrawler = state;
		handleAllDownloadLinks();
	});
});
})(jQuery);