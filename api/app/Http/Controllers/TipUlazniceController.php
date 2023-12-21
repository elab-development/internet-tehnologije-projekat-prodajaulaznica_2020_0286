<?php

namespace App\Http\Controllers;

use App\Models\TipUlaznice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TipUlazniceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TipUlaznice::all();
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
            'nazivTipaUlaznice' => 'required|string|unique:tip_ulaznices,nazivTipaUlaznice',
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
     * @param  \App\Models\TipUlaznice  $tipUlaznice
     * @return \Illuminate\Http\Response
     */
    public function show(TipUlaznice $tipUlaznice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TipUlaznice  $tipUlaznice
     * @return \Illuminate\Http\Response
     */
    public function edit(TipUlaznice $tipUlaznice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TipUlaznice  $tipUlaznice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nazivTipaUlaznice' => 'required|string|unique:tip_ulaznices,nazivTipaDogadjaja',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        } 

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
     * @param  \App\Models\TipUlaznice  $tipUlaznice
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tipUlaznice =  TipUlaznice::find($id);
        $tipUlaznice->delete();

        return response()->json(['message' => 'Tip ulaznice uspešno obrisan'], 200);
    }
}
