var order = (function (module) {
  module.zips = ["02210", "02108", "02109", "02110", "02111", "02113", "02203", "02114", "02115", "02116", "02134", "02135", "02138", "02139", "02140", "02141", "02142", "02143", "02144", "02145", "02446"]

  $.ajaxPrefilter(function( options ) {
        options.headers = {};
        options.headers['AUTHORIZATION'] = "Token token=" + localStorage["authToken"];
      });

  var submitDeliveryInfo = function(){
      localStorage["deliveryMethod"] = $('input:radio[name=delivery-option]:checked').val();
      localStorage["orderTime"] = $('#time').val();
      localStorage["zipcode"] = $('#zipcode').val();
      localStorage["streetOne"] = $('#street-1').val();
      localStorage["streetTwo"] = $('#street-2').val();
      localStorage["phoneNumber"] = $('#phone-number').val();
	  if(localStorage['customerId'] != undefined) {
		location.href = '/#/user-payments';
	  } else {
      	location.href = '/#/payments';
	  }
  };

  var loginValidation = function(){
    var $form = $('#payment-form');
    if (localStorage["authToken"] === undefined ) {
      $form.find('.payment-errors').text("You must be logged in to make a purchase");
    } else {
      addressValidation();
    };
  };
	
  var addressValidation = function(){
    payment.card_pay();
  };

  var submitOrder = function(){

    $.ajaxPrefilter(function( options ) {
        options.headers = {};
        options.headers['AUTHORIZATION'] = "Token token=" + localStorage["authToken"];
      });

    $.ajax({
      url: 'http://localhost:3000/users/' + localStorage["authToken"] + '/orders',
      type: 'POST',
      data: {
        order:{
          delivery_type: localStorage["deliveryMethod"],
          delivery_address_1: localStorage["streetOne"],
          delivery_address_zipcode: localStorage["zipcode"],
          delivery_address_2: localStorage["streetTwo"],
          delivery_phone:  localStorage["phoneNumber"],
          cart: localStorage['cart']
        }
      }
    }).done(function(data){
      console.log(data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  module.init = function(){
    $('#content').on('click', '#delivery', function(){
      $('#delivery-add').empty().load('partials/delivery-address-form.html');
    });

    $('#content').on('click', '#pickup', function(){
      $('#delivery-add').empty();
    });

    $('#content').on('click', '#delivery-submit', function(){
      submitDeliveryInfo();
    });

    $('#content').on('click', '#payment-submit', function(event){
      event.preventDefault();
      loginValidation();
    });
  };

  return module;

})(order || {});
