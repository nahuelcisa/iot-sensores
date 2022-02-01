let password = function (){
    
    let initComponents = function () {
            
        $("#form").on("submit", function (e){

            e.preventDefault();
            
            let form = document.getElementById("form");

            let formData = new FormData(form);

            $.ajax({
                method: 'POST',
                url: $urlBase + '/settings/password',
                data: formData,
                dataType: 'JSON',
                contentType: false,
                processData: false,
                beforeSend: function (){
                    $('.has-error .help-block').remove();                
                    $('.form-group').removeClass('has-error');
                    $('.error-message').hide();
                },
                success: function (response){
                    if(response.success){
                        Swal.fire({
                            title: '',
                            text: response.message,
                            type: 'success',
                            confirmButtonClass: 'btn btn-confirm mt-2'
                        }).then(function (){
                            location.href = $urlBase + "/logout";
                        });
                    }else{
                        $('.error-message').show();
                        $('.error-message div').html(response.message);
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
                }
            });

        });

    }
    return {
        init: function () {
            initComponents();
        }
    }
}();