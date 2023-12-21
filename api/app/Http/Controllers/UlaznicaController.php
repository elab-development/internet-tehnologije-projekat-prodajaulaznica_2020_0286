<?php

namespace App\Http\Controllers;

use App\Models\TipUlaznice;
use App\Models\Ulaznica;
use Illuminate\Http\Request;

class UlaznicaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'nazivTipaUlaznice' => 'required|string|unique:tip_ulaznices',
        ]);
    
        $tipUlaznice = TipUlaznice::create([
            'nazivTipaUlaznice' => $request->input('nazivTipaUlaznice'),
        ]);
    
        return response()->json([
            'message' => 'Tip ulaznice uspešno kreiran',
            'tipUlaznice' => $tipUlaznice,
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ulaznica  $ulaznica
     * @return \Illuminate\Http\Response
     */
    public function show(Ulaznica $ulaznica)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ulaznica  $ulaznica
     * @return \Illuminate\Http\Response
     */
    public function edit(Ulaznica $ulaznica)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ulaznica  $ulaznica
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nazivTipaUlaznice' => 'required|string|unique:tip_ulaznices,nazivTipaUlaznice,',
        ]);
        $tipUlaznice =  TipUlaznice::find($id);
        $tipUlaznice->update([
            'nazivTipaUlaznice' => $request->input('nazivTipaUlaznice'),
        ]);
    
        return response()->json([
            'message' => 'Tip ulaznice uspešno ažuriran',
            'tipUlaznice' => $tipUlaznice,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ulaznica  $ulaznica
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tipUlaznice =  TipUlaznice::find($id);
        $tipUlaznice->delete();

        return response()->json(['message' => 'Tip ulaznice uspešno obrisan'], 200);
    }
}
