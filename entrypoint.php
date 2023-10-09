<?php


require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/app/configs/db.php';

use app\controllers\AccountController;
use app\controllers\PaymentController;
use Buki\Router\Router;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$router = new Router([
    'paths' => [
        'controllers' => './app/controllers',
        'middlewares' => './app/middlewares',
    ],
    'namespaces' => [
        'controllers' => 'app\\controllers',
        'middlewares' => 'app\\middlewares',
    ],
    'debug' => true,
]);

// For basic GET URI
$router->get('/token/validate', "TokenController@validate");

$router->group('/account', function (Router $router) {
    ($ac = new AccountController())->main($router);
});

$router->group('/payment', function (Router $router) {
    ($ac = new PaymentController())->main($router);
});

// For basic GET URI by using a Controller class.
//$router->post('/account/login', 'AccountController@Login');
header("Access-Control-Allow-Origin: http://localhost:5173");
$router->run();