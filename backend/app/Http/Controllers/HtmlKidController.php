<?php

namespace App\Http\Controllers;

use App\Models\HtmlKidStage;
use App\Models\User;
use App\Models\UserStageProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\LevelService;

class HtmlKidController extends Controller
{
    public function index($gameId)
    {
        /** @var User $user */
        $user = Auth::user();

        $stages = HtmlKidStage::where('game_id', $gameId)
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        $result = $stages->map(function ($stage) use ($user, $gameId) {
            $completed = UserStageProgress::where('user_id', $user->id)
                ->where('game_id', $gameId)
                ->where('stage_id', $stage->id)
                ->where('completed', true)
                ->exists();

            $locked = false;

            if ($stage->order > 1) {
                $previousStage = HtmlKidStage::where('game_id', $gameId)
                    ->where('order', $stage->order - 1)
                    ->first();

                if ($previousStage) {
                    $previousCompleted = UserStageProgress::where('user_id', $user->id)
                        ->where('game_id', $gameId)
                        ->where('stage_id', $previousStage->id)
                        ->where('completed', true)
                        ->exists();

                    $locked = !$previousCompleted;
                }
            }

            return [
                'id' => $stage->id,
                'game_id' => $stage->game_id,
                'name' => $stage->name,
                'description' => $stage->description,
                'order' => $stage->order,
                'timer_seconds' => $stage->timer_seconds,
                'xp_reward' => $stage->xp_reward,
                'locked' => $locked,
                'completed' => $completed,
            ];
        });

        return response()->json($result);
    }

    public function show($id)
    {
        $stage = HtmlKidStage::findOrFail($id);

        return response()->json([
            'id' => $stage->id,
            'game_id' => $stage->game_id,
            'name' => $stage->name,
            'description' => $stage->description,
            'order' => $stage->order,
            'content' => $stage->content,
            'timer_seconds' => $stage->timer_seconds,
            'xp_reward' => $stage->xp_reward,
            'config' => $stage->config,
        ]);
    }

    public function complete(Request $request)
    {
        $request->validate([
            'game_id' => ['required', 'exists:games,id'],
            'stage_id' => ['required', 'exists:html_kid_stages,id'],
            'elapsed_seconds' => ['required', 'integer', 'min:1'],
            'answers' => ['nullable', 'array'],
        ]);

        /** @var User $user */
        $user = Auth::user();

        $stage = HtmlKidStage::where('id', $request->stage_id)
            ->where('game_id', $request->game_id)
            ->where('is_active', true)
            ->firstOrFail();

        if ($stage->order > 1) {
            $previousStage = HtmlKidStage::where('game_id', $request->game_id)
                ->where('order', $stage->order - 1)
                ->first();

            if ($previousStage) {
                $previousCompleted = UserStageProgress::where('user_id', $user->id)
                    ->where('game_id', $request->game_id)
                    ->where('stage_id', $previousStage->id)
                    ->where('completed', true)
                    ->exists();

                if (!$previousCompleted) {
                    return response()->json([
                        'message' => 'Stage locked',
                    ], 403);
                }
            }
        }

        if ($request->elapsed_seconds > $stage->timer_seconds) {
            return response()->json([
                'success' => false,
                'message' => 'Time is over',
            ], 422);
        }

        $progress = UserStageProgress::firstOrNew([
            'user_id' => $user->id,
            'game_id' => $request->game_id,
            'stage_id' => $stage->id,
        ]);

        $alreadyCompleted = (bool) $progress->completed;

        $progress->completed = true;
        $progress->completed_at = now();
        $progress->save();

        $leveledUp = false;

        if (!$alreadyCompleted) {
            $oldLevel = $user->level;

            $user->xp += $stage->xp_reward;
            $user->level = LevelService::calculateLevel($user->xp);

            $leveledUp = $user->level > $oldLevel;

            $user->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'Stage completed',
            'xp_gained' => $alreadyCompleted ? 0 : $stage->xp_reward,
            'xp' => $user->xp,
            'level' => $user->level,
            'leveled_up' => $leveledUp,
            'next_level_xp' => LevelService::xpForNextLevel($user->level),
        ]);
    }
}