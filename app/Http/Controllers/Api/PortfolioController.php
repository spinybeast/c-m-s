<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Track;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class PortfolioController extends Controller
{
    public function index(): JsonResponse
    {
        $tracks = Track::orderBy('created_at', 'desc')->get();
        return response()->json($tracks);
    }

    public function getTrack(string $filename)
    {
        $path = Track::AUDIO_PATH . $filename;
        if (Storage::disk('public')->exists($path)) {
            $response = new BinaryFileResponse(public_path($path));
            BinaryFileResponse::trustXSendfileTypeHeader();
            return $response;
        }
        abort(404);
    }
}
