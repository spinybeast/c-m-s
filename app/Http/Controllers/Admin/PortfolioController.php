<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Track;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\View\View;

class PortfolioController extends Controller
{
    private const COVER_MIME_EXTENSION_MAP = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/gif' => 'gif',
        'image/webp' => 'webp',
    ];

    private const AUDIO_MIME_EXTENSION_MAP = [
        'audio/mpeg' => 'mp3',
        'audio/mp3' => 'mp3',
        'audio/mp4' => 'm4a',
        'audio/x-m4a' => 'm4a',
        'audio/wav' => 'wav',
        'audio/x-wav' => 'wav',
        'audio/ogg' => 'ogg',
        'audio/vorbis' => 'ogg',
    ];

    public function index(): View
    {
        $tracks = Track::paginate(15);

        return view('admin.portfolio.index', compact('tracks'));
    }

    public function create(): View
    {
        return view('admin.portfolio.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $track = new Track();
        $this->validateRequest($request);
        $this->fillAndSave($request, $track);

        return redirect(route('portfolio.index'));
    }

    public function edit(Track $portfolio): View
    {
        return view('admin.portfolio.edit', ['track' => $portfolio]);
    }

    public function update(Request $request, Track $portfolio): RedirectResponse
    {
        $this->validateRequest($request);
        $this->fillAndSave($request, $portfolio);

        return redirect()->back()->with('success', 'Трек успешно отредактирован');
    }

    public function destroy(Track $portfolio): RedirectResponse
    {
        $filesystem = Storage::disk('public');

        if ($portfolio->getOriginal('cover')) {
            $path = Track::COVER_PATH . $portfolio->getOriginal('cover');
            if ($filesystem->exists($path)) {
                $filesystem->delete($path);
            }
        }

        if ($portfolio->getOriginal('audio')) {
            $path = Track::AUDIO_PATH . $portfolio->getOriginal('audio');
            if ($filesystem->exists($path)) {
                $filesystem->delete($path);
            }
        }

        $portfolio->delete();

        return redirect()->back();
    }

    private function validateRequest(Request $request): void
    {
        $request->validate([
            'title' => 'required',
            'tags' => 'required',
            'cover' => 'nullable|file|mimetypes:image/jpeg,image/png,image/gif,image/webp|max:5120',
            'audio' => 'nullable|file|mimetypes:audio/mpeg,audio/mp3,audio/mp4,audio/x-m4a,audio/wav,audio/x-wav,audio/ogg,audio/vorbis|max:20480',
        ]);
    }

    private function fillAndSave(Request $request, Track $portfolio): void
    {
        $portfolio->fill($request->only($portfolio->getFillable()));

        if ($request->hasFile('cover')) {
            $cover = $request->file('cover');
            $name = Str::slug(uniqid($request->title, true)) . '.' . $this->resolveCoverExtension($cover);
            $cover->move(public_path(Track::COVER_PATH), $name);
            $portfolio->cover = $name;
        }

        if ($request->hasFile('audio')) {
            $audio = $request->file('audio');
            $name = Str::slug(uniqid($request->title, true)) . '.' . $this->resolveAudioExtension($audio);
            $audio->move(public_path(Track::AUDIO_PATH), $name);
            $portfolio->audio = $name;
        }

        $portfolio->save();
    }

    private function resolveCoverExtension(UploadedFile $file): string
    {
        $mimeType = (string) $file->getMimeType();
        if (!isset(self::COVER_MIME_EXTENSION_MAP[$mimeType])) {
            throw ValidationException::withMessages([
                'cover' => ['Недопустимый тип изображения.'],
            ]);
        }

        return self::COVER_MIME_EXTENSION_MAP[$mimeType];
    }

    private function resolveAudioExtension(UploadedFile $file): string
    {
        $mimeType = (string) $file->getMimeType();
        if (!isset(self::AUDIO_MIME_EXTENSION_MAP[$mimeType])) {
            throw ValidationException::withMessages([
                'audio' => ['Недопустимый тип аудиофайла.'],
            ]);
        }

        return self::AUDIO_MIME_EXTENSION_MAP[$mimeType];
    }
}
