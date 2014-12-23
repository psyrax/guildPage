var express = require('express');
var router = express.Router();

var armory = require('armory').defaults({
	realm: 'QuelThalas',
	region: 'us'
});

var MongoClient = require('mongodb').MongoClient;
var membersCollection = null;

var url = 'mongodb://localhost:27017/wow';

MongoClient.connect(url, function(err, db) {
  membersCollection = db.collection('members');
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
});

router.get('/members', function(req, res){
	if ( membersCollection != null ){
		membersCollection.find({})
		.toArray(function(err, docs){
        	res.json(docs);
      	});
	} else {
		res.json('error', 500);
	}
});


setInterval(function(){
	membersUpdate();
}, 60000);

module.exports = router;


function membersUpdate(){
	var guildOptions = {
		name: 'Ðeal Wîth ît',
		fields: ['members']
	}
	armory.guild(guildOptions, function(err, guild){
		if(err){
			console.log('Armory Error', err);
		} else {
			if ( membersCollection != null ){
				guild.members.forEach(function(member){
					membersCollection
					.update(
						{ "character.name": member.character.name}, 
						{ $set : member },
						{ upsert: true },
						function(err, result){
							if(err){
								console.log('Mongo Error', err);
							};
						}
					)
				});
				console.log('updated members');
			} else {
				console.log('failed');
			};
		};
	});
};