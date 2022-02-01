<?php  namespace App\Controllers;

    use CodeIgniter\HTTP\Response;
    use App\Controllers\BaseController;
    use App\Models\UsuarioModel;

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    require_once('PHPMailer/Exception.php');
    require_once('PHPMailer/PHPMailer.php');
    require_once('PHPMailer/SMTP.php');

    class Login extends BaseController{

        private $login;


        public function __construct()
        {     
            
            $this->login = new UsuarioModel();
        }
        
        public function options(): Response
        {
            return $this->response->setStatusCode(Response::HTTP_OK); 
        }   

        
        public function ValidarSesion(){
            
            $response = [
                'message' => "",
                'success' => true,
                
            ];

            $respuestaJson = $this->request->getJSON();
            $email = $this->login->where('email', $respuestaJson->email)->find();
            $clave = md5($respuestaJson->clave);
            

            if($email != NULL && ($email[0])['habilitado']){

                if((($email[0])["clave"]) == $clave){
                    $response['message'] = "Sesion iniciada con exito";
                    $response['data'] = $email[0];


                }else{
                    $response['message'] = 'Datos incorrectos.';
                    $response['success'] = false;

                }
            }else if ($email == NULL){
                $response['message'] = 'Datos incorrectos.';
                $response['success'] = false;

            }
            else{
                $response['message'] = 'Cuenta deshabilitada. Contacte con un administrador.';
                $response['success'] = false;
            }
            
            return $this->response->setJSON($response);
            
        }

        public function EnviarCorreoRestablecerPassword($url = NULL){

            $respuestaJson = $this->request->getJSON();

            $response = [
                'message' => "Correo enviado con exito",
                'success' => true
            ];

            $mail = new PHPMailer(true);

            if(isset($url)){

                $direccion = "http://localhost:4200/restablecer/?email=". $url;

                $body = "<td valign='top'>Ingrese a este link para restablecer:&nbsp;</td>
                <td valign='top'><b><a href=".$direccion.">haga click aqui</a></b></td>";

                $correo = $this->login->where('email',$respuestaJson->email)->find();

            }else{
                $correo = $this->login->where('idUsuario', $respuestaJson->idUsuario)->find();

                $body = "<td valign='top'>Se ha modificado su clave con exito</td>
                        <td valign='top'><b>SI NO FUE USTED CONTACTESE CON LA ADMINISTRACION DE INMEDIATO</b></td>;
                        <td valign='top'><b>De lo contrario, desestime este correo.</b></td>";
            }


            if($correo != NULL){

                try{
                    //Server settings
                    $mail->SMTPDebug = 0;                      //Enable verbose debug output
                    $mail->isSMTP();                                            //Send using SMTP
                    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
                    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                    $mail->Username   = 'testiot123456@gmail.com';                     //SMTP username
                    $mail->Password   = 'Gosonciosape3';                               //SMTP password
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

                    //Recipients
                    $mail->setFrom('testiot123456@gmail.com', 'testiot');
                    $mail->addAddress((($correo[0])["email"]), (($correo[0])["nombre"]));     //Add a recipient

                    //Content
                    $mail->isHTML(true);                                  //Set email format to HTML
                    $mail->Subject = 'REINICIO DE CONTRASEÑA';
        
                    $mail->Body = "
                    <table border='0' cellspacing='0' cellpadding='5' width='500'>
                        <tr>
                            <td colspan='2'>Datos del contacto: </td>
                        </tr>
                        <tr>
                            <td>Nombre:&nbsp;</td>
                            <td><b>".(($correo[0])["nombre"])."</b></td>
                        </tr>
                        <tr>
                            <td>apellido:&nbsp;</td>
                            <td><b>".(($correo[0])["apellido"])."</b></td>
                        </tr>
                        <tr>
                            <td>Email:&nbsp;</td>
                            <td><b>".(($correo[0])["email"])."</b></td>
                        </tr>
                        <tr>
                            ". $body . "
                        </tr>
                    </table>
                    ";

                    if($mail->send()){
                        return $this->response->setJSON($response);
                    }
                }catch (Exception $e) {
                    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                }
            }else{
                $response['message'] = "Error al enviar el correo para recuperar la password";
                $response['success'] = false;
                return $this->response->setJSON($response);
            }
        }

        public function CambiarPasswordUsuario(){

            $respuestaJson = $this->request->getJSON();

            $response = [
                'message' => "Error al cambiar la contraseña",
                'success' => false
            ];

            if(isset($respuestaJson->idUsuario)){

                $this->login->set("clave",md5($respuestaJson->clave))->where("idUsuario",$respuestaJson->idUsuario);
                if($this->login->update()){

                    $response = [
                        'message' => "Clave cambiada con exito",
                        'success' => true
                    ];

                    $this->EnviarCorreoRestablecerPassword();
                }
            }else{

                $this->login->set('clave', md5($respuestaJson->clave));
                $this->login->where('md5(`email`)', $respuestaJson->email);

                if($this->login->update()){

                    $response = [
                        'message' => "Clave cambiada con exito",
                        'success' => true
                    ];
                }
            }

            return $this->response->setJSON($response);
        }

        public function RestablecerPassword(){

            $respuestaJson = $this->request->getJSON();

            $response = [
                'message' => "Error al enviar correo",
                'success' => false
            ];

            if(isset($respuestaJson->email)){
                $this->EnviarCorreoRestablecerPassword(md5($respuestaJson->email));
                $respuesta = json_decode($this->response->getJSON());
                $response = [
                    'message' => $respuesta->message,
                    'success' => $respuesta->success
                ];
            }
            return $this->response->setJSON($response);
        }
    }
?>