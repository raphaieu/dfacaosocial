<?php

namespace App\Models;

use PDO;

class Contact extends BaseModel
{
    public function getAll($limit = 50)
    {
        $query = "SELECT * FROM contacts ORDER BY created_at DESC LIMIT :limit";
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $query = "INSERT INTO contacts (name, email, phone, message, is_volunteer) 
                  VALUES (:name, :email, :phone, :message, :is_volunteer) RETURNING id";

        $stmt = $this->conn->prepare($query);

        // Explicit boolean casting for PostgreSQL compatibility
        $is_volunteer = isset($data['is_volunteer']) ? (bool)$data['is_volunteer'] : false;

        $stmt->execute([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'message' => $data['message'] ?? null,
            'is_volunteer' => $is_volunteer ? 'true' : 'false'
        ]);

        return $stmt->fetch(PDO::FETCH_ASSOC)['id'];
    }
}