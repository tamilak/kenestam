<?php
/**
 * @param $commentsFilePath - cesta k souboru s komentáři
 * @param $productName - Název produktu, ke kterému chcete dostávat komentáře
 * @return array|mixed - vrací buď pole, nebo jiný datový typ: pole, objekt, číslo, řetězec nebo logickou hodnotu.
 * Funkce vrací komentář k určitému produktu ze souboru json. zde je implementována metoda GET pro identifikaci produktu.
 */
function getComments($commentsFilePath, $productName)
{
    $comments = file_exists($commentsFilePath) ? json_decode(file_get_contents($commentsFilePath), true) : [];

    return isset($comments[$productName]) ? $comments[$productName] : [];
}

$commentsFilePath = 'comments.json';

$productName = isset($_GET['product']) ? $_GET['product'] : '';

header('Content-Type: application/json');

echo json_encode(getComments($commentsFilePath, $productName));
?>
