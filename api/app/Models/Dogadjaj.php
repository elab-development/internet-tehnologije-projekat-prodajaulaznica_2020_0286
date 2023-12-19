<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dogadjaj extends Model
{
    use HasFactory;

    protected $fillable = [
        'naziv',
        'datumVreme',
        'mesto',
        'tip',
        'organizator',
        'slika',
        'kapacitet' 
    ];

    // // public function tip()
    // // {
    // //     return $this->belongsTo(TipDogodjaja::class);
    // // }

}
