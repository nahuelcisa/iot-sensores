let stringToSlug = function (str) {
    str = str.replace(/^\s+|\s+$/g, ""); 
    str = str.toLowerCase();
  
    var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaaeeeeiiiioooouuuunc------";
  
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }
  
    str = str
      .replace(/[^a-z0-9 -]/g, "") 
      .replace(/\s+/g, "-") 
      .replace(/-+/g, "-"); 
  
    return str;
}

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

let blog = function (){
    let initComponents = function () {            
        $("#form").on("submit", function (e){
            e.preventDefault();
            let form = document.getElementById("form");
            let formData = new FormData(form);
            let Contenido = quill.root.innerHTML;
            formData.append("Contenido", Contenido);

            $.ajax({
                method: 'POST',
                url: $urlBase + '/blog/publicaciones/guardar',
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
                            location.href = $urlBase + "/blog/publicaciones";
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

        $("#Titulo").on("keyup", function (e){

            let slug = stringToSlug($(this).val());

            $("#Slug").val(slug);

        });

    }
    return {
        init: function () {
            initComponents();
            llenaComboBox($urlBase + "/categoriasblog", $("#idCategoria"));
        }
    }
}();