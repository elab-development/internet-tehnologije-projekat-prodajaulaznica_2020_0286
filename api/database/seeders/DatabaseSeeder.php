<?php

namespace Database\Seeders;

use App\Models\TipDogodjaja;
use App\Models\TipUlaznice;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        User::create([
            'name' => 'pera',
            'email' => 'pera@gmail.com',
            'password' => Hash::make('pera'),
            'kontakt' => '061254781',
            'adresa'=>'Adresa 1'
            
        ]);
        User::create([
            'name' => 'zika',
            'email' => 'zika@gmail.com',
            'password' => Hash::make('zika'),
            'kontakt' => '061254781',
            'uloga'=>'admin' ,
            'adresa'=>'Adresa 1'
        ]);


        $this->call(TipDogodjaja::class);
        $this->call(TipUlaznice::class);
        $this->call(DogadjajSeeder::class);
        $this->call(UlaznicaSeeder::class);


    }
}
