let news = function (){
    let initComponents = function () {            
        $("#form").on("submit", function (e){
            e.preventDefault();
            let form = document.getElementById("form");
            let formData = new FormData(form);
            let Contenido = quill.root.innerHTML;
            formData.append("Contenido", Contenido);
            $.ajax({
                method: 'POST',
                url: $urlBase + '/administracion/news/guardar',
                data: formData,
                dataType: 'JSON',
                contentType: false,
                processData: false,
                beforeSend: function (){
                    $('.has-error .help-block').remove();                
                    $('.form-group').removeClass('has-error');
                },
                success: function (response){
                    if(response.success){
                        Swal.fire({
                            title: '',
                            text: response.message,
                            type: 'success',
                            confirmButtonClass: 'btn btn-confirm mt-2'
                        }).then(function (){
                            location.href = $urlBase + "/administracion/news";
                        });
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

        $("#btnEnviar").on("click", function (e){
            
        });

        $("#btnEnviarTest").on("click", function (e){
            Swal.fire({
                title: 'Ingrese direccion de email',
                input: 'email',
                inputPlaceholder: 'Correo electronico',
                inputValidator: (value) => {
                    if(!value){
                        return "Ingrese un email valido";
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