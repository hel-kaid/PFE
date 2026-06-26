<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index()
    {
        return response()->json(Profile::with('user')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'bio' => 'nullable|string',
            'favorite_language' => 'nullable|string|max:100',
        ]);

        $profile = Profile::create($validated);

        return response()->json([
            'message' => 'Profile created successfully',
            'data' => $profile,
        ], 201);
    }

    public function show(Profile $profile)
    {
        return response()->json($profile->load('user'));
    }

    public function update(Request $request, Profile $profile)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|integer|exists:users,id',
            'bio' => 'nullable|string',
            'favorite_language' => 'nullable|string|max:100',
        ]);

        $profile->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => $profile,
        ]);
    }

    public function destroy(Profile $profile)
    {
        $profile->delete();

        return response()->json([
            'message' => 'Profile deleted successfully',
        ]);
    }
}
