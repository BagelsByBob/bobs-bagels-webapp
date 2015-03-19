var aLaCart = (function (module) {

module.ingredients = [{
"id": 1,
"name": "tomato",
"price": "0.0"
},
{
"id": 2,
"name": "cucumber",
"price": "0.0"
},
{
"id": 3,
"name": "red onions",
"price": "0.0"
},
{
"id": 4,
"name": "cole slaw",
"price": "0.0"
},
{
"id": 5,
"name": "mayo",
"price": "0.5"
},
{
"id": 6,
"name": "garlic mayo",
"price": "0.5"
},
{
"id": 7,
"name": "mustard",
"price": "0.5"
},
{
"id": 8,
"name": "spicy mustard",
"price": "0.5"
},
{
"id": 9,
"name": "plain cream cheese",
"price": "1.5"
},
{
"id": 10,
"name": "chive cream cheese",
"price": "1.5"
},
{
"id": 11,
"name": "tofutti",
"price": "2.0"
},
{
"id": 12,
"name": "salmon spread",
"price": "2.5"
},
{
"id": 13,
"name": "asiago",
"price": "0.5"
},
{
"id": 14,
"name": "provolone",
"price": "0.5"
},
{
"id": 15,
"name": "swiss",
"price": "0.5"
},
{
"id": 16,
"name": "cheddar cheese",
"price": "0.5"
},
{
"id": 17,
"name": "avocado",
"price": "2.0"
},
{
"id": 18,
"name": "sprouts",
"price": "0.5"
},
{
"id": 19,
"name": "turkey",
"price": "2.0"
},
{
"id": 20,
"name": "smoked salmon",
"price": "3.5"
},
{
"id": 21,
"name": "roast beef",
"price": "2.0"
},
{
"id": 22,
"name": "corn beef",
"price": "3.0"
}
];

module.bagels = [{
  "id": 1,
  "bagel_type": "plain",
  "price": "0.0"
},
{
  "id": 2,
  "bagel_type": "onion",
  "price": "0.5"
},
{
  "id": 3,
  "bagel_type": "sesame seed",
  "price": "0.5"
},
{
  "id": 4,
  "bagel_type": "whole wheat",
  "price": "0.5"
},
{
  "id": 5,
  "bagel_type": "poppyseed",
  "price": "0.5"
},
{
  "id": 6,
  "bagel_type": "cinnamon raison",
  "price": "0.5"
}
];

   module.init = function(data){
      var bagelMenu = $.grep(data, function(n){
        return ((n.product_type === "a") || (n.product_type === "b"));
      });
      var drinks = $.grep(data, function(n){
        return n.product_type === "d";
      });
      menu.renderBagelMenu(bagelMenu, aLaCart);
      menu.renderDrinks(drinks);
    };

  return module;

})(aLaCart || {});
