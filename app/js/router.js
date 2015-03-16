'use strict';

var router = (function (module) {

  module.host = "http://localhost:3000";

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
      'about': 'about',
//	  'store-payment-info': 'storePaymentInfo'
    },
    home: function(){
      $('#content').empty();
      $.ajax({
        url: module.host + "/products",
        type: 'GET'
      }).done(menu.renderMenu).fail();
      cart.init();
    },
    payments: function(){
      $('#content').empty().load('partials/payment-form.html');
      payment.init();
    },
    deliveryOptions: function(){
      $('#content').empty().load('partials/order-time-form.html');
      delivery.init();
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
//	storePaymentInfo: function(){
//		$('#content').empty().load('partials/store-payment-info-confirmation.html');
//		storePaymentInfo.init();
//	},
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
