<?php

namespace Database\Seeders;

use App\Models\Dogadjaj;
use Illuminate\Database\Seeder;

class DogadjajSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dogadjaji = [
            [
                'naziv' => 'New York Marathon',
                'datumVreme' => '2023-11-05 09:00:00',
                'mesto' => 'New York, USA',
                'tip' => 3,  
                'organizator' => 'NYRR',
                'slika' => 'images/ny-marathon.jpg',
                'kapacitet' => 50000,
                    'cena'=>800,
            ],
            [
                'naziv' => 'Comic-Con International',
                'datumVreme' => '2023-07-20 10:00:00',
                'mesto' => 'San Diego, USA',
                'tip' => 4,  
                'organizator' => 'San Diego Comic Convention',
                'slika' => 'images/comic-con.jpg',
                'kapacitet' => 130000,
                'cena'=>1800,
            ],
            [
                'naziv' => 'Glastonbury Festival',
                'datumVreme' => '2023-06-21 12:00:00',
                'mesto' => 'Pilton, England',
                'tip' => 5, 
                'organizator' => 'Glastonbury Festivals Ltd.',
                'slika' => 'images/glastonbury-festival.jpg',
                'kapacitet' => 135000,
                'cena'=>500,
            ],
            [
                'naziv' => 'La Traviata at The Metropolitan Opera',
                'datumVreme' => '2023-12-15 19:30:00',
                'mesto' => 'New York, USA',
                'tip' => 2,  
                'organizator' => 'The Metropolitan Opera',
                'slika' => 'images/la-traviata.jpg',
                'kapacitet' => 3800,
                'cena'=>1000,
            ]
        ];
        foreach ($dogadjaji as $dogadjaj) {
            Dogadjaj::create($dogadjaj);
        }
    }
}
