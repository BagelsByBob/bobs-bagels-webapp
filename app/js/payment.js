var payment = (function (module) {

  Stripe.setPublishableKey('pk_test_H4OZUG84CRFTuQ0ffA8SQg6g');

  module.pay = function(){
    Stripe.card.createToken({
      number: $('#number').val(),
      cvc: $('#cvc').val(),
      exp_month: $('#exp-month').val(),
      exp_year: $('#exp-year').val()
      }, stripeResponseHandler);
    };

  stripeResponseHandler = function(status, response) {
    console.log(response);
    var $form = $('#payment-form');

    if (response.error) {
      // Show the errors on the form
      $form.find('.payment-errors').text(response.error.message);
      $form.find('button').prop('disabled', false);
    } else {
      // response contains id and card, which contains additional card details
      var token = response.id;
      // Insert the token into the form so it gets submitted to the server
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
      // and submit
      $form.get(0).submit();
    }
  };



  module.init = function(){
    console.log('im the payment')
    $('#content').on('click', 'button', function(){
      event.preventDefault();
      payment.pay();
    });
  };

  return module;

})(payment || {});

