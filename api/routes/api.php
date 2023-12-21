<?php

use App\Http\Controllers\DogadjajController;
use App\Http\Controllers\TipDogadjajaController;
use App\Http\Controllers\TipUlazniceController;
use App\Http\Controllers\UlaznicaController;
use App\Models\TipDogodjaja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//  Route::get('/dogadjaji',[DogadjajController::class,'index']);
//  Route::get('/dogadjaji/{id}',[DogadjajController::class,'show']);

//  Route::delete('/dogadjaji/{id}',[DogadjajController::class,'destroy']);

//  Route::post('/dogadjaji',[DogadjajController::class,'store']); 
//  Route::put('/dogadjaji/{id}',[DogadjajController::class,'update']);

 Route::resource('dogadjaji', DogadjajController::class);
 Route::resource('tipoviDogadjaja', TipDogadjajaController::class);
 Route::resource('tipoviUlaznica', TipUlazniceController::class);

 Route::resource('ulaznice', UlaznicaController::class);
 

