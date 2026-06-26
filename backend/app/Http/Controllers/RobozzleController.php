<?php

namespace App\Http\Controllers;

use App\Models\RobozzleStage;
use App\Models\User;
use App\Models\UserStageProgress;
use App\Services\LevelService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RobozzleController extends Controller
{
    /**
     * Liste des niveaux
     */
    public function index($gameId)
    {
        /** @var User $user */
        $user = Auth::user();

        $stages = RobozzleStage::where(
            'game_id',
            $gameId
        )
        ->where(
            'is_active',
            true
        )
        ->orderBy('order')
        ->get();

        $result = $stages->map(
            function ($stage) use ($user, $gameId) {

                $completed =
                    UserStageProgress::where(
                        'user_id',
                        $user->id
                    )
                    ->where(
                        'stage_id',
                        $stage->id
                    )
                    ->where(
                        'completed',
                        true
                    )
                    ->exists();

                $locked = false;

                if ($stage->order > 1) {

                    $previousStage =
                        RobozzleStage::where(
                            'game_id',
                            $gameId
                        )
                        ->where(
                            'order',
                            $stage->order - 1
                        )
                        ->first();

                    if ($previousStage) {

                        $previousCompleted =
                            UserStageProgress::where(
                                'user_id',
                                $user->id
                            )
                            ->where(
                                'stage_id',
                                $previousStage->id
                            )
                            ->where(
                                'completed',
                                true
                            )
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

                    'locked' => $locked,

                    'completed' => $completed,
                ];
            }
        );

        return response()->json($result);
    }

    /**
     * Détails d'un niveau
     */
    public function show($id)
    {
        $stage = RobozzleStage::findOrFail($id);

        return response()->json([

            'id' => $stage->id,

            'game_id' => $stage->game_id,

            'name' => $stage->name,

            'description' => $stage->description,

            'order' => $stage->order,

            'config' => $stage->config,
        ]);
    }

    /**
     * Validation d'un niveau terminé
     */
    public function complete(Request $request)
    {
        $request->validate([

            'game_id' => [
                'required',
                'exists:games,id'
            ],

            'stage_id' => [
                'required',
                'exists:robozzle_stages,id'
            ],
        ]);

        /** @var User $user */
        $user = Auth::user();

        $stage = RobozzleStage::findOrFail(
            $request->stage_id
        );

        if ($stage->order > 1) {

            $previousStage =
                RobozzleStage::where(
                    'game_id',
                    $request->game_id
                )
                ->where(
                    'order',
                    $stage->order - 1
                )
                ->first();

            if ($previousStage) {

                $previousCompleted =
                    UserStageProgress::where(
                        'user_id',
                        $user->id
                    )
                    ->where(
                        'stage_id',
                        $previousStage->id
                    )
                    ->where(
                        'completed',
                        true
                    )
                    ->exists();

                if (!$previousCompleted) {

                    return response()->json([
                        'message' => 'Stage locked'
                    ], 403);
                }
            }
        }

        $progress = UserStageProgress::firstOrNew([
            'user_id' => $user->id,
            'stage_id' => $stage->id,
        ]);

        $alreadyCompleted = $progress->completed;

        $progress->game_id = $request->game_id;
        $progress->completed = true;
        $progress->completed_at = now();
        $progress->save();

        $leveledUp = false;

        if (!$alreadyCompleted) {

            $oldLevel = $user->level;

            $user->xp += $stage->xp_reward;

            $user->level =
                LevelService::calculateLevel(
                    $user->xp
                );

            $leveledUp =
                $user->level > $oldLevel;

            $user->save();
        }

        return response()->json([
            'success' => true,

            'message' => 'Stage completed',

            'xp_gained' =>
                $alreadyCompleted
                    ? 0
                    : $stage->xp_reward,

            'xp' => $user->xp,

            'level' => $user->level,

            'leveled_up' => $leveledUp,

            'next_level_xp' =>
                LevelService::xpForNextLevel(
                    $user->level
                ),
        ]);
    }
}