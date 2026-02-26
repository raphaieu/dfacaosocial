<?php

namespace App\Models;

use PDO;

class Campaign extends BaseModel
{
    public function getAll($limit = 10, $offset = 0)
    {
        $query = "SELECT * FROM campaigns ORDER BY published_at DESC LIMIT :limit OFFSET :offset";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getById($id)
    {
        $query = "SELECT * FROM campaigns WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getBySlug($slug)
    {
        $query = "SELECT * FROM campaigns WHERE slug = :slug";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':slug', $slug);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $query = "INSERT INTO campaigns (title, slug, excerpt, content, category, thumbnail, gallery, featured, published_at) 
                  VALUES (:title, :slug, :excerpt, :content, :category, :thumbnail, :gallery, :featured, :published_at) RETURNING id";

        $stmt = $this->conn->prepare($query);

        // Explicit boolean casting for PostgreSQL compatibility
        $featured = isset($data['featured']) ? (bool)$data['featured'] : false;

        $stmt->execute([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'excerpt' => $data['excerpt'] ?? null,
            'content' => $data['content'] ?? null,
            'category' => $data['category'] ?? null,
            'thumbnail' => $data['thumbnail'] ?? null,
            'gallery' => $data['gallery'] ?? null,
            'featured' => $featured ? 'true' : 'false',
            'published_at' => $data['published_at'] ?? date('Y-m-d H:i:s')
        ]);

        return $stmt->fetch(PDO::FETCH_ASSOC)['id'];
    }

    public function update($id, $data)
    {
        $query = "UPDATE campaigns SET 
                  title = :title, 
                  slug = :slug, 
                  excerpt = :excerpt, 
                  content = :content, 
                  category = :category, 
                  thumbnail = :thumbnail, 
                  gallery = :gallery,
                  featured = :featured, 
                  published_at = :published_at 
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        // Explicit boolean casting for PostgreSQL compatibility
        $featured = isset($data['featured']) ? (bool)$data['featured'] : false;

        return $stmt->execute([
            'id' => $id,
            'title' => $data['title'],
            'slug' => $data['slug'],
            'excerpt' => $data['excerpt'] ?? null,
            'content' => $data['content'] ?? null,
            'category' => $data['category'] ?? null,
            'thumbnail' => $data['thumbnail'] ?? null,
            'gallery' => $data['gallery'] ?? null,
            'featured' => $featured ? 'true' : 'false',
            'published_at' => $data['published_at'] ?? (isset($data['published_at']) ? $data['published_at'] : date('Y-m-d H:i:s'))
        ]);
    }

    public function delete($id)
    {
        $query = "DELETE FROM campaigns WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}