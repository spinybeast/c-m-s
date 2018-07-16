<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    public const AVATAR_PATH = '/uploads/avatars/';

    protected $fillable = ['author', 'company', 'text'];

    public function getPhotoAttribute($value): string
    {
        $path = self::AVATAR_PATH . $value;
        if ($value && file_exists(public_path($path))) {
            return asset($path);
        }
        return asset('img/noavatar.png');
    }

    public function getSocialsAttribute($value): array
    {
        return (array)($value ? unserialize($value) : []);
    }
}
