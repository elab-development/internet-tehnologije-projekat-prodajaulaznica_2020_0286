<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PreimenujKolonuTabelaTipUlaznice extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tip_ulaznices', function (Blueprint $table) {
           
            $table->renameColumn('naziv','nazivTipaUlaznice');
             
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tip_ulaznices', function (Blueprint $table) {
           
            $table->renameColumn('nazivTipaUlaznice','naziv');
             
        });
    }
}
