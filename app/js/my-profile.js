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

  module.getAjax = function(user_id){
    // debugger;
        $.ajax({
          url: 'http://localhost:3000/users/' + user_id,
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
    url: 'http://localhost:3000/users/1',
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

    }; //end module.init


return module;

})(profile || {});
