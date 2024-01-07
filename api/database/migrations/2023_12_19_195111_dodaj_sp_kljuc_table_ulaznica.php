<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DodajSpKljucTableUlaznica extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ulaznicas', function (Blueprint $table) {
           $table->unsignedBigInteger('dogadjaj');
           $table->unsignedBigInteger('korisnik');
           $table->unsignedBigInteger('tip');
           $table->foreign('dogadjaj')->references('id')->on('dogadjajs');
           $table->foreign('korisnik')->references('id')->on('users');
           $table->foreign('tip')->references('id')->on('tip_ulaznices');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ulaznicas', function (Blueprint $table) {
           $table->dropForeign(['dogadjaj']);
           $table->dropForeign(['korisnik']);
           $table->dropForeign(['tip']);

           $table->dropColumn('tip');
           $table->dropColumn('korisnik');
           $table->dropColumn('dogadjaj');
            
        });
    }
}
