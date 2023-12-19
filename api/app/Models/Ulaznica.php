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
    public function tip()
    {
        return $this->belongsTo(TipUlaznice::class);
    }

    public function korisnik()
    {
        return $this->belongsTo(User::class, 'korisnik');
    }
    public function dogadjaj()
    {
        return $this->belongsTo(Dogadjaj::class, 'dogadjaj');
    }


}
