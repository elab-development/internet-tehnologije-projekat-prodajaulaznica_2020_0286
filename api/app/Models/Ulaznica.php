<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ulaznica extends Model
{
    use HasFactory;
    protected $fillable = [
        'dogadjaj',
        'korisnik',
        'tip' ,
        'datumKupovine',
        'cena',
        
    ];
}
