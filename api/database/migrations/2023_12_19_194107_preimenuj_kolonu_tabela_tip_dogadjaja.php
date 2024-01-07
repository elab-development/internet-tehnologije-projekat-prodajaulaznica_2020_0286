<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PreimenujKolonuTabelaTipDogadjaja extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tip_dogodjajas', function (Blueprint $table) {
           
            $table->renameColumn('naziv','nazivTipaDogadjaja');
             
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tip_dogodjajas', function (Blueprint $table) {
           
            $table->renameColumn('nazivTipaDogadjaja','naziv');
             
        });
    }
}
