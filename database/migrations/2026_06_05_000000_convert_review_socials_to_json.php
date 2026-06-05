<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('reviews')) {
            return;
        }

        $reviews = DB::table('reviews')->whereNotNull('socials')->get();

        foreach ($reviews as $review) {
            $socials = $review->socials;

            if (is_string($socials) && str_starts_with($socials, 'a:')) {
                $decoded = @unserialize($socials);
                if (is_array($decoded)) {
                    DB::table('reviews')
                        ->where('id', $review->id)
                        ->update(['socials' => json_encode(array_filter($decoded))]);
                }
            }
        }
    }

    public function down(): void
    {
        //
    }
};
