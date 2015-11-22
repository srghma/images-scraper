'use strict'

var Scraper = require('./lib/GoogleScraper.js')
  , fs = require('fs')
  , request = require('request');

var scraper = new Scraper({
	keyword: 'coca cola',
	rlimit: 10	// 10 p second
});

scraper.list(50).then(function (res) {
	console.log('first 50 results', res);
	
	res.forEach(function(r) {
		var file = r.split('/');
		var r = request({
			url: r,
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
		}).pipe(fs.createWriteStream('./tmp/' + file[file.length-1]));
	});
});