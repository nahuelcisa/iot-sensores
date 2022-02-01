$(function (){

    $("#btn-ingresar").click(function (e){

        e.preventDefault();
        const formLogin = $("#form-login").serialize();

        $.ajax({
            method: 'POST',
            url: $urlBase + "/login",
            data: formLogin,
            beforeSend: function (){
                $('.has-error .help-block').remove();                
                $('.form-group').removeClass('has-error');
                $('.error-login').hide();
            },
            success: function (response){
                if(response.success){
                    location.reload();
                }else{
                    $('.error-login').show();
                    $('.error-login div').html(response.message);
                }
            },
            error: function (error){
                var res = error.responseJSON;
                if ($.isEmptyObject(res) == false) {
                    $.each(res.errors, function (key, value) {
                        $('#' + key)
                            .closest('.form-group')
                            .addClass('has-error')
                            .append('<span class="help-block"><strong>' + value + '</strong></span>');
                    });
                }
            },
            complete: function (){
                
            }
        });
    });
});