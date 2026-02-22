<?php

use Slim\Factory\AppFactory;
use Slim\Middleware\ErrorMiddleware;
use Tuupola\Middleware\CorsMiddleware;
use Dotenv\Dotenv;
use App\Models\Database;

require __DIR__ . '/../vendor/autoload.php';

// Load environment variables
if (file_exists(__DIR__ . '/../.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__ . '/..');
    $dotenv->load();
}

$app = AppFactory::create();

// Add CORS Middleware
$app->add(new CorsMiddleware([
    "origin" => ["*"],
    "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    "headers.allow" => ["Authorization", "Content-Type", "X-Requested-With"],
    "headers.expose" => [],
    "credentials" => true,
    "cache" => 0,
]));

// Add Body Parsing Middleware
$app->addBodyParsingMiddleware();

// Add Routing Middleware
$app->addRoutingMiddleware();

// Health Check Route
$app->get('/health', function ($request, $response, $args) {
    $response->getBody()->write(json_encode([
        'status' => 'ok',
        'timestamp' => time()
    ]));
    return $response->withHeader('Content-Type', 'application/json');
});

// DB Test Route
$app->get('/db-test', function ($request, $response, $args) {
    try {
        $db = new Database();
        $conn = $db->getConnection();

        if ($conn) {
            $status = 'Connected to Supabase/Postgres successfully!';
        }
        else {
            $status = 'Connection failed.';
        }

    }
    catch (\Exception $e) {
        $status = 'Error: ' . $e->getMessage();
    }

    $response->getBody()->write(json_encode([
        'status' => $status
    ]));
    return $response->withHeader('Content-Type', 'application/json');
});

// Hello World Route
$app->get('/', function ($request, $response, $args) {
    $response->getBody()->write(json_encode([
        'message' => 'D.F. Ação Social API v1'
    ]));
    return $response->withHeader('Content-Type', 'application/json');
});

// Add Error Middleware
$app->addErrorMiddleware(true, true, true);

$app->run();