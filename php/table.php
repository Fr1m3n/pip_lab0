<?php
if (!isset($_SESSION)) session_start();
if (!isset($_SESSION["results"])) $_SESSION["results"] = array();
?>
<table>
    <tr>
        <th>Дата</th>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Результат</th>
        <th>Затраченное время</th>
    </tr>
    <?php foreach ($_SESSION["results"] as $result) { ?>
        <tr>
            <td><?php echo $result[4] ?></td>
            <td><?php echo $result[0] ?></td>
            <td><?php echo $result[1] ?></td>
            <td><?php echo $result[2] ?></td>
            <td><?php echo $result[3] ?></td>
            <td><?php echo number_format($result[5] * 1000000, 2, ',', '') ?></td>
        </tr>
    <?php } ?>
</table>
