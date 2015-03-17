var order = (function (module) {

  module.init = function(){
    $('#content').on('click', '#delivery', function(){
      $('#delivery-add').empty().load('partials/delivery-address-form.html');
    });

    $('#content').on('click', '#pickup', function(){
      $('#delivery-add').empty();
    });

    $('#content').on('click', '#delivery-submit', function(){
      localStorage["deliveryMethod"] = $('input:radio[name=delivery-option]:checked').val();
      localStorage["orderTime"] = $('#time').val();
      localStorage["zipcode"] = $('#zipcode').val();
      localStorage["streetOne"] = $('#street-1').val();
      localStorage["streetTwo"] = $('#street-2').val();
      localStorage["phoneNumber"] = $('#phone-number').val();
		debugger;
	  if(localStorage['customerId'] != undefined) {
		  location.href = '/#/user-payments';
	  } else {
      	location.href = '/#/payments';
	  }
    });


    $('#content').on('click', '#payment-submit', function(event){
      event.preventDefault();
      $.ajaxPrefilter(function( options ) {
        options.headers = {};
        options.headers['AUTHORIZATION'] = "Token token=" + localStorage["authToken"];
      });
      $.ajax({
        url: 'http://localhost:3000/users/' + localStorage["authToken"] + '/orders',
        type: 'POST',
        data: {
//		  customer_id: localStorage["customerId"],
          order:{
            delivery_type: localStorage["deliveryMethod"],
            delivery_address_1: localStorage["streetOne"],
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
    });
  };






  return module;

})(order || {});
