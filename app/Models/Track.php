<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Track extends Model
{
    public const AUDIO_PATH = '/uploads/portfolio/audios/';
    public const COVER_PATH = '/uploads/portfolio/covers/';

    protected $fillable = ['title', 'tags'];

    public function getCoverAttribute($value): string
    {
        return $value ? route('portfolio_cover', ['filename' => $value], absolute: false) : '';
    }

    public function getAudioAttribute($value): string
    {
        return $value ? route('portfolio_file', ['filename' => $value], absolute: false) : '';
    }

    public function getTagsAttribute($value): array
    {
        $tags = array_map(function ($tag) {
            return trim($tag);
        }, explode(',', Str::lower((string) $value)));

        $tags[] = 'all';

        return $tags;
    }
}
