let formReset = function (form){
    $(`#${form}`)[0].reset();
    $(`#${form} .has-error .help-block`).remove();                
    $(`#${form} .form-group`).removeClass('has-error');
}

let llenaComboBox = function (route, el, callback){
    el.empty();
    el.append("<option></option>");
    let promise = $.ajax({
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
    promise.then(function (){
        callback();
    });
}

let removerLogo = function(event, element){
    let image = element.settings.defaultFile.split("/");
    let idSitio = $("#idSitio").val();
    if(idSitio!=0){
        $.ajax({
            method: 'GET',
            url: $urlBase + '/administracion/sitios/eliminarlogo',
            data: {
                idSitio: idSitio,
                filename: image[image.length - 1]
            },
            dataType: 'JSON',
            success: function (response){ }
        });
    }
}

let removerFavicon = function(event, element){
    let image = element.settings.defaultFile.split("/");
    let idSitio = $("#idSitio").val();
    if(idSitio!=0){
        $.ajax({
            method: 'GET',
            url: $urlBase + '/administracion/sitios/eliminarfavicon',
            data: {
                idSitio: idSitio,
                filename: image[image.length - 1]
            },
            dataType: 'JSON',
            success: function (response){ }
        });
    }
}

let asignaUsuario = function (obj){
    let usuario = JSON.parse(obj);
    let usuarios = JSON.parse($("#listadoUsuarios").val());
    let existe = usuarios.findIndex((e) => {
        return e.id == usuario.id
    });

    if(existe==-1){
        usuarios.push(usuario);
        $("#listadoUsuarios").val(JSON.stringify(usuarios));
        listarUsuariosAsignados();
    }

    $("#listadoUsuarios").val(JSON.stringify(usuarios));

    $("#modalListaUsuarios").modal("hide");

}

let eliminaUsuario = function (index){
    let usuarios = JSON.parse($("#listadoUsuarios").val()); 
    usuarios.splice(index, 1);
    $("#listadoUsuarios").val(JSON.stringify(usuarios));
    listarUsuariosAsignados();
}

let listarUsuariosAsignados = function (){
    let usuarios = JSON.parse($("#listadoUsuarios").val());
    let tblUsuarios = $("#listadoUsuariosAsignados");
    tblUsuarios.html("");

    if(usuarios.length!=0){
        $.each(usuarios, function (i, e){   
            tblUsuarios.append(`<tr>
                <td class="text-center">#${e.id}</td>
                <td class="text-center">${e.NombreUsuario}</td>
                <td class="text-center">${e.Email}</td>
                <td class="text-center">
                    <a href="javascript:void(0);" onclick="eliminaUsuario(${i});" class="text-info">
                        <i class="fas fa-trash mr-1"></i>
                        Eliminar
                    </a>
                </td>
            </tr>`);
        });
    }else{
        tblUsuarios.html(`<tr>
            <td colspan="4" class="text-center">No se ha asignado a ningun usuario.</td>
        </tr>`);
    }
}

let sitios = function (){
    let initSitio = function (){
        $("#form").on("submit", function (e){
            e.preventDefault();
            let form = document.getElementById("form");
            let formData = new FormData(form);
            $.ajax({
                method: 'POST',
                url: $urlBase + '/administracion/sitios/guardar',
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
                        $("#idSitio").val(response.idSitio);
                        Swal.fire({
                            title: '',
                            text: response.message,
                            type: 'success',
                            confirmButtonClass: 'btn btn-confirm mt-2'
                        }).then(function (){
                            location.href = $urlBase + "/administracion/sitios";
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

    $("#btnTestContacto").on("click", function (e){
        let form = $("#form").serialize();
        $.ajax({
            url: $urlBase + "/administracion/sitios/test/contacto",
            method: 'POST',
            data: form,
            success: function (response){
                if(response.success){
                    Swal.fire('OK!',response.message,'success');
                }else{
                    Swal.fire('Fallo',response.message,'warning');
                }
            }
        });
    });

    $("#btnTestFtp").on("click", function (e){
        let form = $("#form").serialize();
        $.ajax({
            url: $urlBase + "/administracion/sitios/test/ftp",
            method: 'POST',
            data: form,
            success: function (response){
                if(response.success){
                    Swal.fire('OK!', response.message, 'success');
                }else{
                    Swal.fire('Fallo',response.message,'warning');
                }
            }
        });
    });

    $("#btnMostrarUsuarios").on("click", function (e){
        let url = $urlBase + "/administracion/usuarios/clientes";
        const resultListaUsuarios = $("#resultListaUsuarios");
        resultListaUsuarios.html("");
        $.get(url, function (response){
            if(response.success){
                $.each(response.data, function (i, e){
                    let obj = JSON.stringify(e).replace(/'/g, '&apos;').replace(/"/g, '&quot;');
                    resultListaUsuarios.append(`<tr>
                        <td class="text-center">${e.id}</td>
                        <td class="text-left">${e.NombreUsuario}</td>
                        <td class="text-left">${e.Email}</td>
                        <td class="text-center">
                            <a href="javascript:void(0);" onclick="asignaUsuario('${obj}')" class="text-info">
                                <i class="fas fa-plus-circle mr-1"></i>
                                Asignar usuario
                            </a>
                        </td>
                    </tr>`);
                });
            }
        });
        $("#modalListaUsuarios").modal("show");
    });

    $("#btnGeneraPassword").on("click", function (e){
        let randomKey = Math.random().toString(36).slice(-8)
        $("#Clave").val(randomKey);
    });

    $("#btnMostrarFormUsuario").on("click", function (e){
        formReset("formUsuario");
        $("#modalAltaUsuario").modal("show");
    });

    $("#formUsuario").on("submit", function (e){
        e.preventDefault();
        let form = document.getElementById("formUsuario");
        let formData = new FormData(form);
        $.ajax({
            method: 'POST',
            url: $urlBase + '/administracion/usuarios/guardar',
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
                        formReset("formUsuario");
                        $("#modalAltaUsuario").modal("hide");
                        asignaUsuario(JSON.stringify({
                            id: response.id,
                            NombreUsuario: response.NombreUsuario,
                            Email: response.Email     
                        }));
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

    return {
        init: function () {
            initSitio();    
            listarUsuariosAsignados();
            llenaComboBox($urlBase + "/categoriasitios", $("#idCategoria"));
        }
    }
}();