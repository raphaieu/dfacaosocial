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
        $url = parse_url($_ENV['DATABASE_URL']);

        $this->host = $url['host'];
        $this->port = $url['port'] ?? 5432;
        $this->db_name = ltrim($url['path'], '/');
        $this->username = $url['user'];
        $this->password = $url['pass'];
    }

    public function getConnection()
    {
        $this->conn = null;

        try {
            $dsn = "pgsql:host=" . $this->host . ";port=" . $this->port . ";dbname=" . $this->db_name;
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ATTR_ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        }
        catch (PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}