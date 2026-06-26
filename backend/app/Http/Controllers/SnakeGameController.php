<?php

namespace App\Http\Controllers;

use App\Models\SnakeGameStage;
use App\Models\User;
use App\Models\UserStageProgress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\LevelService;
class SnakeGameController extends Controller
{
    /**
     * Liste stages d’un jeu
     */
    public function index($gameId)
    {
        /** @var User $user */
        $user = Auth::user();

        $stages = SnakeGameStage::where(
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

                // locked ?
                $locked = false;

                if ($stage->order > 1) {

                    $previousStage =
                        SnakeGameStage::where(
                            'game_id',
                            $gameId
                        )
                            ->where(
                                'order',
                                $stage->order - 1
                            )
                            ->first();

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

                    $locked =
                        !$previousCompleted;
                }

                return [

                    'id' => $stage->id,

                    'game_id' =>
                        $stage->game_id,

                    'name' =>
                        $stage->name,

                    'description' =>
                        $stage->description,

                    'order' =>
                        $stage->order,

                    'locked' =>
                        $locked,

                    'completed' =>
                        $completed,
                ];
            }
        );

        return response()->json(
            $result
        );
    }

    /**
     * Complete stage
     */
    public function complete(
        Request $request
    ) {

        $request->validate([

            'game_id' => [
                'required',
                'exists:games,id'
            ],

            'stage_id' => [
                'required',
                'exists:snake_game_stages,id'
            ],
        ]);

        /** @var User $user */
        $user = Auth::user();

        $stage = SnakeGameStage::findOrFail(
            $request->stage_id
        );

        // Vérifier stage précédent
        if ($stage->order > 1) {

            $previousStage =
                SnakeGameStage::where(
                    'game_id',
                    $request->game_id
                )
                    ->where(
                        'order',
                        $stage->order - 1
                    )
                    ->first();

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
                    'message' =>
                        'Stage locked'
                ], 403);
            }
        }

        // Sauvegarde progression
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
        $xpGained = 0;

        if (!$alreadyCompleted) {

            $oldLevel = $user->level;

            $xpGained = $stage->xp_reward;

            $user->xp += $xpGained;

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

            'xp_gained' => $xpGained,

            'xp' => $user->xp,

            'level' => $user->level,

            'leveled_up' => $leveledUp,
        ]);
    }

    /**
     * Show single stage
     */
    public function show($id)
    {
        $stage = SnakeGameStage::findOrFail($id);

        return response()->json([

            'id' => $stage->id,

            'game_id' => $stage->game_id,

            'name' => $stage->name,

            'description' => $stage->description,

            'order' => $stage->order,

            'config' => $stage->config,
        ]);
    }
}