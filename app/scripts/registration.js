var registration = (function (module) {

	var authToken;
	var customerId;

	module.submitRegistration = function () {
		$.ajax({
				url: 'http://bobs-bagels-api.herokuapp.com/users',
				type: 'POST',
				data: {user: {
				first_name: $('#first-name').val(),
				last_name: $('#last-name').val(),
				email: $('#email').val(),
				phone_number: $('#phone_number').val(),
				address_1: $('#address_1').val(),
				address_2: $('#address_2').val(),
				address_zipcode: $('#address_zipcode').val(),
				password: $('#password').val()}},
			}).done(registration.loginSuccess).fail(registration.acceptFailure);

		return false;
	};

	module.loginSuccess = function (userData) {
		localStorage.setItem('authToken', userData.token);
    	localStorage.setItem('customerId', userData.customer_id);
		console.log('logged in!');
		window.location.href = '/';
	};

	module.submitLogin = function (event) {
		$.ajax({
				url: 'http://bobs-bagels-api.herokuapp.com/users/sign_in',
				type: 'POST',
				data: {email: $('#email').val(), password: $('#password').val()},
			}).done(registration.loginSuccess).fail(registration.acceptFailure);

		return false;
	};

	module.setupAjaxRequests = function () {
		$.ajaxPrefilter(function (options) {
			options.headers = {};
			options.headers['AUTHORIZATION'] = "Token token=" + authToken; // this is weird
		});
	};

	module.acceptFailure = function (error) {
		if (error.status === 401) { // 401 is unauthorized
			console.log('SEND TO LOGIN SCREEN');
			window.location.href = '#/registration';
		};
	};

	module.init = function () {
		console.log('yo in the registration');
		authToken = localStorage.getItem('authToken');

		registration.setupAjaxRequests();

		$('#content').on('click', '#registration-submit', function(event){
			event.preventDefault();
			registration.submitRegistration();
		});

		$('#content').on('submit', '#login-form', function(event){
			event.preventDefault();
			registration.submitLogin();

		});
	};

	return module;

})(registration || {});
