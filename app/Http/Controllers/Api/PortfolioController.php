<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Track;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PortfolioController extends Controller
{
    private const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp3', 'm4a', 'wav', 'ogg'];

    public function index(): JsonResponse
    {
        $tracks = Track::orderBy('created_at', 'desc')->get();

        return response()->json($tracks);
    }

    public function getTrack(string $filename): BinaryFileResponse
    {
        $this->guardFilename($filename);
        $path = Track::AUDIO_PATH . $filename;

        return $this->getFile($path);
    }

    public function getCover(string $filename): BinaryFileResponse
    {
        $this->guardFilename($filename);
        $path = Track::COVER_PATH . $filename;

        return $this->getFile($path);
    }

    protected function getFile(string $path): BinaryFileResponse
    {
        $relativePath = ltrim($path, '/');
        $absolutePath = public_path($relativePath);

        if (!is_file($absolutePath)) {
            abort(404);
        }

        $response = new BinaryFileResponse($absolutePath);
        BinaryFileResponse::trustXSendfileTypeHeader();

        return $response;
    }

    private function guardFilename(string $filename): void
    {
        if ($filename !== basename($filename)) {
            abort(404);
        }

        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        if (!$extension || !in_array($extension, self::ALLOWED_EXTENSIONS, true)) {
            abort(404);
        }
    }
}
