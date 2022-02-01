<?php
    namespace App\Controllers;

        use CodeIgniter\HTTP\Response;
        use App\Controllers\BaseController;
        use App\Models\UsuarioModel;
        use App\Models\MaquinaModel;
        use App\Models\ClienteMaquinaModel;
        use Exception;
        

        class Registro extends BaseController{

            private $registro;


            public function __construct()
            {
                $this->registro = new UsuarioModel();
            }

            public function options(): Response
            {
                return $this->response->setStatusCode(Response::HTTP_OK); 
            }  


            public function AltaUsuario(){

                $respuestaJson = $this->request->getJSON();
               
                $response = [
                    'success'=> false,
                    'message' => 'Error al registrarse.'
                ];
                
                try{
 
                    if(!$this->Existe($respuestaJson->email)){

                        $this->registro->setValidationRule('email', 'required|valid_email|is_unique[usuarios.email]');
                        $this->registro->set('nombre', $respuestaJson->nombre);
                        $this->registro->set('apellido', $respuestaJson->apellido);
                        $this->registro->set('email', $respuestaJson->email);
                        $this->registro->set('clave', md5($respuestaJson->clave));
                        $this->registro->set('idPerfil', 3);
                        $this->registro->set('habilitado', 1);
            
                        if($this->registro->insert()){
                            $response['success'] = true;
                            $response['message'] = "Se registro el usuario con exito.";

                        }
                        else{
            
                            $response['message'] = "Error al registrarse.";
                            
                        }
                    }else{
                        $response['message'] = 'Direccion de correo electronico ya registrado.';
                    }
                       
                }catch(Exception $e){
                    $response['message'] = 'Error de excepcion, intente de nuevo.';
                
                }

                return $this->response->setJSON($response);
            }
    
            public function Existe($email){
    
                $admin = $this->registro->where('email', $email)->find();
    
                if(count($admin)){
                    return true;
                }else{
                    return false;
                }
            }
        }
?>