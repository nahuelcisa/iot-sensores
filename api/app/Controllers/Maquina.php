<?php

    namespace App\Controllers;

    use CodeIgniter\HTTP\Response;
    use App\Controllers\BaseController;
    use App\Models\ClienteMaquinaModel;
    use App\Models\MaquinaModel;
    use App\Models\UsuarioModel;
    use Exception;


    class Maquina extends BaseController{

    
        private $maquina;
        private $clienteMaquina;
        private $usuario;
        public function __construct()
        {
            $this->maquina = new MaquinaModel();
            $this->clienteMaquina = new ClienteMaquinaModel();
            $this->usuario = new UsuarioModel();
        }

        public function options(): Response
        {
            return $this->response->setStatusCode(Response::HTTP_OK); 
        }  
        
        public function AltaMaquina(){

            $response = [
                'success'=> false,
                'message' => 'Error al dar de alta.'
            ];

            $idDevice = $this->request->getJSON();

            try{

                $this->maquina->set('idDevice', $idDevice->idDevice);
                $this->maquina->set('habilitado', 1);
    
                if($this->maquina->insert()){
    
                    $response['success'] = true;
                    $response['message'] = 'Exito al dar de alta';
                }


            }catch(Exception $e){

                $response['success'] = false;
                $response['message'] = "Ya se encuentra una maquina con ese nombre";

            }
  
            return $this->response->setJSON($response);
        }   

        public function BajaLogicaMaquina(){

            $idMaquina = $this->request->getJSON();

            $response = [
                'data' => $this->maquina->where('idMaquina', $idMaquina->idMaquina)->find(),
                'success' => false
            ];
            
            if(count($response['data'])){

                $this->maquina->set('habilitado', 0)->where('idMaquina', $idMaquina->idMaquina)->update();
                $response['success']= true;
                
            }
            return $this->response->setJSON($response);        

        }

        public function AltaLogicaMaquina(){

            $idMaquina = $this->request->getJSON();

            $response = [
                'data' => $this->maquina->where('idMaquina', $idMaquina->idMaquina)->find(),
                'success' => false
            ];
            
            if(count($response['data'])){
    
                $this->maquina->set('habilitado', 1)->where('idMaquina', $idMaquina->idMaquina)->update();
                $response['success']= true;
                
            }
            return $this->response->setJSON($response);        

        }

        public function TraerMaquinas(){                    
            try{    

                $response = [
                    'mensaje' => 'Exito al mostrar a las maquinas',
                    'array' => $this->maquina->findAll(),
                    'success' => true
                ];

            }catch(Exception $e){

                $response['mensaje'] = "Error al mostrar a las maquinas.";
                $response['success'] = false;
                
            }

       
            return $this->response->setJSON($response);
        }
        public function TraerCantidadMaquinas(){

            $respuestaJson = $this->request->getJSON();
        
            $response = [
                'message' => 'Error al traer la cantidad de maquinas',
                'array' => [],
                'success' => false
            ];

            try{

                $response = [
                    'message' => 'Exito al traer la cantidad de maquinas',
                    'array' =>  $this->clienteMaquina->where('idUsuario', $respuestaJson->idUsuario)->findAll(),
                    'success' => true
                ];
              

            }catch(Exception $e){
                $response['message'] = $respuestaJson; 
            }

            return $this->response->setJSON($response);
        }

        public function TraerMaquinasAsignadas(){

            $respuestaJson = $this->request->getJSON();
        
            $response = [
                'message' => 'Error al traer la cantidad de maquinas',
                'array' => [],
                'success' => false
            ];

            try{

                $response = [
                    'message' => 'Exito al traer la cantidad de maquinas',
                    'array' =>  $this->clienteMaquina->where('idUsuario', $respuestaJson->idUsuario)->join('maquinas', 'maquinas.idMaquina = clientesmaquinas.idMaquina')->findAll(),
                    'success' => true
                ];
              

            }catch(Exception $e){
                $response['message'] = $respuestaJson; 
            }

            return $this->response->setJSON($response);
        }

        public function AsignarMaquinaConCodigo(){

            $respuestaJson = $this->request->getJSON();

            $response = [
                'message' => 'Ocurrió un error vinculando este dispositivo con el usuario',
            ];

            $usuario = $this->usuario->where("idUsuario", $respuestaJson->codigoUsuario)->find();

            if($usuario == null){
                $response['message'] ='No se encontró el usuario en el sistema.';
                return $this->response->setJSON($response);
            }

            if($this->maquina->where("idDevice", $respuestaJson->nombreMaquina."/".$usuario[0]["idUsuario"])->find() != null){
                $response['message'] ='La maquina ya existe en el sistema.';
                return $this->response->setJSON($response);
            }
            $this->maquina->set('idDevice', $respuestaJson->nombreMaquina."/".$usuario[0]["idUsuario"]);
            $this->maquina->set('habilitado', 1);
            $idMaquina = 0;
            if($idMaquina = $this->maquina->insert()){
               

                if($usuario != null){
                    $this->clienteMaquina->set('idUsuario', $usuario[0]["idUsuario"]);
                    $this->clienteMaquina->set('idMaquina', $idMaquina);

                    if($this->clienteMaquina->insert()){

                        
                        $response['message'] ='Maquina asignada correctamente.';


                        return $this->response->setJSON($response);
                    }
                }

                return $this->response->setJSON($response);
            }
        }
        

    }


?>