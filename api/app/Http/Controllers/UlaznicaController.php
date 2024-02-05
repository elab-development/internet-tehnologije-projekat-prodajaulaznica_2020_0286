<?php

namespace App\Http\Controllers;

use App\Http\Resources\UlaznicaResource;
use App\Models\Dogadjaj;
use App\Models\TipUlaznice;
use App\Models\Ulaznica;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $ulaznice = Ulaznica::paginate(2);
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
    public function ocistiRedCekanja(){
       
        // Dobij sve rezervacije sa "rezervisano_do" različitim od null
        $rezervacije = Ulaznica::whereNotNull('rezervisano_do')->get();

        foreach ($rezervacije as $rezervacija) {
          
            $dogadjaj = Dogadjaj::find($rezervacija->dogadjaj);
            $kapacitet = $dogadjaj->kapacitet;
            $brojProdanihUlaznica = $dogadjaj->brojProdatihKarata();

            if ($kapacitet > $brojProdanihUlaznica) {
                // Postavi "rezervisano_do" na null
                $rezervacija->update(['rezervisano_do' => null]);
            }
        }
    }


    public function store(Request $request)  //ovo je metoda koja ce nam sluziti za kreiranje rezervacije za ulaznice, tj dodavanja ulaznica u red cekanja
    { 
        $validator = Validator::make($request->all(), [
            'dogadjaj' => 'required|exists:dogadjajs,id',
            'tip' => 'required|exists:tip_ulaznices,id',
            'datumKupovine' => 'required|date',
            'cena' => 'required|numeric|min:1', 
            'kolicina' => 'required|numeric|min:1',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $dogadjaj = Dogadjaj::find($request->input('dogadjaj'));

        if (!$dogadjaj) {
            return response()->json(['message' => 'Dogadjaj nije pronadjen'], 404);
        }

        // Provera kapaciteta i broja prodanih ulaznica
        $kapacitet = $dogadjaj->kapacitet;
        $brojProdanihUlaznica = Ulaznica::where('dogadjaj', $dogadjaj->id)->sum('kolicina');

        if ($request->input('kolicina') + $brojProdanihUlaznica > $kapacitet) {
            return response()->json(['message' => 'Nema dovoljno karata za ovaj dogadjaj'], 400);
        }
        $rezervisano_do = Carbon::now()->addHour();
        $user = Auth::user(); // Dobijanje ulogovanog korisnika
        $ulaznica = Ulaznica::create([
            'dogadjaj' => $request->input('dogadjaj'),
            'korisnik' => $user->id, // Postavljanje ID-a ulogovanog korisnika
            'tip' => $request->input('tip'),
            'datumKupovine' => $request->input('datumKupovine'),
            'cena' => $request->input('cena'),
            'kolicina' => $request->input('kolicina'),
            'rezervisano_do' => $rezervisano_do,
        ]);
        $this->ocistiRedCekanja();
        return response()->json([
            'message' => 'Ulaznice uspešno rezervisane',
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
    public function mojeUlaznice() //vraca sve ulaznice ulogovanog korisnika
        {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['message' => 'Nije pronađen ulogovan korisnik'], 404);
            }

            $ulaznice = Ulaznica::where('korisnik', $user->id)->get();

            return UlaznicaResource::collection($ulaznice);
        }
}
