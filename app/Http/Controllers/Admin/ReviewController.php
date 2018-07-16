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
        $this->validateRequest($request);

        $review = new Review();

        $review->fill($request->only(['author', 'company', 'text', 'published', 'priority']));

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $name = str_slug(uniqid($request->author)) . '.' . $photo->getClientOriginalExtension();
            $photo->move(public_path(Review::AVATAR_PATH), $name);
            $review->photo = $name;
        }

        $review->save();

        return redirect(route('reviews.index'));
    }

    public function edit(Review $review)
    {
        return view('admin.review.edit', compact('review'));
    }

    public function update(Request $request, Review $review)
    {
        $this->validateRequest($request);

        $review->fill($request->only(['author', 'company', 'text', 'published', 'priority']));

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $name = str_slug(uniqid($request->author)) . '.' . $photo->getClientOriginalExtension();
            $photo->move(public_path(Review::AVATAR_PATH), $name);
            $review->photo = $name;
        }

        $review->save();

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
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
    }
}
