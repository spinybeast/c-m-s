<?php

namespace App\Http\Controllers\Admin;

use App\Review;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReviewController extends Controller
{

    public function index()
    {
        $reviews = Review::all();
        return view('admin.review.index', compact('reviews'));
    }

    public function create()
    {
        return view('admin.review.create');
    }

    public function store(Request $request)
    {
        $review = new Review();

        $this->validateRequest($request);
        $this->fillAndSaveReview($request, $review);

        return redirect(route('reviews.index'));
    }

    public function edit(Review $review)
    {
        return view('admin.review.edit', compact('review'));
    }

    public function update(Request $request, Review $review)
    {
        $this->validateRequest($request);
        $this->fillAndSaveReview($request, $review);

        return redirect()->back()->with('success', 'Отзыв успешно отредактирован');
    }

    public function destroy(Review $review)
    {
        try {
            $review->delete();
        } catch (\Exception $exception) {
        }

        return redirect()->back();
    }


    private function validateRequest(Request $request): void
    {
        $this->validate($request, [
            'author' => 'required',
            'text' => 'required',
            'priority' => 'nullable|numeric',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'socials' => 'array',
            'socials.*' => 'nullable|url'
        ]);
    }

    private function fillAndSaveReview(Request $request, Review $review): void
    {
        $review->fill($request->only($review->getFillable()));

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $name = str_slug(uniqid($request->author)) . '.' . $photo->getClientOriginalExtension();
            $photo->move(public_path(Review::AVATAR_PATH), $name);
            $review->photo = $name;
        }
        $review->published = $request->has('published');

        $review->save();
    }
}
