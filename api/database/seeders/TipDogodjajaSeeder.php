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
        $tipoviDogodjaja = [  //prevedeno na engleski zbog apija za prikaz slika
            'Concert',
            'Theather',
            'Sport',
            'Conference',
            'Festival',
            'Other'
        ];

        foreach ($tipoviDogodjaja as $tip) {
            TipDogodjaja::create(['nazivTipaDogadjaja' => $tip]);
        }
    }
}
