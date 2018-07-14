<?php

namespace App\Http\Controllers\Api;

use App\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReviewController extends Controller
{

    public function index(): JsonResponse
    {
        $reviews = Review::where('published', 1)->get();
        return response()->json($reviews);
    }

    public function store(Request $request): Review
    {
        $review = new Review();
        $review->fill($request->only(['author', 'company', 'text']));

        $review->save();
        return $review;
    }

}
