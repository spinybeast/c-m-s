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
            ->get();

        return response()->json($reviews);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'author' => 'required',
            'text' => 'required',
            'socials' => 'array',
            'socials.*' => 'nullable|url',
        ], [
            'required' => 'Заполните все поля',
            'socials.facebook.url' => 'Некорректный формат ссылки Facebook',
            'socials.google.url' => 'Некорректный формат ссылки Google',
            'socials.vkontakte.url' => 'Некорректный формат ссылки VK',
            'socials.instagram.url' => 'Некорректный формат ссылки Instagram',
            'socials.twitter.url' => 'Некорректный формат ссылки Twitter',
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
                'message' => 'Спасибо за ваш отзыв! Он появится на сайте после проверки модератором.'
            ]);
        }
        return response()->json([
            'success' => false,
            'errors' => ['Что-то пошло не так. Попробуйте позднее.']
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
