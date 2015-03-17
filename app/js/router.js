'use strict';

var router = (function (module) {

  module.host = "http://localhost:3000";
  var Router = Backbone.Router.extend({
    routes: {
      '':'home',
      'home': 'home',
      'payments': 'payments',
	  'user-payments': 'userPayments',
      'delivery-options': 'deliveryOptions',
	    'registration': 'registration',
	    'login': 'login',
      'catering': 'catering',
      'my-profile': 'myProfile',
      'about': 'about',
    },
    home: function(){
      $('#content').empty();
      $.ajax({
        url: module.host + "/products",
        type: 'GET'
      }).done(menu.init).fail();
      cart.init();
    },
    payments: function(){
      $('#content').empty().load('partials/payment-form.html');
      order.init();
    },
	userPayments: function(){
		$('#content').empty().load('partials/user-payment.html');
		payment.init();
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
	  login: function(){
		  $('#content').empty().load('partials/login-form.html');
        registration.init();
  		},
    catering: function(){
      $('#content').empty();
      $.ajax({
        url: module.host + "/products",
        type: 'GET'
      }).done(menu.renderCaterMenu).fail();
      cart.init();
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
      $('#content').empty().load('partials/about.html');;
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
