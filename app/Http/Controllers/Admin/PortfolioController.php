<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Track;
use Exception;
use Illuminate\Contracts\View\Factory;
use Illuminate\Foundation\Application;
use Illuminate\Http\File;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class PortfolioController extends Controller
{
    /**
     * @return Factory|Application|View
     */
    public function index()
    {
        $tracks = Track::paginate(15);
        return view('admin.portfolio.index', compact('tracks'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Factory|Application|View
     */
    public function create()
    {
        return view('admin.portfolio.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Application|Redirector|RedirectResponse
     */
    public function store(Request $request)
    {
        $track = new Track();

        $this->validateRequest($request);
        $this->fillAndSave($request, $track);

        return redirect(route('portfolio.index'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Track $portfolio
     * @return Application|Factory|View
     */
    public function edit(Track $portfolio)
    {
        return view('admin.portfolio.edit', ['track' => $portfolio]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Track $portfolio
     * @return RedirectResponse
     */
    public function update(Request $request, Track $portfolio): RedirectResponse
    {
        $this->validateRequest($request);
        $this->fillAndSave($request, $portfolio);

        return redirect()->back()->with('success', 'Трек успешно отредактирован');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Track $portfolio
     * @return RedirectResponse
     * @throws Exception
     */
    public function destroy(Track $portfolio): RedirectResponse
    {
        $portfolio->delete();
        $filesystem = Storage::disk('public');

        if ($portfolio->cover) {
            $path = Track::COVER_PATH . $portfolio->getOriginal('cover');
            if ($filesystem->exists($path)) {
                $filesystem->delete($path);
            }
        }
        if ($portfolio->audio) {
            $path = Track::AUDIO_PATH . $portfolio->getOriginal('audio');
            if ($filesystem->exists($path)) {
                $filesystem->delete($path);
            }
        }

        return redirect()->back();
    }

    private function validateRequest(Request $request): void
    {
        $this->validate($request, [
            'title' => 'required',
            'tags' => 'required',
//            'audio' => 'required',
//            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    }

    private function fillAndSave(Request $request, Track $portfolio): void
    {
        $portfolio->fill($request->only($portfolio->getFillable()));

        if ($request->hasFile('cover')) {
            $cover = $request->file('cover');
            $name = str_slug(uniqid($request->title)) . '.' . $cover->getClientOriginalExtension();
            $cover->move(public_path(Track::COVER_PATH), $name);
            $portfolio->cover = $name;
        }
        if ($request->hasFile('audio')) {
            $audio = $request->file('audio');
            $name = str_slug(uniqid($request->title)) . '.' . $audio->getClientOriginalExtension();
            $audio->move(public_path(Track::AUDIO_PATH), $name);
            $portfolio->audio = $name;
        }

        $portfolio->save();
    }
}
