<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');

//Rutas para el usuario y administrador
$routes->options('(:any)', 'Administrador::options');
$routes->post('usuario/buscar', 'Administrador::FiltrarUsuario', ['filter' => 'headers']);
$routes->post('usuario/baja', 'Administrador::BajaLogicaUsuario', ['filter' => 'headers']);
$routes->post('usuario/alta', 'Administrador::AltaLogicaUsuario', ['filter' => 'headers']);
$routes->post('usuario/asignarPerfil', 'Administrador::AsignarPerfil', ['filter' => 'headers']);
$routes->post('administrador/registro', 'Administrador::AltaUsuario', ['filter' => 'headers']);
$routes->post('usuario/asignar', 'Administrador::AsignarMaquina', ['filter' => 'headers']);
$routes->get('listadoUsuarios',"Administrador::TraerClientes");
$routes->post('listadoPerfiles',"Administrador::TraerPerfiles");
$routes->post('perfilesActualesUsuario',"Administrador::TraerPerfilesAcualesUsuario");


//Rutas para maquina
$routes->options('(:any)', 'Maquina::options');
$routes->post('maquina/alta', 'Maquina::AltaMaquina', ['filter' => 'headers']);
$routes->post('maquina/bajaLogica/', 'Maquina::BajaLogicaMaquina/', ['filter' => 'headers']);
$routes->post('maquina/altaLogica/', 'Maquina::AltaLogicaMaquina/', ['filter' => 'headers']);
$routes->post('listadoMaquinas', 'Maquina::TraerMaquinas' , ['filter' => 'headers']);
$routes->post('cantidadMaquinas', 'Maquina::TraerCantidadMaquinas' , ['filter' => 'headers']);
$routes->post('maquinasAsignadas', 'Maquina::TraerMaquinasAsignadas' , ['filter' => 'headers']);
$routes->get('getMaquinasAsignadas', 'Maquina::getMaquinasAsignadas');
$routes->post('maquina/asignarMaquinaConCodigo', 'Maquina::AsignarMaquinaConCodigo');

//Login, restablecer password y registro
$routes->options('(:any)', 'login::options');
$routes->post('login', 'Login::ValidarSesion', ['filter' => 'headers']);
$routes->post('restablecer', 'Login::RestablecerPassword', ['filter' => 'headers']);
$routes->post('cambiar', 'Login::CambiarPasswordUsuario', ['filter' => 'headers']);
$routes->post('usuario/registro', 'Registro::AltaUsuario', ['filter' => 'headers']);


/*[]
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
