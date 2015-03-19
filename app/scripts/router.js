'use strict';

var router = (function (module) {

  module.host = "http://bobs-bagels-api.herokuapp.com";

  var Router = Backbone.Router.extend({
    routes: {
      '':'home',
      'home': 'home',
      'payments': 'payments',
      'delivery-options': 'deliveryOptions',
	  'registration': 'registration',
	  'login': 'login',
      'catering': 'catering',
      'my-profile': 'myProfile',
      'order-history': 'orderHistory',
      'about': 'about',
	  'user-payments': 'userPayments',
      'cart': 'cart'
    },
    home: function(){
      $('#content').empty();
      $.ajax({
        url: module.host + "/products",
        type: 'GET'
      }).done(aLaCart.init).fail();
      cart.init();
    },
    payments: function(){
      $('#content').empty().load('partials/payment-form.html');
      order.init();
    },
    deliveryOptions: function(){
      $('#content').empty().load('partials/order-time-form.html');
      order.init();
    },
	  registration: function(){
	    $('#content').empty().load('partials/registration-form.html');
      registration.init();
	   },
     orderHistory: function(){
      profile.getOrders();
     },
	  login: function(){
		  $('#content').empty().load('partials/login-form.html');
        registration.init();
  		},
    cart: function(){
      cart.renderDetailedCart();
      cart.init();
      },
    catering: function(){
      $('#content').empty();
      $.ajax({
        url: module.host + "/products",
        type: 'GET'
      }).done(catering.init).fail();
      cart.init();
    },
	  userPayments: function(){
		  $('#content').empty().load('partials/user-payment.html');
		  order.init();
	  },

    myProfile: function(){
      $('#content').empty();
//       $.ajax({
//         url: module.host + "/users/1",
//         type: 'GET'
//       }).done().fail();
      profile.init();
    },
    about: function(){
      $('#content').empty().load('partials/about.html');
    }
  });

  module.router = new Router();

  module.backbone = function(){
    Backbone.history.start();
  };
    return module;

})(router || {});



$(document).ready(function(){
  router.backbone();
});
