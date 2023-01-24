<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Video;
use Illuminate\Contracts\View\Factory;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\View\View;

class VideoController extends Controller
{
    /**
     * @return Factory|Application|View
     */
    public function index()
    {
        $videos = Video::paginate(15);
        return view('admin.video.index', compact('videos'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|Application|View
     */
    public function create()
    {
        return view('admin.video.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Application|Redirector|RedirectResponse
     */
    public function store(Request $request)
    {
        $video = new Video();

        $this->validateRequest($request);
        $this->fillAndSave($request, $video);

        return redirect(route('video.index'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Video $video
     * @return Application|Factory|View
     */
    public function edit(Video $video)
    {
        return view('admin.video.edit', ['video' => $video]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Video $video
     * @return RedirectResponse
     */
    public function update(Request $request, Video $video): RedirectResponse
    {
        $this->validateRequest($request);
        $this->fillAndSave($request, $video);

        return redirect()->back()->with('success', 'Видео успешно отредактировано');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Video $video
     * @return RedirectResponse
     * @throws \Exception
     */
    public function destroy(Video $video): RedirectResponse
    {
        $video->delete();
        return redirect()->back();
    }

    private function validateRequest(Request $request): void
    {
        $this->validate($request, [
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
