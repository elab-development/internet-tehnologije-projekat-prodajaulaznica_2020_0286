<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDogadjajsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dogadjajs', function (Blueprint $table) {
            $table->id();
            $table->string('naziv');
            $table->dateTime('datumVreme');
            $table->string('mesto');
            $table->unsignedBigInteger('tip');  
            $table->string('organizator');  
            $table->text('slika')->nullable(); //"images/koncetr1.jpg"
            $table->integer('kapacitet');
            $table->timestamps();


            $table->foreign('tip')->references('id')->on('tip_dogodjajas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dogadjajs');
    }
}
