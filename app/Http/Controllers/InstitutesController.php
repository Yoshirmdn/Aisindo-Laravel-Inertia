<?php

namespace App\Http\Controllers;

use App\Models\Institutes;
use App\Models\User;
use Illuminate\Http\Request;

class InstitutesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'department' => 'required|array',
            'website_address' => 'nullable|url',
            'address' => 'required|string',
            'contact' => 'required|array',
            'contact.name' => 'required|string',
            'contact.number_phone' => 'required|string',
            'contact.position' => 'required|string',
            'payment_proof' => 'required|image|max:2048',
        ]);

        // Upload bukti pembayaran
        $paymentProofPath = $request->file('payment_proof')->store('payment_proofs', 'public');

        // Simpan instansi
        $institute = Institutes::create([
            'name' => $request->name,
            'department' => $request->department,  // Array departemen
            'website_address' => $request->website_address,
            'address' => $request->address,
            'contact' => $request->contact,
            'payment_proof' => $paymentProofPath,
        ]);

        // Update user yang mendaftarkan instansi menjadi `usertype = 2`
        $user = auth()->user();
        $user->update([
            'usertype' => 2,
            'institute_id' => $institute->id,
        ]);

        return response()->json(['message' => 'Instansi berhasil didaftarkan'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Institutes $institutes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Institutes $institutes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Institutes $institutes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Institutes $institutes)
    {
        //
    }
    public function addMember(Request $request, Institutes $institute)
    {
        $request->validate([
            'members' => 'required|array|max:5',
            'members.*.name' => 'required|string',
            'members.*.email' => 'required|email|unique:users,email',
            'members.*.password' => 'required|string|min:6',
        ]);

        foreach ($request->members as $memberData) {
            User::create([
                'name' => $memberData['name'],
                'email' => $memberData['email'],
                'password' => bcrypt($memberData['password']),
                'institute_id' => $institute->id,
                'usertype' => 2,
            ]);
        }

        return response()->json(['message' => 'Anggota berhasil ditambahkan'], 201);
    }
}
