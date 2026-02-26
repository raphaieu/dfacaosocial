<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class PaymentController
{
    public function createPreference(Request $request, Response $response)
    {
        $data = $request->getParsedBody();

        $amount = $data['amount'] ?? 0;
        $campaignId = $data['campaign_id'] ?? null;

        // Mocking Mercado Pago Preference Creation
        $preferenceId = "PREF-" . uniqid();
        $sandboxInitPoint = "https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=" . $preferenceId;

        $result = [
            'preference_id' => $preferenceId,
            'init_point' => $sandboxInitPoint,
            'is_mock' => true,
            'message' => 'Este é um ambiente de teste. A integração real requer credenciais oficiais.'
        ];

        $response->getBody()->write(json_encode($result));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function webhook(Request $request, Response $response)
    {
        // Mocking Webhook reception
        $params = $request->getQueryParams();
        $payload = $request->getParsedBody();

        // LOG the webhook for debugging
        error_log("MP Webhook received: " . json_encode($payload));

        $response->getBody()->write(json_encode(['status' => 'received']));
        return $response->withHeader('Content-Type', 'application/json');
    }
}