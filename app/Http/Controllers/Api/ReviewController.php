<?php

namespace App\Http\Controllers\Api;

use App\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use Validator;

class ReviewController extends Controller
{
    private const IMAGE_MIME_EXTENSION_MAP = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/gif' => 'gif',
        'image/webp' => 'webp',
    ];

    public function index(): JsonResponse
    {
        $reviews = Review::where('published', 1)
            ->orderBy('priority', 'desc')
            ->latest()
            ->get();

        return response()->json($reviews);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'author' => 'required|string',
            'text' => 'required|string',
            'photo' => ['nullable', 'string', 'regex:/^data:image\/(jpeg|jpg|png|gif|webp);base64,/i'],
            'socials' => 'array',
            'socials.*' => 'nullable|url',
        ], [
            'required' => __('messages.reviews.required'),
            'photo.regex' => __('validation.image'),
            'socials.facebook.url' => __('messages.reviews.formatUrl', ['url' => 'Facebook']),
            'socials.google.url' => __('messages.reviews.formatUrl', ['url' => 'Google']),
            'socials.vkontakte.url' => __('messages.reviews.formatUrl', ['url' => 'VK']),
            'socials.instagram.url' => __('messages.reviews.formatUrl', ['url' => 'Instagram']),
            'socials.twitter.url' => __('messages.reviews.formatUrl', ['url' => 'Twitter'])
        ]);

        try {
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => array_flatten($validator->errors()->all())
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'errors' => [__('messages.somethingWrong')],
                'exception' => $e->getMessage()
            ]);
        }

        $review = new Review();
        $review->fill($request->only(['author', 'company', 'text', 'socials']));

        if ($request->get('photo')) {
            try {
                $this->uploadPhoto($request, $review);
            } catch (ValidationException $e) {
                return response()->json([
                    'success' => false,
                    'errors' => array_flatten($e->errors()),
                ]);
            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'errors' => [__('messages.somethingWrong')],
                ]);
            }
        }

        if ($review->save()) {
            return response()->json([
                'success' => true,
                'message' => __('messages.reviews.success')
            ]);
        }
        return response()->json([
            'success' => false,
            'errors' => [__('messages.somethingWrong')]
        ]);
    }

    private function uploadPhoto(Request $request, Review $review): void
    {
        $image = $request->get('photo');
        $image = \Image::make($image);
        $mimeType = (string)$image->mime();
        if (!isset(self::IMAGE_MIME_EXTENSION_MAP[$mimeType])) {
            throw ValidationException::withMessages([
                'photo' => [__('validation.image')],
            ]);
        }

        $name = str_slug(uniqid($review->author, true)) . '.' . self::IMAGE_MIME_EXTENSION_MAP[$mimeType];
        $image->save(public_path(Review::AVATAR_PATH) . $name);

        $review->photo = $name;
    }

}
