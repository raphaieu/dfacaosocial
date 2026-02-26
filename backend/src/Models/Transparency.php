<?php

namespace App\Models;

use PDO;

class Transparency extends BaseModel
{
    public function getAll()
    {
        $query = "SELECT t.*, c.title as campaign_title 
                  FROM transparencies t 
                  LEFT JOIN campaigns c ON t.campaign_id = c.id 
                  ORDER BY t.date_reported DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $transparencies = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch files for each transparency
        foreach ($transparencies as &$t) {
            $t['files'] = $this->getFilesByTransparencyId($t['id']);
        }

        return $transparencies;
    }

    public function getByCampaignId($campaignId)
    {
        $query = "SELECT * FROM transparencies WHERE campaign_id = :campaign_id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':campaign_id', $campaignId);
        $stmt->execute();
        $transparency = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($transparency) {
            $transparency['files'] = $this->getFilesByTransparencyId($transparency['id']);
        }

        return $transparency;
    }

    public function getFilesByTransparencyId($transparencyId)
    {
        $query = "SELECT * FROM transparency_files WHERE transparency_id = :transparency_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':transparency_id', $transparencyId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        try {
            $this->conn->beginTransaction();

            $query = "INSERT INTO transparencies (campaign_id, title, description, amount_collected, resources_collected, date_reported) 
                      VALUES (:campaign_id, :title, :description, :amount_collected, :resources_collected, :date_reported) RETURNING id";

            $stmt = $this->conn->prepare($query);
            $stmt->execute([
                'campaign_id' => $data['campaign_id'] ?? null,
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'amount_collected' => $data['amount_collected'] ?? 0.00,
                'resources_collected' => $data['resources_collected'] ?? null,
                'date_reported' => $data['date_reported'] ?? date('Y-m-d')
            ]);

            $transparencyId = $stmt->fetch(PDO::FETCH_ASSOC)['id'];

            if (isset($data['files']) && is_array($data['files'])) {
                foreach ($data['files'] as $file) {
                    $this->addFile($transparencyId, $file);
                }
            }

            $this->conn->commit();
            return $transparencyId;
        }
        catch (\Exception $e) {
            $this->conn->rollBack();
            throw $e;
        }
    }

    public function addFile($transparencyId, $fileData)
    {
        $query = "INSERT INTO transparency_files (transparency_id, file_url, file_name, file_type) 
                  VALUES (:transparency_id, :file_url, :file_name, :file_type)";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([
            'transparency_id' => $transparencyId,
            'file_url' => $fileData['file_url'],
            'file_name' => $fileData['file_name'] ?? null,
            'file_type' => $fileData['file_type'] ?? null
        ]);
    }
}