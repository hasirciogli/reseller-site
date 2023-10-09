<?php

declare(strict_types=1);

namespace app\models;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;
use Psr\Http\Message\ResponseInterface;
use Throwable;

class HSRCPayModel
{
    private const BASE_URL = "https://merchant-api.hsrcpay.com/v1";
    private const APP_ID = "XXXXXXXXXXXXXXXXXXXXX";
    private const APP_KEY = "XXXXXXXXXXXXXXXXXXXXX";

    private Client $client;

    public function __construct()
    {
        $this->client = new Client([
            "base_uri" => self::BASE_URL,
            "timeout" => 10.0,
            "allow_redirects" => true,
            'headers' => $this->LoadHeaderCredentials()
        ]);

    }

    private function LoadHeaderCredentials(): array
    {
        return [
            "Client-Id" => self::APP_ID,
            "Client-Hash" => base64_encode(pack("H*", sha1(self::APP_ID . self::APP_KEY))),
        ];
    }

    public function GetPayment(string $paymentId): ResponseInterface
    {
        try {
            return $this->client->get(self::BASE_URL . "/payment/$paymentId");
        } catch (ClientException | ConnectException | RequestException $e) {
            throw new HSRCPayException($e->getMessage(), $e->getCode());
        }
    }

    public function CreatePayment(array $data): ResponseInterface
    {
        try {
            return $this->client->post(self::BASE_URL . "/payment", [
                "form_params" => $data
            ]);
        } catch (ClientException | ConnectException | RequestException $e) {
            throw new HSRCPayException($e->getMessage(), $e->getCode());
        }
    }

    public function UpdatePayment(string $paymentId, array $data): ResponseInterface
    {
        try {
            return $this->client->patch(self::BASE_URL . "/payment/$paymentId", [
                "headers" => [

                ],
                "form_params" => $data
            ]);
        } catch (ClientException | ConnectException | RequestException $e) {
            throw new HSRCPayException($e->getMessage(), $e->getCode());
        }
    }

    public function DeletePayment(string $paymentId): ResponseInterface
    {
        try {
            return $this->client->delete(self::BASE_URL . "/payment/$paymentId");
        } catch (ClientException | ConnectException | RequestException $e) {
            throw new HSRCPayException($e->getMessage(), $e->getCode());
        }
    }

    public function ListPayments($pagination, $limit = 50): ResponseInterface
    {
        try {
            return $this->client->get(self::BASE_URL . "/payment?page=$pagination&limit=$limit");
        } catch (ClientException | ConnectException | RequestException $e) {
            throw new HSRCPayException($e->getMessage(), $e->getCode());
        }
    }


    public static function cfun(): HSRCPayModel
    {
        return new HSRCPayModel();
    }
}

class HSRCPayException extends Exception
{
    protected $message = 'HSRC Pay API hatası';
    protected $code = 500;

    public function __construct(string $message = '', int $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}