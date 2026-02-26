<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use App\Models\Database;
use Tuupola\Middleware\CorsMiddleware;

require __DIR__ . '/../vendor/autoload.php';

// Load Environment Variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->safeLoad();

$app = AppFactory::create();

// Add Body Parsing Middleware
$app->addBodyParsingMiddleware();

// Middleware: CORS
$app->add(new CorsMiddleware([
    "origin" => ["*"],
    "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    "headers.allow" => ["Content-Type", "Authorization", "If-Match", "If-Unmodified-Since"],
    "headers.expose" => [],
    "credentials" => false,
    "cache" => 0,
]));

// Add Routing Middleware
$app->addRoutingMiddleware();

// Add Error Middleware
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

// Preflight Requests
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

// Health Check
$app->get('/health', function (Request $request, Response $response, $args) {
    $response->getBody()->write(json_encode(['status' => 'ok', 'timestamp' => time()]));
    return $response->withHeader('Content-Type', 'application/json');
});

// Campaign Routes
$app->group('/campaigns', function ($group) {
    $group->get('', \App\Controllers\CampaignController::class . ':index');
    $group->get('/{id:[0-9]+}', \App\Controllers\CampaignController::class . ':show');
    $group->get('/slug/{slug}', \App\Controllers\CampaignController::class . ':showBySlug');
    $group->post('', \App\Controllers\CampaignController::class . ':store');
    $group->put('/{id}', \App\Controllers\CampaignController::class . ':update');
    $group->delete('/{id}', \App\Controllers\CampaignController::class . ':delete');
});

// Contact Routes
$app->get('/contacts', \App\Controllers\ContactController::class . ':index');
$app->post('/contacts', \App\Controllers\ContactController::class . ':store');

// Transparency Routes
$app->get('/transparencies', \App\Controllers\TransparencyController::class . ':index');
$app->get('/campaigns/{id}/transparency', function ($request, $response, $args) {
    $id = $args['id'];
    $model = new \App\Models\Transparency();
    try {
        $data = $model->getByCampaignId($id);
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    }
    catch (\Exception $e) {
        $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
    }
});
$app->post('/transparencies', \App\Controllers\TransparencyController::class . ':store');

// Payment (Mercado Pago Preview)
$app->post('/payments/preference', \App\Controllers\PaymentController::class . ':createPreference');
$app->post('/payments/webhook', \App\Controllers\PaymentController::class . ':webhook');

// DB Test Route
$app->get('/db-test', function ($request, $response, $args) {
    try {
        $db = new Database();
        $conn = $db->getConnection();
        if ($conn) {
            $response->getBody()->write(json_encode(['status' => 'success', 'message' => 'Database connection successful']));
        }
        else {
            $response->getBody()->write(json_encode(['status' => 'error', 'message' => 'Database connection failed']));
        }
    }
    catch (\Exception $e) {
        $response->getBody()->write(json_encode(['status' => 'error', 'message' => $e->getMessage()]));
    }
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();