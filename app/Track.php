<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Track extends Model
{
    public const AUDIO_PATH = '/uploads/portfolio/audios/';
    public const COVER_PATH = '/uploads/portfolio/covers/';

    protected $fillable = ['title', 'tags'];

    public function getCoverAttribute($value): string
    {
        $path = self::COVER_PATH . $value;
        if ($value && file_exists(public_path($path))) {
            return route('portfolio_cover', ['filename' => $value]);;
        }
        return '';
    }

    public function getAudioAttribute($value): string
    {
        $path = self::AUDIO_PATH . $value;
        if ($value && file_exists(public_path($path))) {
            return route('portfolio_file', ['filename' => $value]);
        }
        return '';
    }

    public function getTagsAttribute($value): array
    {
        $tags = explode(',', preg_replace('/\s+/', '', Str::lower($value)));
        $tags[] = 'all';

        return $tags;
    }
}
