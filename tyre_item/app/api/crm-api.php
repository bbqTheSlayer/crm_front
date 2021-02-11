<?php

header('Content-Type: application/json; charset=UTF-8');
$url = 'http://vezemkolesa.ru/crm-api?' . $_SERVER['QUERY_STRING'];
$a = json_decode(file_get_contents($url), true);
$a['url'] = $url;
echo json_encode($a);