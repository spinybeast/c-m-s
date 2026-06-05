<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

class ReviewController extends Controller
{
    private const IMAGE_MIME_EXTENSION_MAP = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/gif' => 'gif',
        'image/webp' => 'webp',
    ];

    public function index(): View
    {
        $reviews = Review::paginate(10);

        return view('admin.review.index', compact('reviews'));
    }

    public function create(): View
    {
        return view('admin.review.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $review = new Review();
        $this->validateRequest($request);
        $this->fillAndSaveReview($request, $review);

        return redirect(route('reviews.index'));
    }

    public function edit(Review $review): View
    {
        return view('admin.review.edit', compact('review'));
    }

    public function update(Request $request, Review $review): RedirectResponse
    {
        $this->validateRequest($request);
        $this->fillAndSaveReview($request, $review);

        return redirect()->back()->with('success', 'Отзыв успешно отредактирован');
    }

    public function destroy(Review $review): RedirectResponse
    {
        $review->delete();

        return redirect()->back();
    }

    private function validateRequest(Request $request): void
    {
        $request->validate([
            'author' => 'required',
            'text' => 'required',
            'priority' => 'nullable|numeric',
            'photo' => 'nullable|file|mimetypes:image/jpeg,image/png,image/gif,image/webp|max:5120',
            'socials' => 'array',
            'socials.*' => 'nullable|url',
        ]);
    }

    private function fillAndSaveReview(Request $request, Review $review): void
    {
        $review->fill($request->only($review->getFillable()));

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo');
            $name = Str::slug(uniqid($request->author, true)) . '.' . $this->resolveImageExtension($photo);
            $photo->move(public_path(Review::AVATAR_PATH), $name);
            $review->photo = $name;
        }

        $review->published = $request->has('published');
        $review->save();
    }

    private function resolveImageExtension(UploadedFile $file): string
    {
        $mimeType = (string) $file->getMimeType();
        if (!isset(self::IMAGE_MIME_EXTENSION_MAP[$mimeType])) {
            throw ValidationException::withMessages([
                'photo' => ['Недопустимый тип изображения.'],
            ]);
        }

        return self::IMAGE_MIME_EXTENSION_MAP[$mimeType];
    }
}
