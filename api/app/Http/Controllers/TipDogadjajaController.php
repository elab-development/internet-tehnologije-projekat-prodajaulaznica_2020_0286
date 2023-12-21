<?php

namespace App\Http\Controllers;

use App\Models\TipDogodjaja;
use Illuminate\Http\Request;

class TipDogadjajaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TipDogodjaja::all();
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TipDogodjaja  $tipDogodjaja
     * @return \Illuminate\Http\Response
     */
    public function show(TipDogodjaja $tipDogodjaja)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TipDogodjaja  $tipDogodjaja
     * @return \Illuminate\Http\Response
     */
    public function edit(TipDogodjaja $tipDogodjaja)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TipDogodjaja  $tipDogodjaja
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        $request->validate([
            'nazivTipaDogadjaja' => 'required|string|unique:tip_dogodjajas,nazivTipaDogadjaja,',
        ]);
        $obj =  TipDogodjaja::find($id);
        $obj->update([
            'nazivTipaDogadjaja' => $request->input('nazivTipaDogadjaja'),
        ]);
    
        return response()->json([
            'message' => 'Tip ulaznice uspešno ažuriran',
            'tipDogadjaja' => $obj,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TipDogodjaja  $tipDogodjaja
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        $obj =  TipDogodjaja::find($id);
        $obj->delete();

        return response()->json(['message' => 'Tip dogadjaja uspešno obrisan'], 200);
    }
}
