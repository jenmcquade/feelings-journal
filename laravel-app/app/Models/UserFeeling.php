<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class UserFeeling extends Pivot
{
    public $table = 'user_feelings';

    protected $fillable = [
        'user_id',
        'feeling_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function feeling()
    {
        return $this->belongsTo(Feeling::class);
    }
}