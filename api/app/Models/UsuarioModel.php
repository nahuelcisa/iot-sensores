<?php

    namespace App\Models;
    use CodeIgniter\Model;

    class UsuarioModel extends Model{

        protected $table      = 'usuarios';
        protected $primaryKey = 'idUsuario';

        protected $returnType     = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [
            'nombre', 
            'apellido',
            'email',
            'clave',
            'idPerfil',
            'habilitado'
        ];

        protected $useTimestamps = false;
        protected $validationRules  = [
            'nombre' => [
                'label' => 'Nombre',
                'rules' => 'required'
            ],
            'email' => [
                'label' => 'Email',
                'rules' => 'required'
            ],'clave' => [
                'label' => 'Clave',
                'rules' => 'required'
            ],
            'apellido' => [
                'label' => 'Apellido',
                'rules' => 'required'
            ]
            ,
            'idPerfil' => [
                'label' => 'idPerfil',
                'rules' => 'required'
            ]
        ];
        protected $validationMessages = [];
        protected $skipValidation     = false;
    }

?>