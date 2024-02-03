<?php

namespace Database\Seeders;

use App\Models\Dogadjaj;
use App\Models\TipUlaznice;
use App\Models\Ulaznica;
use App\Models\User;
use Illuminate\Database\Seeder;

class UlaznicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $dogadjaj = Dogadjaj::first();
        $tipUlaznice = TipUlaznice::first();
        $korisnik = User::first();

        Ulaznica::create([
            'dogadjaj' => $dogadjaj->id,
            'korisnik' => $korisnik->id,
            'tip' => $tipUlaznice->id,
            'datumKupovine' => now()->subDays(rand(1, 30)),
            'cena' => rand(100, 500),
            'kolicina' => rand(1, 5)
        ]);

    }
}
