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
        ];
    }
}
