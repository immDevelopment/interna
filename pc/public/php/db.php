<?php
define("ENTORNO_DESARROLLO", "true");
define ("SQLSERVER_SERVER_NAME", "SRVLOGIC\LOGICCLASS");
define ("SQLSERVER_UID", "logic");
define ("SQLSERVER_PASS", "osiris");
define ("SQLSERVER_DB", "LC_MILENIO");

define ("SQLSERVER_DSN", (ENTORNO_DESARROLLO?"sqlsrv:Server=" .SQLSERVER_SERVER_NAME. ";Database=" . SQLSERVER_DB:"dblib:version=8.0;charset=UTF-8;host=" .SQLSERVER_SERVER_NAME. ":1433;dbname=" . SQLSERVER_DB));

try {
  $pdo = new PDO(SQLSERVER_DSN, SQLSERVER_UID, SQLSERVER_PASS);
}
catch (Exception $e) {
  die("ERROR -&gt; No se puede conectar con la base de datos: $e");
}
