var app = angular.module('MyApp', ["ngResource"]);
app.controller("ScraperCtrl", function($scope, $resource, $http) {
  var Stock = $resource("/stocks/:id", {id: "@id"}, {update: {method:"PUT"}});
  $scope.stocks = Stock.query();
  $scope.addStock = function() {
    if ($scope.newStock.ticker) {
      var temp_obj = {};
      var arr = $scope.newStock.ticker.split(',');

      for(var indx in arr) {
        temp_obj = { ticker:arr[indx].replace(/\s+/,''),
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
    $scope.stocks[0].$update({ action:"update" });

    /*create a div for throbber*/
    var div = document.createElement("div");
    div.style.cssText = "position:absolute; left:45%; top:35%; width:100px;"+
      "height:100px; margin:0 auto; background-color:rgba(255,255,255,0.5);"+
      "z-index:100;";
    div.id = "t1";
    document.body.appendChild(div);

    /*create a throbber*/
    var throb = Throbber( { color: 'grey',
                            fade: 1000,
                            size: 100,
                            strokewidth: 5 });
    throb.appendTo( document.getElementById( 't1' ));
    throb.start();

    Stock.query().$promise.then(function(result) {
      /*stop throbbing*/
      throb.stop();
      /*removing div element*/
      var elem = document.getElementById("t1");
      elem.parentElement.removeChild(elem);
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
