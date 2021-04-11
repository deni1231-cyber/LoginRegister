$(document).ready(function() {

    //////// sign up and sign up div toggle ////////

    $('#signup-div').slideUp();

    $('#signin-alt').click(function() {
        $('#signin-div').slideUp();
        $('#signup-div').slideDown();
    });

    $('#signup-alt').click(function() {
        $('#signup-div').slideUp();
        $('#signin-div').slideDown();
    });


    //////// sign up form validation ////////

    var name_reg = /^[a-z A-Z]+$/;
    var email_reg = /^[a-zA-Z0-9_#$&-.!]+@[a-z]+\.[a-z]+$/;
    var password_reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])([a-zA-Z0-9_#$&-.!@]+){6,}$/;

    $('#signup-name').focusout(function() {
        var signup_name = $(this).val();
        validateName(signup_name);
     });

    function validateName(name) {
        var name_error;
        if (name == '') {
            name_error = 'Name cann\'t be empty';
        } else if (!name_reg.test(name)) {
            name_error = 'Only alphabet enter please';
        }

        if (name_error) {
            $('#name-msg').removeClass('valid-feedback').addClass('invalid-feedback').text(name_error);
            $('#signup-name').removeClass('is-valid').addClass('is-invalid');
            return false;
        } else {
            $('#name-msg').removeClass('invalid-feedback').addClass('valid-feedback').text('Valid name');
            $('#signup-name').removeClass('is-invalid').addClass('is-valid');
            return true;
        }
    }

    $('#signup-email').focusout(function() {
        var signup_email = $(this).val();
        validateEmail(signup_email);
    });

    async function validateEmail(email) {
        var email_error;
        $('#email-msg').removeClass('invalid-feedback valid-feedback').html('<i class="fas fa-spinner fa-spin"></i>');
        $('#signup-email').removeClass('is-valid is-invalid');
        if (email == '') {
            email_error = 'Email cann\'t be empty';
        } else if (!email_reg.test(email)) {
            email_error = 'Enter a valid email';
        } else {
            var data = await $.ajax({
                type: 'POST',
                url: "../app/ajax/signup.php",
                data:  {    'email': email  }
            });
            if (data == 'true') {
                email_error = 'This email already taken';
            }
        }


        $('#email-msg').html('');

        if (email_error) {
            $('#email-msg').removeClass('valid-feedback').addClass('invalid-feedback').text(email_error);
            $('#signup-email').removeClass('is-valid').addClass('is-invalid');
            return false;
        } else {
            $('#email-msg').removeClass('invalid-feedback').addClass('valid-feedback').text('Valid email');
            $('#signup-email').removeClass('is-invalid').addClass('is-valid');
            return true;
        }
    
    }

    $('#signup-password').focusout(function() {
        var signup_password = $(this).val();
        validatePassword(signup_password);
    });

    function validatePassword(password) {
        var password_error;
        if (password == '') {
            password_error = 'Password cann\'t be empty';
        } else if (password.length < 6) {
            password_error = 'At least 6 character need';
        } else if (!password_reg.test(password)) {
            password_error = 'Need capital, small letter and digit';
        }

        if (password_error) {
            $('#password-msg').removeClass('valid-feedback').addClass('invalid-feedback').text(password_error);
            $('#signup-password').removeClass('is-valid').addClass('is-invalid');
            return false;
        } else {
            $('#password-msg').removeClass('invalid-feedback').addClass('valid-feedback').text('Valid password');
            $('#signup-password').removeClass('is-invalid').addClass('is-valid');
            return true;
        }
    }

    $('#signup-confirm-password').focusout(function() {
        var signup_confirm_password = $(this).val();
        validateConfirmPassword(signup_confirm_password);
    });

    function validateConfirmPassword(confirm_password) {
        var confirm_password_error;
        if (confirm_password == '') {
            confirm_password_error = 'Confirm password cann\'t be empty';
        } else if (confirm_password.length < 6) {
            confirm_password_error = 'At least 6 character need';
        } else if (confirm_password !=  $('#signup-password').val()) {
            confirm_password_error = 'Password don\'t match';
        }

        if (confirm_password_error) {
            $('#confirm_password-msg').removeClass('valid-feedback').addClass('invalid-feedback').text(confirm_password_error);
            $('#signup-confirm-password').removeClass('is-valid').addClass('is-invalid');
            return false;
        } else {
            $('#confirm_password-msg').removeClass('invalid-feedback').addClass('valid-feedback').text('Password match');
            $('#signup-confirm-password').removeClass('is-invalid').addClass('is-valid');
            return true;
        }
    }

    
    //////// entry user to database ////////

    $('#signup-btn').click(function() {
        var name = $('#signup-name').val().trim();
        var email = $('#signup-email').val().trim();
        var password = $('#signup-password').val().trim();
        var confirm_password = $('#signup-confirm-password').val().trim();

        validateEmail(email).then(result => {
            (async function login() {
                if (result && validateName(name) && validatePassword(password) && validateConfirmPassword(confirm_password)) {
                    var response = await $.get("../app/ajax/signup.php?" + $('#signup-form').serialize());
                    if (response == 1) {
                        $('#registration-info').html('<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert"><span>&times;</span></button><strong>Success</strong> Registration complete!</div>');
                    } else {
                        $('#registration-info').html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert"><span>&times;</span></button><strong>Failed</strong> Something went wrong!</div>');
                    }
        
                    $('#signup-name').val('').removeClass('is-invalid is-valid');
                    $('#signup-email').val('').removeClass('is-invalid is-valid');
                    $('#signup-password').val('').removeClass('is-invalid is-valid');
                    $('#signup-confirm-password').val('').removeClass('is-invalid is-valid');
        
                    $('#name-msg').text('');
                    $('#email-msg').text('');
                    $('#password-msg').text('');
                    $('#confirm_password-msg').text('');
                }
            })()
        });

        
    });

    
    //////// sign in form ////////

    $('#signin-email').focusout(function() {
        var signin_email = $(this).val();
        emailExist(signin_email);
    });

    async function emailExist(email) {
        var email_error;

        $('#email-msg-in').removeClass('invalid-feedback valid-feedback').html('<i class="fas fa-spinner fa-spin"></i>');

        if (email == '') {
            email_error = "Email cann't be empty";
        } else {
            var data = await $.ajax({
                type: 'POST',
                url: "../app/ajax/signin.php",
                data:  {    'email': email  }
            });

            if (data == 'false') {
                email_error = "This email isn't exist";
            }
        }
        

        $('#email-msg-in').html('');

        if (email_error) {
            $('#email-msg-in').removeClass('valid-feedback').addClass('invalid-feedback').text(email_error);
            $('#signin-email').removeClass('is-valid').addClass('is-invalid');
            return false;            
        } else {
            $('#email-msg-in').removeClass('invalid-feedback').addClass('valid-feedback').text('Email exist');
            $('#signin-email').removeClass('is-invalid').addClass('is-valid');
            return true;
        }
    }

    $('#signin-password').focusout(function() {
        var signin_password = $(this).val();
        checkPassword(signin_password);
    });

    function checkPassword(password) {
        var password_error;
        if (password == '') {
            password_error = 'Password cann\'t be empty';
        } else if (password.length < 6) {
            password_error = 'At least 6 character need';
        } else if (!password_reg.test(password)) {
            password_error = 'Need capital, small letter and digit';
        }

        if (password_error) {
            $('#password-msg-in').removeClass('valid-feedback').addClass('invalid-feedback').text(password_error);
            $('#signin-password').removeClass('is-valid').addClass('is-invalid');
            return false;
        } else {
            $('#password-msg-in').removeClass('invalid-feedback').text('');
            $('#signin-password').removeClass('is-invalid');
            return true;
        }
    }


    $('#signin-btn').click(function() {
        var email = $('#signin-email').val().trim();
        var password = $('#signin-password').val().trim();

        emailExist(email).then(result =>{
            
            if (result && checkPassword(password)) {
                (async function login() {
                    var response = await $.get("../app/ajax/signin.php?" + $('#signin-form').serialize());

                    if (response) {
                        window.location = '/public/profile.php';
                    } else {
                        $('#password-msg-in').removeClass('valid-feedback').addClass('invalid-feedback').text('Password wrong!');
                        $('#signin-password').removeClass('is-valid').addClass('is-invalid');
                    }
                })()
               }
        
        });
    });

    $('#update-name').click(function() {
        $('#inputModal').modal('show');
        $('#input-modal-title').text('Update Name');
        $('#modal-input').val($('#name').text());
        $('#error-msg').text('');

        $('#input-btn').click(async function() {
            var name = $('#modal-input').val().trim();
            if (name == '') {
                $('#error-msg').text('Name cann\'t be empty');
            } else {
                $('#error-msg').text('');
                var response = await $.post("../app/ajax/profile.php", { 'name': name });
                if (response == 1) {
                    $('#inputModal').modal('hide');
                    $('#name').text(name);
                } else {
                    $('#error-msg').text('Failed! try again.');
                }
            }
        });
    });

    $('#update-about').click(function() {
        $('#textModal').modal('show');
        $('#text-area').val($('#about').text());
        $('#error-msg-text').text('');

        $('#text-btn').click(async function() {
            var about = $('#text-area').val().trim();
            var response = await $.post("../app/ajax/profile.php", { 'about': about });
                if (response == 1) {
                    $('#textModal').modal('hide');
                    $('#about').text(about);
                } else {
                    $('#error-msg-text').text('Failed! try again.');
                }
        });
    });

    $('#update-phone').click(function() {
        $('#inputModal').modal('show');
        $('#input-modal-title').text('Update Phone no');
        $('#modal-input').val($('#phone').text());
        $('#error-msg').text('');

        $('#input-btn').click(async function() {
            var phone = $('#modal-input').val().trim();

            var response = await $.post("../app/ajax/profile.php", { 'phone': phone });
            if (response == 1) {
                $('#inputModal').modal('hide');
                $('#phone').text(phone);
            } else {
                $('#error-msg').text('Failed! try again.');
            }
        });
    });

    $('#update-fb').click(function() {
        $('#inputModal').modal('show');
        $('#input-modal-title').text('Update Facebook link');
        $('#modal-input').val($('#fb-link').attr('href'));
        $('#error-msg').text('');

        $('#input-btn').click(async function() {
            var link = $('#modal-input').val().trim();
            
            var response = await $.post("../app/ajax/profile.php", { 'fb_link': link });
            if (response == 1) {
                $('#inputModal').modal('hide');
                $('#fb-link').attr('href', link);
            } else {
                $('#error-msg').text('Failed! try again.');
            }
        });
    });

    $('#update-twitter').click(function() {
        $('#inputModal').modal('show');
        $('#input-modal-title').text('Update Twitter link');
        $('#modal-input').val($('#twitter-link').attr('href'));
        $('#error-msg').text('');

        $('#input-btn').click(async function() {
            var link = $('#modal-input').val().trim();
            
            var response = await $.post("../app/ajax/profile.php", { 'twitter_link': link });
            if (response == 1) {
                $('#inputModal').modal('hide');
                $('#twitter-link').attr('href', link);
            } else {
                $('#error-msg').text('Failed! try again.');
            }
        });
    });
});