<?php

namespace App\Http\Controllers;

use App\Http\Resources\DogadjajResource;
use App\Models\Dogadjaj;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DogadjajController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()  //GET
    {
       // $dogadjaji = Dogadjaj::paginate(2);   
       $dogadjaji = Dogadjaj::all();   
        return DogadjajResource::collection($dogadjaji);
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
    public function store(Request $request) //POST
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string',
            'datumVreme' => 'required|date',
            'mesto' => 'required|string',
            'tip' => 'required|exists:tip_dogodjajas,id',  
            'organizator' => 'required|string',
            'slika' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',  
            'kapacitet' => 'required|integer|min:1',
            'cena'=>'required|integer|min:1',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }  
        $dogadjaj = Dogadjaj::create([
            'naziv' => $request->input('naziv'),
            'datumVreme' => $request->input('datumVreme'),
            'mesto' => $request->input('mesto'),
            'tip' => $request->input('tip'),
            'organizator' => $request->input('organizator'),
            'kapacitet' => $request->input('kapacitet'),
            'cena' => $request->input('cena'),
        ]);
        if ($request->hasFile('slika')) {
            $slika = $request->file('slika');
            $slikaIme = time() . '_' . $slika->getClientOriginalName();
            $slika->storeAs('slike', $slikaIme, 'public');  
            $dogadjaj->update(['slika' => $slikaIme]);
        }
        return response()->json([
            'message' => 'Uspesno kreiran dogadjaj',
            'dogadjaj' => new DogadjajResource($dogadjaj)
        ], 200); 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Dogadjaj  $dogadjaj
     * @return \Illuminate\Http\Response
     */
    public function show($id) //GET 
    {
         $d = Dogadjaj::find($id);
         if($d){
            return new DogadjajResource($d);
         }
         return response()->json(['message' => 'GRESKA'], 404);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Dogadjaj  $dogadjaj
     * @return \Illuminate\Http\Response
     */
    public function edit(Dogadjaj $dogadjaj)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Dogadjaj  $dogadjaj
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id) //PUT
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string',
            'datumVreme' => 'required|date',
            'mesto' => 'required|string',
            'tip' => 'required|exists:tip_dogodjajas,id',  
            'organizator' => 'required|string',
       //     'slika' => 'image|mimes:jpeg,png,jpg,gif|max:2048',  
            'kapacitet' => 'required|integer|min:1',
            'cena'=>'required|integer|min:1',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $d = Dogadjaj::find($id);
        if($d){
           $d->update([
                'naziv' => $request->input('naziv'),
                'datumVreme' => $request->input('datumVreme'),
                'mesto' => $request->input('mesto'),
                'tip' => $request->input('tip'),
                'organizator' => $request->input('organizator'),
                'kapacitet' => $request->input('kapacitet'),
                'cena' => $request->input('cena'),
            ]);
            if ($request->hasFile('slika')) {
                $slika = $request->file('slika');
                $slikaIme = time() . '_' . $slika->getClientOriginalName();
                $slika->storeAs('slike', $slikaIme, 'public');  
                $d->update(['slika' => $slikaIme]);
            }
    
            return response()->json([
                'message' => 'Uspesno azuriran dogadjaj',
                'dogadjaj' => new DogadjajResource($d)
            ], 200);
         }
         return response()->json(['message' => 'Obj nije pronadjen'], 404);
       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dogadjaj  $dogadjaj
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) //DETELE
    {
        $d = Dogadjaj::find($id);
        if($d){
           $d->delete();
           return response()->json(['message' => 'OBRISANO'], 200);
        }else{
            return response()->json(['message' => 'GRESKA'], 404);
        }
       
    }
    public function pretraga(Request $request)
    {
        
        $request->validate([
            'termin' => 'nullable|string',  
            'tip' => 'nullable|exists:tip_dogodjajas,id',  
        ]);

       
        $query = Dogadjaj::query();

       
        if ($request->has('termin')) {
            $termin = $request->input('termin');
            $query->where('naziv', 'LIKE', "%$termin%")
                ->orWhere('organizator', 'LIKE', "%$termin%");
        }

        if ($request->has('tip')) {
            $tip = $request->input('tip');
            $query->where('tip', $tip);
        }

         
        $dogadjaji = $query->paginate(2);

        return DogadjajResource::collection($dogadjaji);
}

}
