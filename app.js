(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController (ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.MoveToBought = function (itemIndex) {
      ShoppingListCheckOffService.MoveToBought(itemIndex);
    };

    toBuy.itemsLeft = function () {
      return ShoppingListCheckOffService.ItemsToBuyLeft();
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController (ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();

    bought.BoughtAnything = function () {
      return ShoppingListCheckOffService.BoughtAnything();
    }
  }
  
  function ShoppingListCheckOffService () {
    var service = this;

    var toBuyItems = [
      {
        name: 'cookies',
        quantity: 10
      },
      {
        name: 'sugary drinks',
        quantity: 5
      },
      {
        name: 'chips',
        quantity: 3
      },
      {
        name: 'pizza',
        quantity: 1
      },
      {
        name: 'burgers',
        quantity: 4
      }
    ];

    var boughtItems = [];

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.MoveToBought = function (itemIndex) {
      var item = toBuyItems[itemIndex];
      boughtItems.push(item);
      toBuyItems.splice(itemIndex, 1);
    };

    service.ItemsToBuyLeft = function () {
      return toBuyItems.length > 0;
    };

    service.BoughtAnything = function () {
      return boughtItems.length > 0;
    };
  }

})();
