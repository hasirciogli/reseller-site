<?php


namespace app\controllers;


use app\models\HSRCPayModel;
use app\models\DepositModel;
use app\models\TokenModel;
use Buki\Router\Router;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class PaymentController
{
    public function main(Router $router)
    {
        $router->post("/", "PaymentController@create");
        $router->get("/status", "PaymentController@status");
    }

    public function create(Request $request, Response $response)
    {
        $token = $request->query->get("token", "-1");

        $account = ($tmodel = new TokenModel)->GetAccount($token);

        if (!$account) {
            return [
                "status" => false,
                "make_action" => "logout"
            ];
        }

        $price = $request->query->get("price", "-1");
        $method = $request->query->get("method", "-1");

        if (!is_numeric($price) || strlen($price) > 15)
            return [
                "status" => false,
                "err" => "Nice price dude"
            ];

        if ($method != "papara-transfer") {
            return [
                "status" => false,
                "err" => "Card temporary deactivated sorry :("
            ];
        }


        $deposit_id = DepositModel::cfun()->CreateDeposit($account["id"], $price);

        if (!$deposit_id) {
            return [
                "status" => false,
                "err" => "Invalid err, #1879"
            ];
        }






        $price = number_format($price, 2, ".", "");
        $HPY_CRESULT = HSRCPayModel::cfun()->CreatePayment([
            "inf" => "hpay/papara-transfer",
            "price" => $price,
            "cunit" => 949,
            "xreference" => $deposit_id
        ])->getBody()->getContents();


        if ($HPY_CRESULT) {

            $res = json_decode($HPY_CRESULT, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

            if ($res["status"]) {

                $depositSignResult = DepositModel::cfun()->SignPaymentToDeposit($deposit_id, $res["data"]["payment"]["payment_id"]);

                if (!$depositSignResult) {
                    return [
                        "status" => false,
                        "err" => "X-CertificateSignFailed 1453-1938, #5698"
                    ];
                }

                return [
                    "status" => true,
                    "payment_id" => $deposit_id,
                    "price" => $price
                ];

            } else
                return [
                    "status" => false,
                    "err" => "Invalid paymentRes error (Certificate Invalid #7861)",
                ];


        } else
            return [
                "status" => false,
                "err" => "Invalid PAYMENT PROCESS SERVER error (Certificate Invalid #1931)",
            ];
    }

    public function status(Request $request, Response $response)
    {
        $token = $request->query->get("token", "-1");

        $tmodel = new TokenModel;

        $account = $tmodel->GetAccount($token);

        if (!$account) {
            return [
                "status" => false,
                "make_action" => "logout"
            ];
        }

        $deposit_id = $request->query->get("pid", "-1");


        $deposit = DepositModel::cfun()->GetDeposit($deposit_id);

        if (!$deposit) {
            return [
                "status" => false,
                "err" => "Invalid err, #6587",
            ];
        }

        if ($deposit["status"] != "waiting") {
            return [
                "status" => true,
                "pstatus" => $deposit["status"],
            ];
        }

        $payment_id = $deposit["payment_id"];



        $res = json_decode(HSRCPayModel::cfun()->GetPayment($payment_id)->getBody(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        if ($res && $res["data"]["payment"]["status"] == "approved" && $deposit["status"] == "waiting") {
            DepositModel::cfun()->VerifyDeposit($deposit_id);
        }



        if ($res && $res["status"]) {
            return [
                "status" => true,
                "pstatus" => $res["data"]["payment"]["status"],
            ];
        } else {
            return [
                "status" => false,
                "err" => "Payment not found",
            ];
        }


    }
}