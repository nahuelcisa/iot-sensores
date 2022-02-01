let llenaComboBox = function (route, el){
    el.empty();
    el.append("<option value='-1'>Ver todas</option>");
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

let listadoProductos = function () {
    const listadoProductos = $("#listado-productos");
    listadoProductos.html("");
    let url = $urlBase + "/carrito/productos/get";
    $.ajax({
        url: url,
        method: 'GET',
        data: $("#formBusqueda").serialize(),
        success: function (response){
            if(response.success){
                let imagenPrincipal = "";
                let estadoPublicacion = "";
                $.each(response.data, function (i, e){                    
                    if(e.ImagenPrincipal == 0){
                        imagenPrincipal = `${$urlBase}/sin-imagen.jpg`;
                    }else{
                        imagenPrincipal = `${$urlBase}/productos/${e.idSitio}/${e.ImagenPrincipal}`;
                    }

                    if(e.Hab == 1){
                        estadoPublicacion = `<div class="badge font-14 bg-soft-info text-info p-1">ACTIVO</div>`;
                    }else{
                        estadoPublicacion = `<div class="badge font-14 bg-soft-danger text-danger p-1">INACTIVO</div>`;
                    }
                    listadoProductos.append(`<div class="card-box mb-2">
                        <div class="row align-items-center">
                            <div class="col-sm-5">
                                <div class="media">
                                    <img class="d-flex align-self-center mr-3 rounded-circle" src="${imagenPrincipal}" width="90" height="90">
                                    <div class="media-body">
                                        <h4 class="mt-0 mb-2 font-16">
                                            <a href="${$urlBase}/carrito/productos/edicion/${e.id}" class="text-info">${e.Nombre}</a>
                                        </h4>
                                        <p class="mb-1"><b>Categoria:</b> ${e.Categoria}</p>
                                        <p class="mb-0"><b>Precio Venta:</b> ${e.PrecioVenta}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <p class="mb-1 mt-3 mt-sm-0"><b>Stock: </b>${e.Stock}</p>
                                
                            </div>
                            <div class="col-sm-1">
                                <div class="text-center mt-3 mt-sm-0">
                                    ${estadoPublicacion}
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="text-sm-right">
                                    <a href="${$urlBase}/carrito/productos/edicion/${e.id}" class="action-icon"> 
                                        <i class="mdi mdi-square-edit-outline"></i>
                                    </a>
                                    <a href="javascript:void(0);" class="action-icon"> <i class="mdi mdi-delete"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>`);
                });
            }
        }
    });
}

let productos = function (){
    let initProductos = function () {
        listadoProductos();
        $("#btnNuevo").on("click", function (e){
            location.href = $urlBase + "/carrito/productos/agregar";
        });

        $("#txtPalabraClave").on("keyup", function (e){
            let txtPalabraClave = $(this).val();
            if(txtPalabraClave.length != ""){
                $("#listado-productos").html("");
                $("#listado-loader").show();
                clearTimeout($.data(this, 'timer'));
                var wait = setTimeout(function(){
                    listadoProductos();
                    $("#listado-loader").hide();
                }, 500);
                $(this).data('timer', wait);
            }
        });
    
        $("#idCategoria").on("change", function (e){
            $("#listado-productos").html("");
            $("#listado-loader").show();
            clearTimeout($.data(this, 'timer'));
            var wait = setTimeout(function(){
                listadoProductos();
                $("#listado-loader").hide();
            }, 500);
            $(this).data('timer', wait);
        });
    }
    return {
        init: function () {
            initProductos();
            llenaComboBox($urlBase + "/categoriascarrito", $("#idCategoria"));
        }
    }
}();