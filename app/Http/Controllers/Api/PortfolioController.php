<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Track;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PortfolioController extends Controller
{
    private const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp3', 'm4a', 'wav', 'ogg'];

    public function index(): JsonResponse
    {
        $tracks = Track::orderBy('created_at', 'desc')->get();
        return response()->json($tracks);
    }

    public function getTrack(string $filename)
    {
        $this->guardFilename($filename);
        $path = Track::AUDIO_PATH . $filename;
        return $this->getFile($path);
    }

    public function getCover(string $filename)
    {
        $this->guardFilename($filename);
        $path = Track::COVER_PATH . $filename;
        return $this->getFile($path);
    }

    /**
     * @param string $path
     * @return BinaryFileResponse|void
     */
    protected function getFile(string $path)
    {
        if (Storage::disk('public')->exists($path)) {
            $response = new BinaryFileResponse(public_path($path));
            BinaryFileResponse::trustXSendfileTypeHeader();
            return $response;
        }
        abort(404);
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
