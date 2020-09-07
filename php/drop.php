<?php
if (!isset($_SESSION)) {
    session_start();
}

$_SESSION["results"] = array();

include "table.php";