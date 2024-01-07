<?php

namespace Database\Seeders;

use App\Models\TipUlaznice;
use Illuminate\Database\Seeder;

class TipUlazniceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tipoviUlaznica = [
            'Standard',
            'VIP',
            'Premium',
            'Group',
            'Student'
        ];


        foreach ($tipoviUlaznica as $tip) {
            TipUlaznice::create(['nazivTipaUlaznice' => $tip]);
        }



    }
}
