let blog = function (){
    let initDataTable = function () {
        let oTable = $("#blog-datatable").DataTable({
            dom: `
                <'row'<'col-sm-4 text-left'f><'col-sm-8'p>>
                <'row'<'col-sm-12't>>
                <'row'<'col-sm-4'i><'col-sm-8'p>>
            `,
            language: {
                url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
            },
            serverSide: true,
            ajax: {
                url: $urlBase + "/blog/publicaciones/get",
                dataType: "json"
            },
            pageLength: 50,
            columns: [{
                data: "id",
                orderable: false,
                    render: function(data, type, row, meta) {
                        if (type === "display") {
                            data = `<div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input dt-checkboxes">
                                    <label class="custom-control-label">&nbsp;</label>
                                </div>`;
                        }
                        return data;
                    },
                    checkboxes: {
                        selectRow: true,
                        selectAllRender: `<div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input dt-checkboxes">
                                <label class="custom-control-label">&nbsp;</label>
                        </div>`
                    }
                },
                { data: "Titulo", orderable: true, className: "text-left" },
                { data: "Categoria", orderable: true, className: "text-left" },
                { data: "Fecha", orderable: true, className: "text-center" },
                { data: "Hab", orderable: true, className: "text-center", 
                    render: function (data, type, row){
                        if(data == 'SI'){
                            return `<span class="badge badge-soft-success">${data}</span>`;
                        }else{
                            return `<span class="badge badge-soft-danger">${data}</span>`;
                        }
                    }
                }
            ],
            columnDefs: [{
                title: "Accion",
                targets: 5,
                data: null,
                className: "text-center",
                defaultContent: `<div>
                    <a href="javascript:void(0);" class="action-icon" id="btnEditar">
                        <i class="mdi mdi-square-edit-outline"></i>
                    </a>
                    <a href="javascript:void(0);" class="action-icon" id="btnEliminar">
                        <i class="mdi mdi-delete"></i>
                    </a>
                    <a href="javascript:void(0);" class="action-icon" id="btnVer">
                        <i class="mdi mdi-eye"></i>
                    </a>
                </div>`
            }],
            select: {
                style: "multi"
            },
            order: [[5, "asc"]],
            drawCallback: function() {
                $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
            },
            info: true
        });

        $("#blog-datatable tbody").on("click", "#btnEditar, #btnEliminar, #btnVer", function (){
            
            let oTable = $("#blog-datatable").DataTable();
            var data = oTable.row($(this).parents('tr')).data();
            
            if(this.id == "btnEditar"){
                location.href = $urlBase + "/blog/publicaciones/edicion/" + data.id;
            }

            if(this.id == "btnEliminar"){
                Swal.fire({
                    title: "Confirmacion",
                    text: "Seguro que desea eliminar el articulo " + data.id,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "SI",
                    cancelButtonText: "NO"
                  }).then(function (result) {
                    if (result.value) {
                        $.ajax({
                            method: 'GET',
                            url: $urlBase + "/blog/publicaciones/delete/" + data.id,
                            success: function (response){
                                if(response.success){
                                    Swal.fire({
                                        title: '',
                                        text: response.message,
                                        type: 'success',
                                        confirmButtonClass: 'btn btn-confirm mt-2'
                                    });
                                    $("#blog-datatable").DataTable().draw();                    
                                }
                            }
                        });
                    }
                });
            }

            if(this.id == "btnVer"){
                console.log(data);
            }

        });

        $("#btnActivar").on("click", function (e){
            
            let rows = $("#blog-datatable").DataTable().column(0).checkboxes.selected();
            let articulos = [];

            $.each(rows, function (i, e){
                articulos.push(e);
            });

            if(articulos.length!=0){
                $.ajax({
                    method: 'GET',
                    url: $urlBase + "/blog/publicaciones/activar",
                    data: {
                        id: articulos
                    },
                    success: function (response){
                        if(response.success){
                            Swal.fire({
                                title: '',
                                text: response.message,
                                type: 'success',
                                confirmButtonClass: 'btn btn-confirm mt-2'
                            });
                            $("#blog-datatable").DataTable().draw();                    
                        }
                    }
                });
            }else{
                Swal.fire({
                    title: '',
                    text: 'Debe seleccionar al menos un articulo',
                    type: 'warning',
                    confirmButtonClass: 'btn btn-confirm mt-2'
                });
            }
        });

        $("#btnDesactivar").on("click", function (e){
            let rows = $("#blog-datatable").DataTable().column(0).checkboxes.selected();
            let articulos = [];

            $.each(rows, function (i, e){
                articulos.push(e);
            });

            if(articulos.length!=0){
                $.ajax({
                    method: 'GET',
                    url: $urlBase + "/blog/publicaciones/desactivar",
                    data: {
                        id: articulos
                    },
                    success: function (response){
                        if(response.success){
                            Swal.fire({
                                title: '',
                                text: response.message,
                                type: 'success',
                                confirmButtonClass: 'btn btn-confirm mt-2'
                            });
                            $("#blog-datatable").DataTable().draw();                    
                        }
                    }
                });
            }else{
                Swal.fire({
                    title: '',
                    text: 'Debe seleccionar al menos un articulo',
                    type: 'warning',
                    confirmButtonClass: 'btn btn-confirm mt-2'
                });
            }
        });

        $("#btnNuevo").on("click", function (e){

            location.href = $urlBase + "/blog/publicaciones/alta";

        });

    }
    return {
        init: function () {
            initDataTable();
        }
    }
}();