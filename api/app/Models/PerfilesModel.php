<?php

    namespace App\Models;
    use CodeIgniter\Model;

    class PerfilesModel extends Model{

        protected $table      = 'perfiles';
        protected $primaryKey = 'id';

        protected $returnType     = 'array';
        protected $useSoftDeletes = false;

        protected $allowedFields = [
            'perfiles'
        ];

        protected $useTimestamps = false;
        protected $validationRules  = [
        ];
        protected $validationMessages = [];
        protected $skipValidation     = false;
    }

?>