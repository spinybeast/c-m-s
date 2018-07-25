<?php

namespace App\Http\Controllers\Api;

use App\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class ReviewController extends Controller
{

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
            'socials' => 'array',
            'socials.*' => 'nullable|url',
        ], [
            'required' => __('messages.reviews.required'),
            'socials.facebook.url' => __('messages.reviews.formatUrl', ['url' => 'Facebook']),
            'socials.google.url' => __('messages.reviews.formatUrl', ['url' => 'Google']),
            'socials.vkontakte.url' => __('messages.reviews.formatUrl', ['url' => 'VK']),
            'socials.instagram.url' => __('messages.reviews.formatUrl', ['url' => 'Instagram']),
            'socials.twitter.url' => __('messages.reviews.formatUrl', ['url' => 'Twitter'])
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => array_flatten($validator->errors()->all())
            ]);
        }

        $review = new Review();
        $review->fill($request->only(['author', 'company', 'text', 'socials']));

        if ($request->get('photo')) {
            $this->uploadPhoto($request, $review);
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
        $extension = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
        $name = str_slug(uniqid($review->author)) . '.' . $extension;
        \Image::make($image)->save(public_path(Review::AVATAR_PATH) . $name);

        $review->photo = $name;
    }

}
