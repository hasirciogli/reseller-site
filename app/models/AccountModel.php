<?php

namespace app\models;

use app\database\DB;

class AccountModel
{
    public function Login($username, $password): null|array
    {
        $execPrevent = DB::cfun()->select("accounts")
            ->where("username", true)
            ->where("password", true)
            ->bindParam("username", $username)
            ->bindParam("password", $password)
            ->run()->get();

        if (!$execPrevent)
            return null;
        else
            return $execPrevent;
    }

    public function GetAccountFromToken($token): null|array
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

    public function AddBalanceToAccount(string $account_id, mixed $amount): bool
    {

        $execPrevent = DB::cfun()->select("accounts")
            ->where("id", true)
            ->bindParam("id", $account_id)
            ->run()->get();

        if (!$execPrevent)
            return false;

        return DB::cfun()->customSql("UPDATE accounts SET balance=balance+:balance WHERE BINARY id=:id")
            ->bindParam("id", $account_id)
            ->bindParam("balance", $amount)->run() ? true : false;
    }

    public static function cfun(): AccountModel
    {
        return new AccountModel;
    }
}