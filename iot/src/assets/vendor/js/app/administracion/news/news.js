let news = function (){
    let initDataTable = function () {    
        let languageJSON = {};
        let languageUrl = $urlBase + "/language/datatable";
        $.getJSON(languageUrl, function (remoteLanguage){
            languageJSON = {
                emptyTable: remoteLanguage.sEmptyTable,
                info: remoteLanguage.sInfo,
                infoEmpty: remoteLanguage.sInfoEmpty,
                infoFiltered: remoteLanguage.sInfoFiltered,
                infoPostFix: remoteLanguage.sInfoPostFix,
                infoThousands: remoteLanguage.sInfoThousands,
                lengthMenu: "",
                loadingRecords: remoteLanguage.sLoadingRecords,
                processing: remoteLanguage.processing,
                search: remoteLanguage.sSearch,
                zeroRecords: remoteLanguage.sZeroRecords,
                paginate: {
                    first: remoteLanguage.sFirst,
                    last: remoteLanguage.sLast,
                    previous: "<i class='mdi mdi-chevron-left'>",
                    next: "<i class='mdi mdi-chevron-right'>"
                },
                aria: {
                    sortAscending: remoteLanguage.sSortAscending,
                    sortDescending: remoteLanguage.sSortDescending,
                },
            };  

            let oTable = $("#news-datatable").DataTable({
                dom: `
                    <'row'<'col-sm-4 text-left'f><'col-sm-8'p>>
                    <'row'<'col-sm-12't>>
                    <'row'<'col-sm-4'i><'col-sm-8'p>>
                `,
                language: languageJSON,
                serverSide: true,
                ajax: {
                    url: $urlBase + "/administracion/news/get",
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
                    { data: "Fecha", orderable: true, className: "text-center" },
                    { data: "Titulo", orderable: true, className: "text-left" },
                    { data: "Estado", orderable: true, className: "text-center" },
                    { data: "Hab", orderable: true, className: "text-center", 
                        render: function (data, type, row){
                            if(data == 1){
                                return `<span class="badge badge-soft-success">SI</span>`;
                            }else{
                                return `<span class="badge badge-soft-danger">NO</span>`;
                            }
                        }
                    }
                ],
                columnDefs: [{
                    title: "Accion",
                    targets: 6,
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
                order: [[5, "asc"]],
                drawCallback: function() {
                    $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
                },
                info: true
            });

            $("#news-datatable tbody").on("click", "#btnEditar, #btnEliminar", function (){
                let oTable = $("#news-datatable").DataTable();
                var data = oTable.row($(this).parents('tr')).data();
                
                if(this.id == "btnEditar"){
                    location.href = $urlBase + "/administracion/news/edicion/" + data.id;
                }

                if(this.id == "btnEliminar"){
                    Swal.fire({
                        title: "Confirmacion",
                        text: "Seguro que desea eliminar este mensaje " + data.id,
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
                                url: $urlBase + "/administracion/news/delete/" + data.id,
                                success: function (response){
                                    if(response.success){
                                        Swal.fire({
                                            title: '',
                                            text: response.message,
                                            type: 'success',
                                            confirmButtonClass: 'btn btn-confirm mt-2'
                                        });
                                        $("#news-datatable").DataTable().draw();                    
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

        });    

        $("#btnNuevo").on("click", function (e){
            location.href = $urlBase + "/administracion/news/alta";
        });

    }
    return {
        init: function () {
            initDataTable();
        }
    }
}();