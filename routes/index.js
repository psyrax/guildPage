var express = require('express');
var router = express.Router();

var armory = require('armory').defaults({
	realm: 'QuelThalas',
	region: 'us'
});


/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', {
		title: 'Deal With It'
	});
	
});

router.get('/stream', function(req, res){
	var guildOptions = {
		name: 'Ðeal Wîth ît',
		fields: ['news']
	}
	armory.guild(guildOptions, function(err, guild){
		var reverseNews = guild.news.reverse();
		res.json(reverseNews.slice(0,50));
	});
});

router.get('/item/:id', function(req, res){
	var itemOptions = {
		id: req.params.id
	};
	armory.item(itemOptions, function(err, item){
		res.json(item);
	})
})

module.exports = router;
