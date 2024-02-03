<?php

namespace App\Http\Resources;

use App\Models\TipDogodjaja;
use Illuminate\Http\Resources\Json\JsonResource;

class DogadjajResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
         $tip  = TipDogodjaja::find($this->tip);

         // Dodaj statistiku za svaki tip ulaznica
        $statistikaUlaznica = [
            'Standard' => $this->brojKupljenihUlaznica(1),
            'VIP' => $this->brojKupljenihUlaznica(2),
            'Premium' => $this->brojKupljenihUlaznica(3),
            'Group' => $this->brojKupljenihUlaznica(4),
            'Student' => $this->brojKupljenihUlaznica(5),
        ];
        return [
            'id' => $this->id,
            'naziv' => $this->naziv,
            'datumVreme' => $this->datumVreme,
            'mesto' => $this->mesto,
            'tip' => [
                'id' => $tip->id,
                'naziv' => $tip->nazivTipaDogadjaja,
            ],
            'organizator' => $this->organizator,
            'slika' => $this->slika,
            'kapacitet' => $this->kapacitet,
            'cena' => $this->cena,
            'br_mesta' => $this->kapacitet - $this->brojProdatihKarata(), 
            'statistika_ulaznica' => $statistikaUlaznica,
             
        ];
    }
}
