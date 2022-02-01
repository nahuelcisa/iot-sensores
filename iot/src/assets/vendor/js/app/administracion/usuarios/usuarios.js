let usuarios = function (){
    let initDataTable = function () {
        let oTable = $("#usuarios-datatable").DataTable({
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
                url: $urlBase + "/administracion/usuarios/get",
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
                { data: "id", orderable: true, className: "text-left" },
                { data: "NombreUsuario", orderable: true, className: "text-left" },
                { data: "Email", orderable: true, className: "text-left" },
                { data: "Rol", orderable: true, className: "text-left" }
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
                </div>`
            }],
            select: {
                style: "multi"
            },
            order: [[1, "asc"]],
            drawCallback: function() {
                $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
            },
            info: true
        });

        $("#usuarios-datatable tbody").on("click", "#btnEditar, #btnEliminar, #btnVer", function (){
            
            let oTable = $("#usuarios-datatable").DataTable();
            var data = oTable.row($(this).parents('tr')).data();
            
            if(this.id == "btnEditar"){
                location.href = $urlBase + "/administracion/usuarios/edicion/" + data.id;
            }

            if(this.id == "btnEliminar"){
                Swal.fire({
                    title: "Confirmacion",
                    text: "Seguro que desea eliminar el usuario: " + data.id,
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
                            url: $urlBase + "/administracion/usuarios/delete/" + data.id,
                            success: function (response){
                                if(response.success){
                                    Swal.fire({
                                        title: '',
                                        text: response.message,
                                        type: 'success',
                                        confirmButtonClass: 'btn btn-confirm mt-2'
                                    });
                                    $("#usuarios-datatable").DataTable().draw();                    
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

        $("#btnNuevo").on("click", function (e){
            location.href = $urlBase + "/administracion/usuarios/alta";
        });
    }
    return {
        init: function () {
            initDataTable();
        }
    }
}();