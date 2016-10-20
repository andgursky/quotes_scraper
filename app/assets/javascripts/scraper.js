var app = angular.module('MyApp', []);
app.controller("ScraperCtrl", function($scope) {
  $scope.stocks = [
  {ticker:"AAPL",change:0.0,open:0.0, height:0.0, low:0.0, close:0.0, value:0.0},
  {ticker:"GOOG",change:0.0,open:0.0, height:0.0, low:0.0, close:0.0, value:0.0},
  {ticker:"BAC",change:0.0,open:0.0, height:0.0, low:0.0, close:0.0, value:0.0},
  {ticker:"XOM",change:0.0,open:0.0, height:0.0, low:0.0, close:0.0, value:0.0},
  {ticker:"GS",change:0.0,open:0.0, height:0.0, low:0.0, close:0.0, value:0.0}
  ];
  $scope.addStock = function() {
    if ($scope.newStock.ticker) {
      var temp_obj = {};
      var arr = $scope.newStock.ticker.split(',');

      for(var indx in arr) {
        temp_obj = { ticker:arr[indx],
                     change:0.0,
                     open:0.0,
                     height:0.0,
                     low:0.0,
                     close:0.0,
                     value:0.0 };
        if (!isStockExist(arr[indx].replace(/\s+/,''), $scope.stocks)) {
          $scope.stocks.push(temp_obj);
        }
      }
      $scope.newStock = {};
    }
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
