<?php

header('Content-Type: application/json; charset=UTF-8');
// echo 'http://vezemkolesa.ru/crm-api?' . $_SERVER['QUERY_STRING'];
echo file_get_contents('http://vezemkolesa.ru/crm-api?' . $_SERVER['QUERY_STRING']);