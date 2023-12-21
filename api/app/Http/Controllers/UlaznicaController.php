<?php

namespace App\Http\Controllers;

use App\Http\Resources\UlaznicaResource;
use App\Models\TipUlaznice;
use App\Models\Ulaznica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UlaznicaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ulaznice = Ulaznica::all();
        return UlaznicaResource::collection($ulaznice);
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
        $validator = Validator::make($request->all(), [
            'dogadjaj' => 'required|exists:dogadjajs,id',
            'korisnik' => 'required|exists:users,id',
            'tip' => 'required|exists:tip_ulaznices,id',
            'datumKupovine' => 'required|date',
            'cena' => 'required|numeric|min:1',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        $ulaznica = Ulaznica::create([
            'dogadjaj' => $request->input('dogadjaj'),
            'korisnik' => $request->input('korisnik'),
            'tip' => $request->input('tip'),
            'datumKupovine' => $request->input('datumKupovine'),
            'cena' => $request->input('cena'),
        ]);
    
        return response()->json([
            'message' => 'Ulaznica uspešno kreirana',
            'ulaznica' => new UlaznicaResource($ulaznica),
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ulaznica  $ulaznica
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ulaznica = Ulaznica::find($id);

        if (!$ulaznica) {
            return response()->json(['message' => 'Ulaznica nije pronađena'], 404);
        }
    
        return new UlaznicaResource($ulaznica);
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
        $ulaznica = Ulaznica::find($id);

        if (!$ulaznica) {
            return response()->json(['message' => 'Ulaznica nije pronađena'], 404);
        }

        $validator = Validator::make($request->all(), [
            'dogadjaj' => 'exists:dogadjajs,id',
            'korisnik' => 'exists:users,id',
            'tip' => 'exists:tip_ulaznices,id',
            'datumKupovine' => 'date',
            'cena' => 'numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $ulaznica->update([
            'dogadjaj' => $request->input('dogadjaj'),
            'korisnik' => $request->input('korisnik'),
            'tip' => $request->input('tip'),
            'datumKupovine' => $request->input('datumKupovine'),
            'cena' => $request->input('cena'),
        ]);

        return response()->json(['message' => 'Ulaznica uspešno ažurirana'], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ulaznica  $ulaznica
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ulaznica = Ulaznica::find($id);

        if (!$ulaznica) {
            return response()->json(['message' => 'Ulaznica nije pronađena'], 404);
        }

        $ulaznica->delete();

        return response()->json(['message' => 'Ulaznica uspešno obrisana'], 200);
    }
}
