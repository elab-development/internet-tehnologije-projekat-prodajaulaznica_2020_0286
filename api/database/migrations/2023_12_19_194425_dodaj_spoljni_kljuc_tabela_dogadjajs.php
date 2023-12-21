<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DodajSpoljniKljucTabelaDogadjajs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dogadjajs', function (Blueprint $table) { 
            $table->unsignedBigInteger('tip');
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
        Schema::table('dogadjajs', function (Blueprint $table) { 
            $table->dropForeign(['tip']);
            $table->dropColumn('tip');
        });
    }
}
