var cart = (function (module) {

  var buildOrderItem = function(item){
    var orderItem = {};
    var menuItem = item.attr('id');
    var count = JSON.parse(localStorage['count']);
    count += 1;
    orderItem['product_id'] = menuItem;
    orderItem['quantity'] = parseInt($('#' + menuItem +'quantity').val());
    orderItem['name'] = $('#' + menuItem +'name').text();
    orderItem['comments'] = $('#' + menuItem +'comments').val();
	  orderItem['price'] = $('#' + menuItem + 'price').text();
    orderItem['id'] = count;
    orderItem['description'] = $('#' + menuItem + 'description').text();
    orderItem['ingredients'] = $("form#" + menuItem + " input[type=checkbox]:checked").map(function() {
      return this.value;
    }).get();
    orderItem['bagel'] = $("form#" + menuItem + ' input:radio[name=bagel]:checked').val();
    localStorage['count'] = JSON.stringify(count);
    return orderItem;
  };

  renderNavCart = function(){
      var data = JSON.parse(localStorage['cart']);
      data = calcCart(data);
      var template = Handlebars.compile($('#cart-render').html());
      $('#cart').html(template({
      cart: data,
    }));
  };

  module.cartIngredientRender = function(item, module){
    debugger;
    var ingredients = $.grep(module.ingredients, function(n){
     return item.ingredients.indexOf(n.id.toString()) > -1
    });
    item.ingredients = ingredients;
  };

  module.renderDetailedCart = function(){
      var data = JSON.parse(localStorage['cart']);
      if (data.length < 1){
        $('#content').html("<h3>You haven't added anything to your cart yet. Get shopping you cheapskate!</h3>");
      } else {
        data.forEach(cart.cartIngredientRender);
        var template = Handlebars.compile($('#detailed-cart-render').html());
        $('#content').html(template({
        orderItem: data,
      }));
    };
  };

  var makeNum = function(price){
    return Number(price.substring(1, price.length));
  };

  var calcItemTotal = function(item){
    return makeNum(item.price) * item.quantity
  };

  module.cartReset = function(){
    localStorage.removeItem('cart');
    localStorage.setItem('cart', "[]");
    renderNavCart();
  };

  var calcCart = function(data){
    var total = 0;
    var cart = { total: 0, quantity: 0};
    data.forEach(function(item){
      cart['total'] = cart['total'] + calcItemTotal(item);
      cart['quantity'] = cart['quantity'] + item.quantity;
    });

    return cart;
  };

  var emptyCartNormalize = function(){
    if (localStorage['cart'] === undefined) {
      localStorage.setItem('cart', "[]");
    };
    if (localStorage['count'] === undefined) {
      localStorage.setItem('count', "0");
    };
  };

  var addItem = function(item){
    var orderItem = buildOrderItem(item);
    var items = JSON.parse(localStorage["cart"]);
	  // if the orderItem has the same name as a menuItem than add to the menuItem's quantity
    items.push(orderItem);
	  localStorage.setItem('cart', JSON.stringify(items));
    renderNavCart();
  	};


  var removeItem = function(item){
    var items = JSON.parse(localStorage["cart"]);
    items = $.grep(items, function(n){
     return n.id != item.val();
    });
    localStorage.setItem('cart', JSON.stringify(items));
    renderNavCart();
    cart.renderDetailedCart();
  };

  module.init = function(){

    $('#content').off().on('submit', 'form', function(event){
      event.preventDefault();
      addItem($(this));
    });

    $('#content').on('click', '.remove-cart', function(event){
      event.preventDefault();
      removeItem($(this));
    });

    emptyCartNormalize();
    renderNavCart();
  };

  return module;

})(cart || {});
