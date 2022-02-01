<?php

/*    namespace App\Controllers;

    use App\Controllers\BaseController;
    use App\Models\UsuarioModel;

    class Usuario extends BaseController{

        private $usuario;
        
        public function __construct()
        {
            $this->usuario = new UsuarioModel();
        }


        //Filtro para el administrador al momento de cambiarle el estado al Usuario.
        
        public function ObtenerUsuario($estado){
            
            $response = [
                'data' => $this->usuario->where('habilitado', $estado)->findAll(),
                'sucess' => true
            ];
    
            return $this->response->setJSON($response);
        }

        //El administrador va a poder deshabilitar al Usuario que quiera mediante
        // la funcion ObtenerUsuario
        public function BajaLogicaUsuario($id){

            $response = [
                'data' => $this->usuario->where('idUsuario', $id)->find(),
                'mensaje' => ""
            ];
            
            if(count($response['data'])){

                
                if(!((($response["data"])[0])["habilitado"])){

                    $response['mensaje']= "El usuario ya se encuentra con baja logica con anterioridad.";

                }else{
                    $this->usuario->set('habilitado', 0)->where('idUsuario', $id)->update();
                    $response['mensaje']= "Baja logica realizada con exito.";
                }
            }

            return $this->response->setJSON($response);
            
        }

        //El administrador va a poder volver a habilitar al usuario buscado mediante la funcion
        //ObtenerUsuario.
        public function AltaLogicaUsuario($id){

            $response = [
                'data' => $this->usuario->where('idUsuario', $id)->find(),
                'mensaje' => ""
            ];
            
            if(count($response['data'])){

                
                if(((($response["data"])[0])["habilitado"])){

                    $response['mensaje']= "El Usuario ya se encuentra habilitado.";

                }else{
                    $this->usuario->set('habilitado', 1)->where('idUsuario', $id)->update();
                    $response['mensaje']= "El Usuario fue habilitado con exito..";
                }
            }

            return $this->response->setJSON($response);

        }

        public function RegistroUsuario(){

            $id = $this->request->getPost('id');

            $response = [

                'mensaje' => 'No hay mensaje. ',
                'success' => false

            ];

            if($this->request->getPost('id')){

                $this->usuario->setValidationRule('email', 'required|valid_email|is_unique[usuarios.email,id,'.$id.']');
                $this->usuario->set('nombre', $this->request->getPost('nombre'));
                $this->usuario->set('apellido', $this->request->getPost('apellido'));
                $this->usuario->set('email', $this->request->getPost('email'));
                $this->usuario->set('clave', md5($this->request->getPost('clave')));
                $this->usuario->set('idPerfil', $this->request->getPost('idPerfil'));
                $this->usuario->set('habilitado', $this->request->getPost('habilitado'));
           
                if($this->usuario->update()){
                    
                    $response = [


                        'mensaje' => 'Usuario modificado. ',
                        'success' => true
        
                    ];
                }


            }else{

                $this->usuario->setValidationRule('email', 'required|valid_email|is_unique[usuarios.email]');
                $this->usuario->set('nombre', $this->request->getPost('nombre'));
                $this->usuario->set('apellido', $this->request->getPost('apellido'));
                $this->usuario->set('email', $this->request->getPost('email'));
                $this->usuario->set('clave', md5($this->request->getPost('clave')));
                $this->usuario->set('idPerfil', $this->request->getPost('idPerfil'));
                $this->usuario->set('habilitado', 1);
          
                
                if($this->usuario->insert()){

                    $response = [

                        'mensaje' => 'Usuario registrado con exito ',
                        'success' => true
        
                    ];

                   
                    
                }
            }
            
            return $this->response->setJSON($response);
            
        }

   



    } */
?>

