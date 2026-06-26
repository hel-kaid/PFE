<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GameController extends Controller
{
    public function index()
    {
        return response()->json(Game::orderBy('position')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'world_id' => 'required|integer|exists:worlds,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        $game = Game::create($validated);

        return response()->json([
            'message' => 'Game created successfully',
            'data' => $game,
        ], 201);
    }

    public function show(Game $game)
    {
        return response()->json($game);
    }

    public function update(Request $request, Game $game)
    {
        $validated = $request->validate([
            'world_id' => 'sometimes|integer|exists:worlds,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $game->update($validated);

        return response()->json([
            'message' => 'Game updated successfully',
            'data' => $game,
        ]);
    }

    public function destroy(Game $game)
    {
        $game->delete();

        return response()->json([
            'message' => 'Game deleted successfully',
        ]);
    }
}
