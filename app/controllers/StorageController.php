<?php

namespace app\controllers;

use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StorageController
{
    /**
     * @Route("/storage/{filename}", name="storage_file")
     */
    public function handle(Request $request, Response $response, $filename)
    {
        $filePath = __DIR__ . '/../../storage/' . $filename . "." . $request->query->get("mime") ?? "";

        // Check if the file exists
        if (file_exists($filePath)) {
            // Get the MIME type of the file
            $fileMimeType = mime_content_type($filePath);

            // Read the file content
            $fileContent = file_get_contents($filePath);

            $response->setContent($fileContent);
            $response->headers->set("Content-Type", "text/css");
        } else {
            $response->setStatusCode(404);
        }



        // Dosyayı yanıt olarak döndürün
        return $response;
    }
}