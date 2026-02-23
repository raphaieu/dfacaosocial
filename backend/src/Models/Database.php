<?php

namespace App\Models;

use PDO;
use PDOException;

class Database
{
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $port;
    public $conn;

    public function __construct()
    {
        $databaseUrl = $_ENV['DATABASE_URL'] ?? getenv('DATABASE_URL');
        if (!$databaseUrl) {
            throw new \Exception("DATABASE_URL environment variable is not set.");
        }

        $url = parse_url($databaseUrl);

        if (!$url || !isset($url['host'])) {
            throw new \Exception("Invalid DATABASE_URL format.");
        }

        $this->host = $url['host'];
        $this->port = $url['port'] ?? 5432;
        $this->db_name = ltrim($url['path'] ?? '', '/');
        $this->username = $url['user'] ?? '';
        $this->password = $url['pass'] ?? '';
    }

    public function getConnection()
    {
        $this->conn = null;

        try {
            $dsn = "pgsql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name;
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}