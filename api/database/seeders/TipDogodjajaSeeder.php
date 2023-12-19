<?php

namespace Database\Seeders;

use App\Models\TipDogodjaja;
use Illuminate\Database\Seeder;

class TipDogodjajaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipoviDogodjaja = [
            'Koncert',
            'Pozorišna predstava',
            'Sportski događaj',
            'Konferencija',
            'Festival',
            'Ostalo'
        ];

        foreach ($tipoviDogodjaja as $tip) {
            TipDogodjaja::create(['nazivTipaDogadjaja' => $tip]);
        }
    }
}
