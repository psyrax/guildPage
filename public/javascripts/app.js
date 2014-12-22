angular.module('dwiApp', [])
.controller('streamController', ['$scope', '$http', function($scope, $http){
	function getStream(){
		$http.get('/stream')
		.success(function(data){
			$scope.news = data;
			angular.forEach($scope.news, function(newItem, keys){
				if ( newItem.type == 'itemLoot' ){
					$http.get('/item/' + newItem.itemId)
					.success( function(item){
						newItem.item = item;
					});
				};
				switch (newItem.type){
					case 'itemLoot':
					newItem.typeFancy = 'Loot';
					break;
					case 'playerAchievement':
					newItem.typeFancy = 'Achievement';
					break;
					default:
					newItem.typeFancy = newItem.type;
					break;
				};
			});
		});
	};
	getStream();
}]);