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
	function getMembers(){
		$http.get('/members')
		.success(function(members){
			$scope.members = members;
		});
	};
	getMembers();
	getStream();
	$scope.streamTab = true;
	$scope.membersTab = false;
	$scope.setTab = function(tab){
		$('.tabCheck').removeClass('active');
		switch(tab){
			case 'stream':
			$scope.membersTab = false;
			$scope.streamTab = true;
			$('#tabStream').addClass('active');
			break;
			case 'members':
			$scope.streamTab = false;
			$scope.membersTab = true;
			$('#tabMembers').addClass('active');
			break;
		}
	};
}]);