let getNovedades = function (){
    let url = $urlBase + "/novedades/get";
    $.ajax({
        method: 'GET',
        url: url,
        success: function (response){
            if(response.success){
                $.each(response.data, function (i, e){
                    $("#lista-novedades").append(`<div class="inbox-item p-2" onclick="getNovedadById(${e.id})">
                        <p class="inbox-item-author text-warning"><i class="mdi mdi-calendar mr-1"></i>${e.Fecha}</p>
                        <a href="javascript:void(0);" class="inbox-item-text text-custom">${e.Titulo}</a>
                    </div>`);
                });
            }
        }
    });
}

let getNovedadById = function (id){
    let url = $urlBase + "/novedades/get/" + id;
    $.ajax({
        method: 'GET',
        url: url,
        success: function (response){
            if(response.success){
                let novedad = response.data;
                $("#new-title").html(`
                    ${novedad.Titulo}
                    <span class="float-right text-small">
                        <i class="mdi mdi-calendar mr-1"></i>
                        ${novedad.Fecha}
                    </span>
                `);
                $("#new-descrip").html(novedad.Contenido);
            }
        }
    });
}

let getUltimaNovedad = function (){
    let url = $urlBase + "/novedades/last";
    $.ajax({
        method: 'GET',
        url: url,
        success: function (response){
            if(response.success){
                let novedad = response.data;
                $("#new-title").html(`
                    ${novedad.Titulo}
                    <span class="float-right text-small">
                        <i class="mdi mdi-calendar mr-1"></i>
                        ${novedad.Fecha}
                    </span>
                `);
                $("#new-descrip").html(novedad.Contenido);
            }
        }
    });
}

let novedades = function (){
    let initNovedades = function () {
        getNovedades();
        getUltimaNovedad();      
    }

    return {
        init: function () {
            initNovedades();
        }
    }
}();