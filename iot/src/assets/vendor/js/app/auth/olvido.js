$(function (){

    $("#btn-recuperar").click(function (e){

        e.preventDefault();
        const formOlvido = $("#form-olvido").serialize();

        $.ajax({
            method: 'POST',
            url: $urlBase + "/olvido",
            data: formOlvido,
            beforeSend: function (){
                $('.has-error .help-block').remove();                
                $('.form-group').removeClass('has-error');
                $('.error-login').hide();
            },
            success: function (response){
                if(response.success){
                    location.href = $urlBase + "/confirma/" + response.id;
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