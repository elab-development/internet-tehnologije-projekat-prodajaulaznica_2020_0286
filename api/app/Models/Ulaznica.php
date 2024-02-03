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
        'kolicina', //dodato je ovo polje kako bi jedan korisnik mogao da kupi npr 6 karata za jedan dogadjaj
        'cena', //ovaj podatak cemo izracunavati na osnovu broja kupljenih karata i tipa ulaznice i cene dogadjaja


    ];
    public function tip()
    {
        return $this->belongsTo(TipUlaznice::class);
    }

    public function korisnik()
    {
        return $this->belongsTo(User::class);
    }
    public function dogadjaj()
    {
        return $this->belongsTo(Dogadjaj::class);
    }


}
