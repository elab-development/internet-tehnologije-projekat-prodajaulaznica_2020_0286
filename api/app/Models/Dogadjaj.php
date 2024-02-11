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
        'kapacitet' ,
        'cena'  //za svaki dogadjaj cemo kao pamtiti neku standardnu cenu, npr 100 din jedna karta, kada neko odabere tip ulaznice, na osnovu tipa ulaznice ce se menjati cena za kartu, npr ako je neko odabrao VIP ulaznicu, onda cena nece biti 100, nego 200 (npr duplo visa), ako je studentska karta onda npr 80 dinara (20% niza) itd
    ];

    public function tip()
    {
        return $this->belongsTo(TipDogodjaja::class);
    }
    public function brojProdatihKarata()  //fja potrebna  da bismo mogli na frontu da prikazemo koliko je jos karata ostalo za prodaju
    {
        return Ulaznica::where('dogadjaj', $this->id)->sum('kolicina');
    }
    public function ulaznice()
    {
        return $this->hasMany(Ulaznica::class);
    }
    public function brojKupljenihUlaznica($tip) 
    {
        return Ulaznica::where('dogadjaj', $this->id)
            ->where('tip', $tip)
            ->sum('kolicina');
    }

}
