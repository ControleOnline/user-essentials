define('user-default-create-account', ['jquery', 'jquery-form-validator'], function () {
    var user = {};
    user.init = function () {
        $('#login-form').submit(function (e) {
            e.preventDefault();
            if ($(this).isValid()) {
                $.ajax({
                    url: $(this).attr('action') + '.json',
                    data: $(this).serialize(),
                    method: 'POST',
                    dataType: 'json',
                    global: false,
                    success: function (data) {
                        $('#wait-modal').modal('hide');
                        if (data.response && data.response.success) {
                            window.location.href = $('#login-form').data('success-url') ? $('#login-form').data('success-url') : '/';
                        }
                    }
                });
            }
        });
        $('#username').blur(function () {
            var userField = $(this);
            if (userField.val()) {
                $.ajax({
                    url: userField.data('user-in-use') + userField.val() + '.json',
                    method: 'GET',
                    dataType: 'json',
                    global: false,
                    success: function (data) {
                    },
                    complete: function (data) {
                        if (typeof data === 'object' && data.responseJSON) {
                            var data = JSON.parse(data.responseText);
                            if (data.response && data.response.success) {
                                console.log('Pode usar');
                            } else {
                                console.log('User já existe');
                            }
                        }
                        $('.ajax-spin-username').remove();
                        $(userField).prop("disabled", false);


                    },
                    beforeSend: function () {
                        $(userField).before('<i class="ajax-spin-username ajax-spin-input ajax-spin fa fa-spinner fa-spin"></i>');
                        $(userField).prop("disabled", true);
                    },
                    error: function () {

                    }
                });
            }
        });
    };
    return user;
});
