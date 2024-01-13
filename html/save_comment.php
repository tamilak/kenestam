<?php

/**
 * @param $commentsFilePath - cesta k souboru s komentářem
 * @param $comment - komentář zadaný uživatelem k určitému výrobku.
 * @param $productName - produkt, ke kterému se váže komentář zanechaný uživatelem.
 * funkce uloží komentář spojený s konkrétním produktem. Pokud jej uloží, je stav úspěšný, pokud ne - chyba. Obsahuje data odeslaná na server pomocí metody POST.
 */
function saveComment($commentsFilePath, $comment, $productName)
{
    $productComments = file_exists($commentsFilePath) ? json_decode(file_get_contents($commentsFilePath), true) : [];

    $productComments[$productName][] = $comment;

    if (file_put_contents($commentsFilePath, json_encode($productComments, JSON_PRETTY_PRINT))) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to save comments']);
    }
}

$comment = isset($_POST['comment']) ? $_POST['comment'] : '';
$productName = isset($_POST['product']) ? $_POST['product'] : '';

if ($comment !== '' && $productName !== '') {
    saveComment('comments.json', $comment, $productName);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No comment or product provided']);
}
?>
