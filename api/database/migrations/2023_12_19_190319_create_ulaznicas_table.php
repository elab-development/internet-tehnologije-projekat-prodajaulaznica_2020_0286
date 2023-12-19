<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUlaznicasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ulaznicas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('dogadjaj');
            $table->unsignedBigInteger('korisnik');
            $table->unsignedBigInteger('tip');

            $table->dateTime('datumKupovine');
            $table->decimal('cena', 8, 2);


            $table->timestamps();

            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ulaznicas');
    }
}
