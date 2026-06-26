<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use Illuminate\Http\Request;

class BadgeController extends Controller
{
    public function index()
    {
        return response()->json(Badge::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:badges,name',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
        ]);

        $badge = Badge::create($validated);

        return response()->json([
            'message' => 'Badge created successfully',
            'data' => $badge,
        ], 201);
    }

    public function show(Badge $badge)
    {
        return response()->json($badge);
    }

    public function update(Request $request, Badge $badge)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255|unique:badges,name,' . $badge->id,
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
        ]);

        $badge->update($validated);

        return response()->json([
            'message' => 'Badge updated successfully',
            'data' => $badge,
        ]);
    }

    public function destroy(Badge $badge)
    {
        $badge->delete();

        return response()->json([
            'message' => 'Badge deleted successfully',
        ]);
    }
}
