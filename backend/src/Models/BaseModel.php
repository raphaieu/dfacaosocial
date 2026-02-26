<?php

namespace App\Models;

use App\Models\Database;
use PDO;

abstract class BaseModel
{
    protected $db;
    protected $conn;

    public function __construct()
    {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }
}