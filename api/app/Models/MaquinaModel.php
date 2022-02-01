<?php

    namespace App\Models;
    use CodeIgniter\Model;

    class MaquinaModel extends Model{

        protected $table      = 'maquinas';
        protected $primaryKey = 'idMaquinas';

        protected $returnType     = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [
            'habilitado',
            'idDevice'
        ];

        protected $useTimestamps = false;
        protected $validationRules  = [
        ];
        protected $validationMessages = [];
        protected $skipValidation     = false;
    }

?>