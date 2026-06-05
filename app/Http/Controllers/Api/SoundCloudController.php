<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Http;

class SoundCloudController extends Controller
{
    public function index(): JsonResponse
    {
        [$accessToken, $refreshTime] = $this->getAccessToken();

        $response = Http::withHeaders([
            'accept' => 'application/json; charset=utf-8',
            'Authorization' => 'OAuth ' . $accessToken,
        ])->get($this->tracksUrl());

        return response()
            ->json($response->json())
            ->withCookie(cookie('at', $accessToken))
            ->withCookie(cookie('rt', $refreshTime));
    }

    public function getTrackUrl(Request $request): JsonResponse
    {
        $trackId = $request->input('trackId');
        [$accessToken, $refreshTime] = $this->getAccessToken();

        $response = Http::withHeaders([
            'accept' => 'application/json; charset=utf-8',
            'Authorization' => 'OAuth ' . $accessToken,
        ])->get(sprintf('https://api.soundcloud.com/tracks/%s/stream', $trackId));

        return response()
            ->json($response->json())
            ->withCookie(cookie('at', $accessToken, 3599 / 60))
            ->withCookie(cookie('rt', $refreshTime));
    }

    protected function getAccessToken(): array
    {
        $accessToken = Cookie::get('at');
        $refreshTime = (int) Cookie::get('rt');

        if (!$accessToken || $refreshTime <= time()) {
            $response = Http::asForm()->post('https://api.soundcloud.com/oauth2/token', [
                'grant_type' => 'client_credentials',
                'client_id' => config('services.soundcloud.client_id'),
                'client_secret' => config('services.soundcloud.client_secret'),
            ]);

            $data = $response->json();
            if (isset($data['access_token'])) {
                $accessToken = $data['access_token'];
                $refreshTime = time() + $data['expires_in'];
            }
        }

        return [$accessToken, $refreshTime];
    }

    private function tracksUrl(): string
    {
        $userId = config('services.soundcloud.user_id');

        return "https://api.soundcloud.com/users/{$userId}/tracks?limit=200&linked_partitioning=true";
    }
}
