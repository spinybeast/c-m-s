<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Video extends Model
{
    protected $fillable = ['title', 'description', 'url', 'tags'];

    public function getTagsAttribute($value): array
    {
        $tags = array_map(function ($tag) {
            return trim($tag);
        }, explode(',', Str::lower($value)));

        $tags[] = 'all';

        return $tags;
    }
}
