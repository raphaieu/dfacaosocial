<?php

namespace App\Controllers;

use App\Models\Transparency;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class TransparencyController
{
    private $model;

    public function __construct()
    {
        $this->model = new Transparency();
    }

    public function index(Request $request, Response $response)
    {
        try {
            $data = $this->model->getAll();
            $response->getBody()->write(json_encode($data));
            return $response->withHeader('Content-Type', 'application/json');
        }
        catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }

    public function store(Request $request, Response $response)
    {
        $data = $request->getParsedBody();

        if (!isset($data['title'])) {
            $response->getBody()->write(json_encode(['error' => 'Title is required']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }

        try {
            $id = $this->model->create($data);
            $response->getBody()->write(json_encode(['id' => $id, 'message' => 'Transparency report created successfully']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        }
        catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }
}