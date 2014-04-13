'use strict';

angular.module('hackApp')
  .directive('comments',function () {
    return {
      templateUrl:'views/comments.html',
      restrict: 'AE',
      scope: {
		  articleid: '='
      },
	  controller: function($scope, $firebase, $rootScope) {
		  var comRef = new Firebase('https://walterhackil.firebaseio.com/comments');  
		  var commentRef = comRef.child($scope.articleid);
		  
		  console.log('here');
		  
		  $scope.comments = $firebase(commentRef);
		  
		  $scope.getComments = function() {
			  return $scope.comments;
		  }
		  
		  $scope.predicate = '-timestamp';
		  
		  $scope.addComment = function($event) {
			  if ($event.keyCode === 13 || $event.which === 13) {
				  var username = $rootScope.username;
				  var date = new Date().getTime();
		
				  var cm = {
					  username: username,
					  comment: $scope.commentText,
					  timestamp:date
				  };
			  
				  commentRef.push(cm);
			  }
			
		  }
	  }
    };
  });
