<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class VideoController extends Controller
{
    public function index(): View
    {
        $videos = Video::paginate(15);

        return view('admin.video.index', compact('videos'));
    }

    public function create(): View
    {
        return view('admin.video.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $video = new Video();
        $this->validateRequest($request);
        $this->fillAndSave($request, $video);

        return redirect(route('video.index'));
    }

    public function edit(Video $video): View
    {
        return view('admin.video.edit', ['video' => $video]);
    }

    public function update(Request $request, Video $video): RedirectResponse
    {
        $this->validateRequest($request);
        $this->fillAndSave($request, $video);

        return redirect()->back()->with('success', 'Видео успешно отредактировано');
    }

    public function destroy(Video $video): RedirectResponse
    {
        $video->delete();

        return redirect()->back();
    }

    private function validateRequest(Request $request): void
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'url' => 'required',
            'tags' => 'required',
        ]);
    }

    private function fillAndSave(Request $request, Video $video): void
    {
        $video->fill($request->only($video->getFillable()));
        $video->save();
    }
}
