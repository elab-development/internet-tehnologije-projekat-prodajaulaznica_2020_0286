<?php

namespace Database\Seeders;

use App\Models\Dogadjaj;
use App\Models\TipDogodjaja;
use App\Models\TipUlaznice;
use App\Models\Ulaznica;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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
        
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Ulaznica::truncate();
        Dogadjaj::truncate();
        User::truncate();

        TipDogodjaja::truncate();
        TipUlaznice::truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
         User::create([
            'name' => 'pera',
            'email' => 'pera@gmail.com',
            'password' => Hash::make('pera'),
            'kontakt' => '061254781',
        
            
        ]);
        User::create([
            'name' => 'zika',
            'email' => 'zika@gmail.com',
            'password' => Hash::make('zika'),
            'kontakt' => '061254781',
            'uloga'=>'admin' ,
         
        ]);
        $this->call(TipDogodjajaSeeder::class);
        $this->call(TipUlazniceSeeder::class);
        $this->call(DogadjajSeeder::class);
        $this->call(UlaznicaSeeder::class);
           

    }
}
