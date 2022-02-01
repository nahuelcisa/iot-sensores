let llenaComboBox = function (route, el){
    el.empty();
    el.append("<option></option>");
    $.ajax({
        url: route,
        method: 'GET',
        success: function (response){
            if(response.success){
                $.each(response.data, function (i, e){
                    el.append(`<option value="${e.id}">${e.text}</option>`);
                });
            } 
        }
    });
}

let productos = function (){
    let initComponents = function () {
        $("#form").on("submit", function (e){

            e.preventDefault();
            let form = document.getElementById("form");
            let formData = new FormData(form);
            
            formData.append("Descrip", quill.root.innerHTML);

            $.ajax({
                method: 'POST',
                url: $urlBase + '/carrito/productos/guardar',
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
                            location.href = $urlBase + "/carrito/productos";
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
    }
    return {
        init: function () {
            initComponents();
            llenaComboBox($urlBase + "/categoriascarrito", $("#idCategoria"));
        }
    }
}();