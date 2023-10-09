<?php
use app\models\DepositModel;
use app\models\HSRCPayModel;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/app/configs/db.php';


//echo HSRCPayModel::cfun()->GetPayment("XXXXXXXXXXXX")->getBody() . PHP_EOL;

/*

return;

echo HSRCPayModel::cfun()->CreatePayment([
    "inf"=> "hpay/papara-transfer",
    "price" => "148.54",
    "xreference" => "deposit1453",
    "cunit" => "949"
])->getBody() . PHP_EOL;

return;

class NeverloseAPI
{
    private $baseUrl = 'https://neverlose.cc/api/market/';
    private $apiKey;
    public function __construct($apiKey)
    {
        $this->apiKey = $apiKey;
    }

    private function generateSignature($data)
    {
        // Verileri sırala
        ksort($data);

        // Verileri birleştir
        $dataString = '';
        foreach ($data as $key => $value) {
            $dataString .= $key . $value;
        }

        // Gizli anahtarla birleştir ve SHA-256 ile karma
        $signature = hash('sha256', $dataString . $this->apiKey);

        return $signature;
    }

    public function post($endpoint, $data = [])
    {
        // Veriye imza ekleyin
        $data['signature'] = $this->generateSignature($data);

        // cURL ile isteği gönderin
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->baseUrl . $endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $this->apiKey,
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }

    public function get($endpoint)
    {
        // cURL ile GET isteği gönderin
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->baseUrl . $endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $this->apiKey,
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }
}

// Kullanım örneği:
$apiKey = 'YOUR API KEY   XXXXX';
$api = new NeverloseAPI($apiKey);

$response = $api->post('get-balance', [
    'user_id' => 55280,
]);

var_dump($response);

$response = $api->post('get-prices', [
    'user_id' => 55280,
    "product" => "csgo",
]);

var_dump($response);

return;
// Örnek kullanım:
$response = $api->post('give-for-free', [
    'user_id' => 1,
    'id' => 1338,
    'username' => 'darth',
    'code' => 'E3yugw',
]); {
    // Balance Transfer
    // Örnek kullanım:
    $response = $api->post('balance-transfer', [
        'user_id' => 1,
        'id' => 1338,
        'amount' => 10,
        'username' => 'darth',
        'unique_id' => 22,
    ]);
} {
    // Item Purchase
    // Örnek kullanım:
    $response = $api->post('item-purchase', [
        'user_id' => 1,
        'id' => 1338,
        'amount' => 0.9,
        'username' => 'A49',
        'unique_id' => 89968,
        'item_id' => 'E3yugw',
    ]);
} {
    // Common Parameters
    // Örnek kullanım:
    $response = $api->post('common-parameters', [
        'user_id' => 1,
        'id' => 1338,

    ]);
} {
    // Request ID
    // Örnek kullanım:
    $response = $api->post('request-id', [
        'user_id' => 1,
        'id' => 1338,
    ]);
} {
    // Curl Example
    // Örnek kullanım:
    $response = $api->post('curl-example', [
        'user_id' => 1,
        'id' => 1338,
    ]);
} {
    // Responses
    // Örnek kullanım:
    $response = $api->post('responses', [
        'user_id' => 1,
        'id' => 1338,
    ]);
} {
    // Successful Response
    // Örnek kullanım:
    $response = $api->post('successful-response', [
        'user_id' => 1,
        'id' => 1338,
    ]);
} {
    // Failure Response
    // Örnek kullanım:
    $response = $api->post('failure-response', [
        'user_id' => 1,
        'id' => 1338,
    ]);
} {
    // Api Methods
    // Örnek kullanım:
    $response = $api->post('api-methods', [
        'user_id' => 1,
        'id' => 1338,
    ]);
} {
    // Give Item to User
    // Örnek kullanım:
    $response = $api->post('give-item-to-user', [
        'user_id' => 1,
        'id' => 1338,
        'username' => 'darth',
        'code' => 'E3yugw',
    ]);
} {
    // Transfer Balance
    // Örnek kullanım:
    $response = $api->post('transfer-balance', [
        'user_id' => 1,
        'id' => 1338,
        'username' => 'a49',
        'amount' => 2.00,
    ]);
} {
    // Gift Product
    // Örnek kullanım:
    $response = $api->post('gift-product', [
        'user_id' => 1,
        'id' => 1338,
        'username' => 'darth',
        'product' => 'csgo',
        'cnt' => 0,
    ]);
} {
    // Get Product Prices
    // Örnek kullanım:
    $response = $api->post('get-product-prices', [
        'user_id' => 1,
        'product' => 'csgo',

    ]);
} {
    // Check if User Exists
    // Örnek kullanım:
    $response = $api->post('check-if-user-exists', [
        'user_id' => 1,
        'username' => 'darth',
    ]);
} {
    // Get NLE Balance
    // Örnek kullanım:
    $response = $api->post('get-nle-balance', [
        'user_id' => 1,

    ]);
} {
    // Signature Creation and Validation
    // Örnek kullanım:
    $response = $api->post('signature-creation-and-validation', [
        'user_id' => 1,
        'id' => 1338,
        'username' => 'darth',
    ]);
} {
    // Example Webhook Callback Handlers
    // Örnek kullanım:
    $response = $api->post('example-webhook-callback-handlers', [
        'user_id' => 1,
        'id' => 1338,
    ]);
}

*/