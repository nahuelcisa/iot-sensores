<?php

    namespace App\Models;
    use CodeIgniter\Model;

    class ClienteMaquinaModel extends Model{

        protected $table      = 'clientesmaquinas';
        protected $primaryKey = 'id';

        protected $returnType     = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [
            'idUsuario',
            'idMaquina'
        ];

        protected $useTimestamps = false;
        protected $validationRules  = [
        ];
        protected $validationMessages = [];
        protected $skipValidation     = false;
    }

?>