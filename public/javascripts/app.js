angular.module('dwiApp', ['angularUtils.directives.dirPagination'])
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
	angular.extend($scope, {
      printClass : function(classId){
      	console.log('class')
			switch(classId){
				case 1:
				return 'Warrior';
				break;
				case 2:
				return 'Paladin';
				break;
				case 3:
				return 'Hunter';
				break;
				case 4:
				return 'Rogue';
				break;
				case 5:
				return 'Priest';
				break;
				case 6:
				return 'Deathknight';
				break;
				case 7:
				return 'Shaman';
				break;
				case 8:
				return 'Mage';
				break;
				case 9:
				return 'Warlock';
				break;
				case 10:
				return 'Paladin';
				break;
				case 11:
				return 'Druid';
				break;
			}
		}
    });
}])
.directive('lazy', function($timeout) {
	return {
		restrict: 'C',
		link: function (scope, elm, attrs) {
			$timeout(function() { $(elm).lazyload({event: 'loadlazy'}); $(elm).trigger('loadlazy') }, 0); 
		}
	}
});;