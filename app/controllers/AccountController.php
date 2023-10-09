<?php

namespace app\controllers;

use app\models\AccountModel;
use app\models\TokenModel;
use Buki\Router\Router;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccountController
{
    public function main(Router $router)
    {
        $router->post("/login", "AccountController@login");
        $router->post("/register", "AccountController@register");
        $router->get("/balance", "AccountController@GetBalance");
    }

    public function login(Request $request, Response $response)
    {
        $username = $_POST["username"] ?? "";
        $password = $_POST["password"] ?? "";
        // Dosyayı yanıt olarak döndürün

        $amodel = new AccountModel;
        $account_response = $amodel->Login($username, $password);

        if (!$account_response) {
            return [
                "status" => false,
                "err" => "invalid username and password"
            ];
        }

        $tmodel = new TokenModel;

        $token_response = $tmodel->CreateToken($account_response["id"]);

        if (!$token_response) {
            return [
                "status" => false,
                "err" => "invalid username and password"
            ];
        }

        return [
            "status" => true,
            "make_action" => "login_success_reload",
            "token" => $token_response
        ];
    }

    public function GetBalance(Request $request, Response $response)
    {
        $token = $request->query->get("token", "-1");

        $amodel = new AccountModel;
        $account_response = $amodel->GetAccountFromToken($token);

        if (!$account_response) {
            return [
                "status" => false,
                "make_action" => "logout",
                "err" => "Account not found"
            ];
        }

        return [
            "status" => true,
            "balance" => $account_response["balance"] ?? 0.00
        ];
    }

    public function register(Request $request, Response $response)
    {
        return [
            "status" => false,
            "err" => "1234 :)"
        ];
    }
}