<?php

namespace App\Console;

use App\Models\Dogadjaj;
use Illuminate\Support\Facades\Log;

use App\Models\Ulaznica;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */

     protected function schedule(Schedule $schedule) //ovo je metoda koja ce na svakih 1min sekundi da uzima rezervacije i da ih pretvara u prave karte
     {
         $schedule->call(function () {
             Log::info("Zakazani zadatak pokrenut."); 
             // Dobij sve rezervacije sa "rezervisano_do" različitim od null
             $rezervacije = Ulaznica::whereNotNull('rezervisano_do')->get();
     
             foreach ($rezervacije as $rezervacija) {
                 Log::info('Procesiram rezervaciju i dogadjaj: ' . $rezervacija->id . $rezervacija->dogadjaj);
                 $dogadjaj = Dogadjaj::find($rezervacija->dogadjaj);
                 $kapacitet = $dogadjaj->kapacitet;
                 $brojProdanihUlaznica = $dogadjaj->brojProdatihKarata();
     
                 if ($kapacitet > $brojProdanihUlaznica) {
                     // Postavi "rezervisano_do" na null
                     $rezervacija->update(['rezervisano_do' => null]);
                 }
             }
         })->everyMinute();  
     }
    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
