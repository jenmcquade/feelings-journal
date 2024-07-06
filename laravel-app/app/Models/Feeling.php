<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feeling extends Model
{
    use HasFactory;

    protected $fillable = [
        'text',
        'color',
        'weight',
        'parent_id',
    ];

    protected $casts = [
    
    ];

    public function parent()
    {
        return $this->belongsTo(Feeling::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Feeling::class, 'parent_id');
    }

    public function getAlsoDeletes()
    {
        return $this->children()->get();
    }
}
