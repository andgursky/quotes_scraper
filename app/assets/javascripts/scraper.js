var app = angular.module('MyApp', ["ngResource"]);
app.controller("ScraperCtrl", function($scope, $resource) {
  var Stock = $resource("/stocks/:id", {id: "@id"}, {update: {method:"PUT"}});
  $scope.stocks = Stock.query();
  $scope.addStock = function() {
    if ($scope.newStock.ticker) {
      var temp_obj = {};
      var arr = $scope.newStock.ticker.split(',');

      for(var indx in arr) {
        temp_obj = { ticker:arr[indx],
                     change:"0.0",
                     open:0.0,
                     height:0.0,
                     low:0.0,
                     close:0.0,
                     value:0.0 };
        if (!isStockExist(arr[indx].replace(/\s+/,''), $scope.stocks)) {
          stock = Stock.save(temp_obj);
          $scope.stocks.push(stock);
        }
      }
      $scope.newStock = {};
    }
  };
  $scope.removeStock = function(stock_id) {
    $scope.stocks.forEach(function(stock, index) {
      if (stock_id === stock.id) {
        stock.$delete( { ticker:stock.ticker, action:"delete",
          stock_id:stock.id }, function() {
          $scope.stocks.splice(index, 1);
        });
      };
    });
  };
  $scope.updateStockData = function() {
    /*$scope.stocks.forEach(function(stock, index) {
      stock.$update({ ticker:stock.ticker, action:"update",stock_id:stock.id });
    });*/
    $scope.stocks[0].$update({ action:"update" });
    Stock.query().$promise.then(function(result) {
      $scope.stocks = result;
    });
  };
});

var isStockExist = function(stock, obj) {
for(var i=0; i<obj.length; i++) {
    for(var key in obj[i]) {
      if(key == 'ticker') {
        if(obj[i][key].toLowerCase().indexOf(stock.toLowerCase()) != -1) {
         return true;
        }
      }
    }
  }
  return false;
}
