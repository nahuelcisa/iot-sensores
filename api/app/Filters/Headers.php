<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class Headers implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {        
        header('Access-Control-Allow-Origin: *');

        header('Access-Control-Allow-Headers: *');
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {

    }
}