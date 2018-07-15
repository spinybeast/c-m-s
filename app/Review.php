<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['author', 'company', 'text'];

    public function getPhotoAttribute($value)
    {
        $asset = asset('img/reviews/' . $value);
        if ($value && file_exists($asset)) {
            return $asset;
        }
        return asset('img/noavatar.png');
    }
}
