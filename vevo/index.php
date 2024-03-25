<?php
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        require_once 'vevo/getugyfelek.php';
        break;
    case 'POST':
        require_once 'vevo/postugyfel.php';
        break;
    case 'DELETE':
        require_once 'vevo/deleteugyfel.php';
        break;
    case 'PUT':
        require_once 'vevo/putugyfel.php';
        break;
    default:
        break;
}