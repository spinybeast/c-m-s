<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email',
            'text' => 'required|string'
        ]);

        Mail::send('mail', ['request' => $request], function(Message $message) use ($request) {
           $message
               ->from($request->get('email'), $request->get('name'))
               ->to(config('mail.admin'))
               ->subject('Обращение с сайта cyclone-music-space.ru');
        });

        return response()->json([
            'success' => true,
            'message' => 'Спасибо за ваше обращение! Мы скоро ответим.'
        ]);
    }
}
