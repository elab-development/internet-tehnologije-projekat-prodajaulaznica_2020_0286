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
            $table->dateTime('datumKupovine');
            $table->integer('kolicina')->default(1);
            $table->decimal('cena', 8, 2);
            $table->timestamp('rezervisano_do')->nullable(); //potrebno za implementaciju reda cekanja
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
