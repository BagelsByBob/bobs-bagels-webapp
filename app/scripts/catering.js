var catering = (function (module) {

module.ingredients = [{
"id": 23,
"name": 'plain cream cheese',
"price": "0.00"
},
{
"id": 24,
"name": 'chive cream cheese',
"price": "4.00"
},
{
"id": 25,
"name": 'tofutti cream cheese',
"price": "4.50"
},
{
"id": 26,
"name": 'salmon spread',
"price": "5.50"
}
];

  module.bagels = [{
  "id": 1,
  "bagel_type": "plain",
  "price": "0.0"
},
{
  "id": 7,
  "bagel_type": "onion",
  "price": "2.0"
},
{
  "id": 8,
  "bagel_type": "sesame seed",
  "price": "2.0"
},
{
  "id": 9,
  "bagel_type": "whole wheat",
  "price": "2.0"
},
{
  "id": 10,
  "bagel_type": "poppyseed",
  "price": "2.0"
},
{
  "id": 11,
  "bagel_type": "cinnamon raison",
  "price": "2.0"
},
{
  "id": 12,
  "bagel_type": "variety pack (all the bagels!)",
  "price": "3.0"
}
];
  module.init = function(data){
     var caterMenu = $.grep(data, function(n){
        return (n.product_type === "c");
      });
      var drinks = $.grep(data, function(n){
        return n.product_type === "d";
      });

      menu.renderBagelMenu(caterMenu, catering);
      menu.renderDrinks(drinks);
  };

  return module;

})(catering || {});
