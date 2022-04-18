<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class SoundCloudController
{
    const CLIENT_ID = "f7844a0d2655ff6424cda2891baa462d";
    const CLIENT_SECRET = "36078b4b48e44eccf64c868e983cf804";
    const TOKEN_URL = "https://api.soundcloud.com/oauth2/token";
    const TRACKS_URL = "https://api.soundcloud.com/users/108057656/tracks?limit=200&linked_partitioning=true";
    const TRACK_URL = "https://api.soundcloud.com/tracks/%s/stream";

    public function index(): JsonResponse
    {
        list ($accessToken, $refreshTime) = $this->getAccessToken();
        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, self::TRACKS_URL);
        $headers = array(
            'accept: application/json; charset=utf-8',
            'Content-Type: application/json',
            'Authorization: OAuth ' . $accessToken
        );
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $response = json_decode(curl_exec($curl));
        curl_close($curl);

        return response()
            ->json($response)
            ->withCookie(\cookie('at', $accessToken))
            ->withCookie(\cookie('rt', $refreshTime));
    }

    public function getTrackUrl(Request $request) {
        $trackId = $request->input('trackId');
        list ($accessToken, $refreshTime) = $this->getAccessToken();
        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL, sprintf(self::TRACK_URL, $trackId));
        $headers = array(
            'accept: application/json; charset=utf-8',
            'Content-Type: application/json',
            'Authorization: OAuth ' . $accessToken
        );
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($curl);
        curl_close($curl);

        return response()
            ->json(json_decode($response))
            ->withCookie(\cookie('at', $accessToken, 3599 / 60))
            ->withCookie(\cookie('rt', $refreshTime));
    }

    protected function getAccessToken(): array
    {
        try {
            $accessToken = Cookie::get('at');
            $refreshTime = Cookie::get('rt');

            if (!$accessToken || $refreshTime <= time()) {
                $curl = curl_init();

                curl_setopt($curl, CURLOPT_URL, self::TOKEN_URL);
                curl_setopt($curl, CURLOPT_POST, 1);
                curl_setopt($curl, CURLOPT_POSTFIELDS,
                    "grant_type=client_credentials&client_id=" . self::CLIENT_ID . "&client_secret=" . self::CLIENT_SECRET);
                curl_setopt($curl, CURLOPT_HTTPHEADER, array('accept: application/json; charset=utf-8', 'Content-Type: application/x-www-form-urlencoded'));
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

                $response = curl_exec($curl);
                curl_close($curl);
                $res = json_decode($response);
                if (property_exists($res, 'access_token')) {
                    $accessToken = $res->access_token;
                    $refreshTime = time() + $res->expires_in;
                }
            }
            return [$accessToken, $refreshTime];
        } catch (\Exception $e) {
            return [];
        }
    }
}
