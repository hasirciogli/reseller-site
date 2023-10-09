<?php

namespace app\controllers;

use app\models\TokenModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TokenController
{
    /**
     * @Route("/storage/{filename}", name="storage_file")
     */
    public function validate(Request $request, Response $response)
    {
        $token = $request->query->get("token", "-1");
        

        ($tmodel = new TokenModel);

        $tokenCheck = $tmodel->CheckToken($token);
        if(!$tokenCheck){
            return [
                "status" => false,
                "err" => "Invalid Token",
                "make_action" => "logout",
            ];
        }
        $response->headers->set("Content-Type: Application/json", true);
        // Dosyayı yanıt olarak döndürün
        return [
            "status" => true,
        ];
    }
}