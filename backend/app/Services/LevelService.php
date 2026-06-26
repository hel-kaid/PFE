<?php

namespace App\Services;

class LevelService
{
    public static function calculateLevel(int $xp): int
{
    $level = 1;
    $requiredXp = 15;

    while ($xp >= $requiredXp) {
        $level++;
        $requiredXp *= 2;
    }

    return $level;
}

    public static function xpForNextLevel(int $level): int
    {
        $xp = 0;

        for ($i = 1; $i <= $level; $i++) {
            $xp += $i * 100;
        }

        return $xp;
    }
}