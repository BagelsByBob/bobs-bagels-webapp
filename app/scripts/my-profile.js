var profile = (function (module){

  module.handleForm = function(user_id){
      console.log('inside handleForm, user id is: ' + user_id);


      $('#edit-profile-submit').on('click',function(event){
        event.preventDefault();
        console.log('Clicked Save Profile button, user id is: ' + user_id)
        //save the form changes in getAjax()
        profile.getAjax(user_id);
      }); // end #edit-profile-submit

      $('#edit-profile-cancel').on('click',function(event){
        event.preventDefault();
        console.log('Clicked Cancel button, user id is: ' + user_id)
        $('#edit-profile-form').hide();
      }); // end #edit-profile-cancel

  }; // end module.handleForm

  module.getOrders = function(user_id){
    // debugger;
    $.ajax({
      url: 'http://bobs-bagels-api.herokuapp.com/users/' + localStorage['authToken'],
      type: 'GET',
      dataType: 'JSON'
    }).done(indexOrderHistory)
    .fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR, textStatus, errorThrown);
    }); //end $.ajax()
  };

  indexOrderHistory = function(data){
    if (data[0].orders.length < 1) {
      $('#content').html("<h1>You haven't made any orders yet.You don't know what you're missing!</h1>")
    } else {
      renderOrderHistory(data);
    };
  };

  renderOrderHistory = function(data){
    data[0].orders.forEach(function(order){
      order.cart = JSON.parse(order.cart);
      order.cart.forEach(cart.cartIngredientRender);
    });
    console.log(data);
    var template = Handlebars.compile($('#order-history-render').html());
    $('#content').html(template({
      orderHistory: data
    }));
  };

  module.getAjax = function(user_id){
        $.ajax({
          // url: 'http://bobs-bagels-api.herokuapp.com/users/' + localStorage['authToken'],
          url: 'http://bobs-bagels-api.herokuapp.com/users/' + user_id,
          type: 'PATCH',
          dataType: 'JSON',
          data:
          { user: {
              first_name: $('#user-first-name-field').val(),
              last_name: $('#user-last-name-field').val(),
              email: $('#user-email-field').val(),
              phone_number: $('#user-phone-field').val(),
              address_1: $('#user-address-1-field').val(),
              address_2: $('#user-address-2-field').val(),
              address_zipcode: $('#user-zipcode-field').val()
          }
        }
        }).done(function(data){
          console.log(data);

          //reset the user data w/ the newly changed data
          profile.init();

        }).fail(function(jqXHR, textStatus, errorThrown){
          console.log(jqXHR, textStatus, errorThrown);
        }); //end $.ajax()
  }; //end module.getAjax


 module.init = function(){
    $.ajax({
    url: 'http://bobs-bagels-api.herokuapp.com/users/' + localStorage['authToken'],
    type: 'GET',
    dataType: 'JSON'
    })
    .done(function(data) {
      console.log(data);
      var template = Handlebars.compile($('#user_profile_template').html());
      $("#content").html(template({
          user: data //send user data to handlebars template
        }));

      //hide EDIT PROFILE FORM on initial load
      $('#edit-profile-form').hide();

      //get id of user when EDIT PROFILE button is clicked
      $(".edit-profile").on('click', function(event){

      //get the id of this user when Edit Profile button is clicked
      var user_id = $(this).attr("id").replace('edit-profile-b-', '');
      console.log("EDIT PROFILE clicked, user id is: " + user_id);

  // debugger;
        $('#edit-profile-form').toggle();

        profile.handleForm(user_id);

        });
      }).fail(function(jqXHR, textStatus, errorThrow) {
        console.log(jqXHR, textStatus, errorThrow);
      });
	 profile.getCustomerInfo();
    }; //end module.init

	module.renderUserPaymentInfo = function (response) {
		var responseToString = JSON.stringify(response);
		response = responseToString.replace(/\s/g, "_");
		response = JSON.parse(responseToString);
		
		var cardInfo = response.data
		var template = Handlebars.compile($('#user-pay-render').html());
		$('#content').append(template({
			data: cardInfo,
			id: cardInfo.id,
			name: cardInfo.name,
			address_city: cardInfo.address_city,
			address_country: cardInfo.address_country,
			address_line1: cardInfo.address_line1,
			address_line2: cardInfo.address_line2,
			address_zip: cardInfo.address_zip,
			brand: cardInfo.brand,
			exp_month: cardInfo.exp_month,
			exp_year: cardInfo.exp_year,
			type: cardInfo.funding,
			last4: cardInfo.last4
		}));
	};

	module.getCustomerInfo = function () {
		$.ajax({
			url: 'http://bobs-bagels-api.herokuapp.com/users/retrieve_card',
			type: 'POST',
			data: {
				user: {
					token: localStorage['authToken']
				}
			}
		}).done(function (response) {
			console.log(response);
//			payment.getReturnCustomerStatus(response);
			profile.renderUserPaymentInfo(response);
		}).fail(function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR, textStatus, errorThrown);
		});
	};
	
	
return module;

})(profile || {});
