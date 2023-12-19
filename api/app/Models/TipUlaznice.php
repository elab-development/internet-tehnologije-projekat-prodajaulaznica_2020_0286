<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipUlaznice extends Model
{
    use HasFactory;
    protected $fillable = [
        'naziv', 
    ];


    public function ulaznice()
    {
        return $this->hasMany(Ulaznica::class);
    }

}
