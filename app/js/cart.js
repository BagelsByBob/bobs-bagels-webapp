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
    orderItem['ingredients'] = $("form#" + menuItem + " input[type=checkbox]:checked").map(function() {
      return this.value;
    }).get();
    orderItem['bagel'] = $("form#" + menuItem + ' input:radio[name=bagel]:checked').val();
    localStorage['count'] = JSON.stringify(count);
    return orderItem;
  };

  var renderCart = function(){
      var data = JSON.parse(localStorage['cart']);
      var template = Handlebars.compile($('#cart-render').html());
      $('#cart').html(template({
      orderItem: data,
    }));
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
    renderCart();
  	};


  var removeItem = function(item){
    var items = JSON.parse(localStorage["cart"]);
    items = $.grep(items, function(n){
     return n.id != item.val();
    });
    localStorage.setItem('cart', JSON.stringify(items));
    renderCart();
  };

  module.init = function(){

    $('#content').on('submit', 'form', function(){
      addItem($(this));
    });

    $('#cart').on('click', 'button', function(){
      removeItem($(this));
    });

    emptyCartNormalize();
    renderCart();
  };

  return module;

})(cart || {});
