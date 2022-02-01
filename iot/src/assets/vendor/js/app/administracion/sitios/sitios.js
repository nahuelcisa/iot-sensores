let getSitiosWeb = function (){
    let url = $urlBase + "/administracion/sitios/get";
    $.ajax({
        url: url,
        method: "GET",
        data: $("#formBusqueda").serialize(),
        success: function (response){
            let tblSitiosWEB = $("#listado-sitios");
            tblSitiosWEB.html("");
            if(response.success){
                $.each(response.data, function (i, e){
                    let estado = (e.Estado=='ACTIVO')?'bg-soft-info text-info':'bg-soft-danger text-danger';
                    tblSitiosWEB.append(`<div class="card-box mb-2">
                        <div class="row align-items-center">
                            <div class="col-sm-4 col-xs-12">
                                <div class="media">
                                    <img class="d-flex align-self-center mr-3" src="../assets/images/companies/sitioweb.png" alt="Generic placeholder image" height="64">
                                    <div class="media-body">
                                        <h4 class="mt-0 mb-2 font-16">
                                            <a href="javascript:void(0);" class="text-info btnEditar" data-id="${e.idSitio}">${e.RazonSocial}</a>
                                        </h4>
                                        <p class="mb-1">${e.Url}</p>
                                        <p class="mb-0"><b>Categoria:</b> ${e.Categoria}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4 col-xs-12">
                                <div class="text-xs-center">
                                    <p class="mb-1 mt-3 mt-sm-0"><b>Vencimiento:</b></p>
                                    <p class="mb-0"><i class="mdi mdi-calendar mr-1"></i> ${e.FechaVigenciaTope}</p>
                                </div>
                            </div>
                            <div class="col-sm-2 col-xs-12">
                                <div class="text-center text-xs-center mt-3 mt-sm-0">
                                    <div class="badge font-14 ${estado} p-1">${e.Estado}</div>
                                </div>
                            </div>
                            <div class="col-sm-2 col-xs-12">
                                <div class="text-sm-right text-xs-center">
                                    <a href="javascript:void(0);" class="action-icon btnEditar" data-id="${e.idSitio}"> 
                                        <i class="mdi mdi-square-edit-outline"></i>
                                    </a>
                                    <a href="javascript:void(0);" class="action-icon"> 
                                        <i class="mdi mdi-delete"></i>
                                    </a>
                                    <a href="${e.Url}" target="_blank" class="action-icon"> 
                                        <i class="mdi mdi-web"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>`);
                });

                $(".btnEditar").on("click", function (e){
                    let idSitio = $(this).data("id");
                    location.href = $urlBase + "/administracion/sitios/edicion/" + idSitio;
                });

            }else{
                tblSitiosWEB.append(`<div class="alert alert-danger text-center">
                    No se encontraron sitios.
                </div>`);
            }
        }
    });
}

let sitios = function (){
    let initSitios = function () {
        getSitiosWeb();
        $("#txtPalabraClave").on("keyup", function (e){
            let txtPalabraClave = $(this).val();
            if(txtPalabraClave.length != ""){
                $("#listado-sitios").html("");
                $("#listado-loader").show();
                clearTimeout($.data(this, 'timer'));
                var wait = setTimeout(function(){
                    getSitiosWeb();
                    $("#listado-loader").hide();
                }, 500);
                $(this).data('timer', wait);
            }
        });
    
        $("#cboEstado").on("change", function (e){
            $("#listado-sitios").html("");
            $("#listado-loader").show();
            clearTimeout($.data(this, 'timer'));
            var wait = setTimeout(function(){
                getSitiosWeb();
                $("#listado-loader").hide();
            }, 500);
            $(this).data('timer', wait);
        });
    }
    return {
        init: function () {
            initSitios();
        }
    }
}(function (){
    
});