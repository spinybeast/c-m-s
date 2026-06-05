<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'text' => 'required|string',
        ]);

        try {
            Mail::send(new ContactMessage(
                $validated['name'],
                $validated['email'],
                $validated['text'],
            ));
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'exception' => $e->getMessage(),
                'errors' => [__('messages.contact.fail')],
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => __('messages.contact.success'),
        ]);
    }
}
