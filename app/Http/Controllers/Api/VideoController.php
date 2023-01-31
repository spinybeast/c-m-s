<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Video;
use Illuminate\Http\JsonResponse;

class VideoController extends Controller
{
    public function index(): JsonResponse
    {
        $videos = Video::orderBy('created_at', 'desc')->get();
        return response()->json($videos);
    }
}