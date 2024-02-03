<?php

namespace App\Http\Resources;

use App\Models\Dogadjaj;
use App\Models\TipUlaznice;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class UlaznicaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $tipUlaznice = TipUlaznice::find($this->tip);
        $dogadjaj = Dogadjaj::find($this->dogadjaj);
        $korisnik = User::find($this->korisnik);
        return [
            'id' => $this->id,
            'dogadjaj' => new DogadjajResource($dogadjaj),
            'korisnik' => new UserResource($korisnik),
            'tip' => [
                'id' => $tipUlaznice->id,
                'naziv' => $tipUlaznice->nazivTipaUlaznice,
            ],
            'datumKupovine' => $this->datumKupovine,
            'cena' => $this->cena,
            'kolicina' => $this->kolicina,
        ];
    }
}
