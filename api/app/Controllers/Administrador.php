<?php
    namespace App\Controllers;

    use CodeIgniter\HTTP\Response;
    use App\Controllers\BaseController;
    use App\Models\UsuarioModel;
    use App\Models\MaquinaModel;
    use App\Models\ClienteMaquinaModel;
    use App\Models\PerfilesModel;

use CodeIgniter\HTTP\Message;
use Exception;

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    class Administrador extends BaseController{

        private $administrador;
        private $clienteMaquina;
        private $perfil;
        
        public function __construct()
        {
            $this->administrador = new UsuarioModel();
            $this->clienteMaquina = new ClienteMaquinaModel();
            $this->perfil = new PerfilesModel();
        }

        public function options(): Response
        {
            return $this->response->setStatusCode(Response::HTTP_OK); 
        }  

        public function FiltrarUsuario($estado){
            
            $response = [
                'data' => $this->administrador->where('habilitado', $estado)->findAll(),
                'sucess' => true
            ];
    
            return $this->response->setJSON($response);
        }

        //Cuando se registra hay que encriptar la contraseña, cuando se hace el login se "parsea" encriptando para compararlo con la encriptada en la bbdd
        public function AltaUsuario(){

            $respuestaJson = $this->request->getJSON();

            $response = [
                'success'=> false,
                'message' => 'Error al modificar.'
            ];

            if(isset($respuestaJson->idUsuario)){

                $usuario = $this->administrador->where('idUsuario', $respuestaJson->idUsuario)->find();

                if($this->Existe($respuestaJson->email) && (($usuario[0])["email"]) == $respuestaJson->email){

                    $this->administrador->setValidationRule('email', 'valid_email');
                    $this->registro->set('nombre', $respuestaJson->nombre);
                    $this->registro->set('apellido', $respuestaJson->apellido);
                    $this->registro->set('email', $respuestaJson->email);
                    $this->registro->set('clave', md5($respuestaJson->clave));
                    $this->administrador->set('idPerfil', $respuestaJson->idPerfil);
                    $this->administrador->where('idUsuario',$respuestaJson->idUsuario);

                    if(!$this->administrador->update()){
                        return $this->response->setJSON($response);
                    }else{
                        $response['success'] = true;
                        $response['message'] = "Se modifico con exito el usuario.";
                        return $this->response->setJSON($response);
                    }

                }else if($this->Existe($respuestaJson->email) && (($usuario[0])["email"]) != $respuestaJson->email){

                    $response['success'] = false;
                    $response['message'] = "Error al modificar, el mail ya esta registrado en otro usuario.";
                    
                }
                else if(!($this->Existe($respuestaJson->email)) && (($usuario[0])["email"]) != $respuestaJson->email){
                    
                    $this->administrador->setValidationRule('email', 'valid_email');
                    $this->registro->set('nombre', $respuestaJson->nombre);
                    $this->registro->set('apellido', $respuestaJson->apellido);
                    $this->registro->set('email', $respuestaJson->email);
                    $this->registro->set('clave', md5($respuestaJson->clave));
                    $this->administrador->set('idPerfil', $respuestaJson->idPerfil);
                    $this->administrador->where('idUsuario',$respuestaJson->idUsuario);

                    if(!$this->administrador->update()){
                        return $this->response->setJSON($response);
                    }else{
                        $response['success'] = true;
                        $response['message'] = "Se modifico con exito el usuario.";
                        return $this->response->setJSON($response);
                    }
                }

            }else{

                if($this->Existe($respuestaJson->email)){

                    $response['success'] = false;
                    $response['message'] = "Error al registrar, el mail ya esta registrado en otro usuario";

                }else{

                    $this->administrador->setValidationRule('email', 'required|valid_email|is_unique[usuarios.email]');
                    $this->registro->set('nombre', $respuestaJson->nombre);
                    $this->registro->set('apellido', $respuestaJson->apellido);
                    $this->registro->set('email', $respuestaJson->email);
                    $this->registro->set('clave', md5($respuestaJson->clave));
                    $this->administrador->set('idPerfil', $respuestaJson->idPerfil);
                    $this->administrador->set('habilitado', 1);
    
                    if($this->administrador->insert()){
                        $response['success'] = true;
                        $response['message'] = "Se registro el usuario con exito.";
                        
                        
    
                    }else{
    
                        $response['message'] = "Error al registrarse.";
                        
                    }
                }

            }

            return $this->response->setJSON($response);
        }

        public function Existe($email){

            $admin = $this->administrador->where('email', $email)->find();

            if(count($admin)){
                return true;
            }else{
                return false;
            }
        }

        public function BajaLogicaUsuario(){

            $respuestaJson = $this->request->getJSON();

            $response = [
                'data' => $this->administrador->where('idUsuario', $respuestaJson->idUsuario)->find(),
                'message' => "",
                'success' => false
            ];
            
            if(count($response['data'])){

                
                if(!((($response["data"])[0])["habilitado"])){

                    $response['message']= "El usuario ya se encuentra con baja logica con anterioridad.";


                }else{
                    $this->administrador->set('habilitado', 0)->where('idUsuario', $respuestaJson->idUsuario)->update();
                    $response['message']= "Baja logica realizada con exito.";
                    $response['success']= true;
                }
            }

            return $this->response->setJSON($response);
            
        }

        //El administrador va a poder volver a habilitar al usuario buscado mediante la funcion
        //ObtenerUsuario.
        public function AltaLogicaUsuario(){

            $respuestaJson = $this->request->getJSON();

            $response = [
                'data' => $this->administrador->where('idUsuario',$respuestaJson->idUsuario)->find(),
                'message' => "",
                'success' => false
            ];
            
            if(count($response['data'])){

                
                if(((($response["data"])[0])["habilitado"])){

                    $response['message']= "El Usuario ya se encuentra habilitado.";
                    

                }else{
                    $this->administrador->set('habilitado', 1)->where('idUsuario', $respuestaJson->idUsuario)->update();
                    $response['message']= "El Usuario fue habilitado con exito..";
                    $response['success']= true;
                }
            }

            return $this->response->setJSON($response);

        }


        public function AsignarMaquina(){

            $respuestaJson = $this->request->getJSON();


            $response = [
                'message' => 'Error. No se pudo asignar la maquina a dicho usuario.',
                'data' => '',
                'success' => false
            ];


           $this->clienteMaquina->where('idUsuario', $respuestaJson->idUsuario);
           $this->clienteMaquina->where('idMaquina', $respuestaJson->idMaquina);
           $response['data'] = $this->clienteMaquina->findAll();
              
            try{
          
                if(!count($response['data'])){

                    
                    
                    $this->clienteMaquina->set('idUsuario', $respuestaJson->idUsuario);
                    $this->clienteMaquina->set('idMaquina', $respuestaJson->idMaquina);

                    if($this->clienteMaquina->insert()){

                        
                        $response['message'] ='Maquina asignada correctamente.';
                        $response['success'] = true;
        
                    }
                }
                else{

                    $response['message'] ='Esta asignacion ya existe en el sistema.';
                    $response['success'] = false;
                }

            }catch(Exception $e){
                
                $response['message'] = "Error al asignar la maquina. IDs no existentes.";
            }
            return $this->response->setJSON($response);

        }

        public function TraerClientes(){

            try{    

                $response = [
                    'message' => 'Exito al mostrar a los usuarios',
                    'array' => $this->administrador->join('perfiles', 'usuarios.idPerfil = perfiles.id')
                    ->select(['usuarios.idUsuario',
                    'usuarios.nombre',
                    'usuarios.apellido',
                    'usuarios.email',
                    'perfiles.perfil as perfil',
                    'usuarios.habilitado'
                    ])->findAll(),
                    'success' => true
                ];

            }catch(Exception $e){

                $response['message'] = 'Error al mostrar los clientes';
                $response['success'] = false;
            }
            return $this->response->setJSON($response);
        }

        public function AsignarPerfil(){

            $respuestaJson = $this->request->getJSON();


            $response = [
                'message' => 'Error. No se pudo asignar el perfil al usuario.',
                'data' => '',
                'success' => false
            ];


            $response['data'] = $this->administrador->where('idUsuario', $respuestaJson->idUsuario)->findAll();
  
              
            try{
          
                if(count($response['data'])){

                    
                    
                    $this->administrador->set('idUsuario', $respuestaJson->idUsuario)->where('idUsuario', $respuestaJson->idUsuario);
                    $this->administrador->set('idPerfil', $respuestaJson->idPerfil)->where('idUsuario', $respuestaJson->idUsuario);

                    if($this->administrador->update()){

                        
                        $response['message'] ='Perfil asignado correctamente.';
                        $response['success'] = true;
        
                    }
                }
                else{

                    $response['message'] ='Esta asignacion ya existe en el sistema.';
                    $response['success'] = false;
                }

            }catch(Exception $e){
                
                $response['message'] = "Error al asignar el perfil. IDs no existentes.";
            }
            return $this->response->setJSON($response);
        }


        public function TraerPerfiles(){

            $respuestaJson = $this->request->getJSON();

            try{    

                if($respuestaJson->idPerfil == 1){

                    $response = [
                        'message' => 'Exito al mostrar los perfiles',
                        'array' => $this->perfil->findAll(),
                        'success' => true
                    ];

                }else if($respuestaJson->idPerfil == 2){
       
                   
                    $response = [
                        'message' => 'Exito al mostrar los perfiles',
                        'array' =>$this->perfil->where('id', 3 )->findAll(),
                        'success' => true
                    ];
                }

            }catch(Exception $e){

                $response['message'] = "Error al mostrar los perfiles.";
                $response['success'] = false;
                
            }

       
            return $this->response->setJSON($response);
        }
        public function TraerPerfilesAcualesUsuario(){

            $respuestaJson = $this->request->getJSON();

            try{    

                $response = [
                    'message' => 'Exito al mostrar los perfiles',
                    'array' => $this->administrador->where("idUsuario", $respuestaJson->idUsuario)->join('perfiles', 'perfiles.id = usuarios.idPerfil')->findAll(),
                    'success' => true
                ];

            }catch(Exception $e){

                $response['message'] = "Error al mostrar los perfiles.";
                $response['success'] = false;
                
            }

       
            return $this->response->setJSON($response);
        }

        

    }
?>