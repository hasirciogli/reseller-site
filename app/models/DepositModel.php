<?php

namespace app\models;

use app\database\DB;
use app\models\AccountModel;


class DepositModel
{

    public function CreateDeposit($account_id, $amount): null|string
    {
        $deposit_id = sha1(time() . time() . time());
        $res = DB::cfun()->insert(
            "deposit",
            [
                "deposit_id",
                "account_id",
                "amount"
            ]
        )
            ->bindParam("deposit_id", $deposit_id)
            ->bindParam("account_id", $account_id)
            ->bindParam("amount", $amount)->run();

        if ($res)
            return $deposit_id;
        else
            return null;
    }

    public function GetDeposit($deposit_id): null|bool|array|DB
    {
        return DB::cfun()->select("deposit")
            ->where("deposit_id", true)
            ->bindParam("deposit_id", $deposit_id)->run()->get() ?? null;
    }

    public function IsDepositApprovable($deposit_id): false|null|array
    {
        $deposit = DB::cfun()->select("deposit")
            ->where("deposit_id", true)
            ->bindParam("deposit_id", $deposit_id)->run()->get() ?? null;

        if ($deposit && $deposit["status"] == "waiting") {
            return $deposit;
        } else
            return false;
    }

    public function VerifyDeposit($deposit_id): bool
    {
        if (!($deposit = $this->IsDepositApprovable($deposit_id)))
            return false;
        

        $verifyDepositStatus = DB::cfun()->customSql("UPDATE deposit SET status=:status WHERE BINARY deposit_id=:deposit_id")
            ->bindParam("deposit_id", $deposit_id)
            ->bindParam("status", "approved")->run() ?? null;
        if ($verifyDepositStatus) {
            return AccountModel::cfun()->AddBalanceToAccount($deposit["account_id"], $deposit["amount"]);
        } else
            return false;
    }


    public function SignPaymentToDeposit($deposit_id, $payment_id): bool
    {
        return DB::cfun()->customSql("UPDATE deposit SET payment_id=:payment_id WHERE BINARY deposit_id=:deposit_id")
            ->bindParam("deposit_id", $deposit_id)
            ->bindParam("payment_id", $payment_id)->run() ? true : false;
    }

    public function DeclineDeposit($deposit_id): bool
    {
        if (!$this->IsDepositApprovable($deposit_id))
            return false;

        return DB::cfun()->customSql("UPDATE deposit SET status=:status WHERE deposit_id=:deposit_id")
            ->bindParam("deposit_id", $deposit_id)
            ->bindParam("status", "rejected")->run() ?? null;
    }


    public static function cfun(): DepositModel
    {
        return new DepositModel;
    }
}


?>