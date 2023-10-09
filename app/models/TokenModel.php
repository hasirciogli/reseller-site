<?php

namespace app\models;

use app\database\DB;

class TokenModel
{
    public function CreateToken($account_id): null|string
    {
        $newToken = substr(
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999)).
            sha1(time() . time() . random_int(0, 99999999))
            , 0, 650);

        $execPrevent = DB::cfun()->insert("accounts_tokens", [
            "token",
            "account_id",
        ])
            ->bindParam("token", $newToken)
            ->bindParam("account_id", $account_id)
            ->run();

        if (!$execPrevent) {
            return null;
        } else
            return $newToken;
    }

    public function GetAccount($token = "-1"): null|array
    {

        $execPrevent = DB::cfun()->select("accounts_tokens")
            ->where("token", true)
            ->bindParam("token", $token)
            ->run()->get();

        if (!$execPrevent) {
            return null;
        }

        $execPrevent = DB::cfun()->select("accounts")
            ->where("id", true)
            ->bindParam("id", $execPrevent["account_id"])
            ->run()->get();

        if (!$execPrevent)
            return null;
        else
            return $execPrevent;
    }

    public function CheckToken($token): null|array
    {

        $execPrevent = DB::cfun()->select("accounts_tokens")
            ->where("token", true)
            ->bindParam("token", $token)
            ->run()->get();

        if (!$execPrevent) {
            return null;
        }

        if (!$execPrevent)
            return null;
        else
            return $execPrevent;
    }
}