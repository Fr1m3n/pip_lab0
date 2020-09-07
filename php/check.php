<?php

session_start();

if (!isset($_SESSION['results'])) {
    $_SESSION['results'] = array();
}

$x = $_POST['value_x'];
$y = $_POST['value_y'];
$r = $_POST['value_r'];

date_default_timezone_set("Europe/Moscow");


function check($x, $y, $r)
{
    // Проверяем четверть, в которой находится точка
    if ($x >= 0) {
        if ($y >= 0) {
            return check1($x, $y, $r);
        } else {
            return check4($x, $y, $r);
        }
    } else {
        if ($y > 0) {
            return check2($x, $y, $r);
        } else {
            return check3($x, $y, $r);
        }
    }
}


//Функции проверки для каждой четверти простравнства
function check1($x, $y, $r)
{
    return $x == 0 && $y <= ($r / 2) ||
        $y == 0 && $x <= $r;

}

function check2($x, $y, $r)
{
    return $y <= $x + ($r / 2);
}

function check3($x, $y, $r)
{
    return $x == 0 && $y >= -$r ||
        $y == 0 && $x >= -$r ||
        sqrt(($x * $x) + ($y * $y)) <= $r;
}

function check4($x, $y, $r)
{
    return $x <= $r && $y >= -$r;
}

function checkInput($x, $y, $r) {
    if (!is_numeric($x) || !is_numeric($y) || !is_numeric($r)) {
        return false;
    } else {
        if ($x < -3.0 || $x > 3.0 || $y < -3.0 || $y > 3.0) {
            return false;
        }
        if (!in_array($r, array(1.0, 1.5, 2.0, 2.5, 3))) {
            return false;
        }
    }
    return true;
}

function buildResult($state) {
    $class = $state ? "result-success" : "result-failed";
    return "<span class=" . $class . ">" . ($state ? "Успешно" : "Чёт не то") . "</span>";
}

$currentTime = date("H:i:s");
$startTime = microtime(true);

if (checkInput($x, $y, $r)) {
    array_push(
        $_SESSION['results'],
        array(
            $x,
            $y,
            $r,
            buildResult(check($x, $y, $r)),
            $currentTime,
            microtime(true) - $startTime
        )
    );
}

include 'table.php';

