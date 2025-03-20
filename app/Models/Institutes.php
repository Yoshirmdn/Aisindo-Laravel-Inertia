<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Institutes extends Model
{
    protected $fillable = [
        'name',
        'department',
        'website_address',
        'address',
        'contact',
        'payment_proof'
    ];

    protected $casts = [
        'department' => 'json',
        'contact' => 'json'
    ];

    public function members()
    {
        return $this->hasMany(User::class);
    }
}
