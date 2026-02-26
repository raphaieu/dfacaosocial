<?php

namespace App\Controllers;

use App\Models\Campaign;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class CampaignController
{
    private $model;

    public function __construct()
    {
        $this->model = new Campaign();
    }

    public function index(Request $request, Response $response)
    {
        $params = $request->getQueryParams();
        $limit = $params['limit'] ?? 10;
        $offset = $params['offset'] ?? 0;

        try {
            $data = $this->model->getAll($limit, $offset);
            $response->getBody()->write(json_encode($data));
            return $response->withHeader('Content-Type', 'application/json');
        }
        catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }

    public function show(Request $request, Response $response, array $args)
    {
        $id = $args['id'];
        try {
            $data = $this->model->getById($id);
            if (!$data) {
                $response->getBody()->write(json_encode(['error' => 'Campaign not found']));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
            }
            $response->getBody()->write(json_encode($data));
            return $response->withHeader('Content-Type', 'application/json');
        }
        catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }

    public function showBySlug(Request $request, Response $response, array $args)
    {
        $slug = $args['slug'];
        try {
            $data = $this->model->getBySlug($slug);
            if (!$data) {
                $response->getBody()->write(json_encode(['error' => 'Campaign not found']));
                return $response->withHeader('Content-Type', 'application/json')->withStatus(404);
            }
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
        try {
            $id = $this->model->create($data);
            $response->getBody()->write(json_encode(['id' => $id, 'message' => 'Campaign created successfully']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(201);
        }
        catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }

    public function update(Request $request, Response $response, array $args)
    {
        $id = $args['id'];
        $data = $request->getParsedBody();
        try {
            $this->model->update($id, $data);
            $response->getBody()->write(json_encode(['message' => 'Campaign updated successfully']));
            return $response->withHeader('Content-Type', 'application/json');
        }
        catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }

    public function delete(Request $request, Response $response, array $args)
    {
        $id = $args['id'];
        try {
            $this->model->delete($id);
            $response->getBody()->write(json_encode(['message' => 'Campaign deleted successfully']));
            return $response->withHeader('Content-Type', 'application/json');
        }
        catch (\Exception $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(500);
        }
    }
}